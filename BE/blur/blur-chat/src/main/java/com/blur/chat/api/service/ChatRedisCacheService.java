package com.blur.chat.api.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.redis.core.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blur.chat.api.dto.FeignUserDto;
import com.blur.chat.api.dto.ResponseDto;
import com.blur.chat.api.dto.request.ChatMessageSaveDto;
import com.blur.chat.api.dto.request.ChatPagingDto;
import com.blur.chat.api.dto.response.ChatPagingResponseDto;
import com.blur.chat.api.entity.Chat;
import com.blur.chat.api.repository.ChatRepository;
import com.blur.chat.utils.ChatUtils;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.blur.chat.api.repository.ChatRoomRepository.CHAT_ROOMS;
import static com.blur.chat.api.repository.ChatRoomRepository.CHAT_SORTED_SET_;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRedisCacheService {

    private final ChatUtils chatUtils;

    public static final String NEW_CHAT = "NEW_CHAT";
    public static final String OUT_USER = "탈퇴한 회원";
    public static final String USERNAME_NICKNAME = "USERNAME_NICKNAME";
    private final RedisTemplate<String, Object> redisTemplate;
    private final ChatRepository chatRepository;
    private final FeginService feginService;

//    private final UserRepository userRepository;

    private final RedisTemplate<String, ChatMessageSaveDto> chatRedisTemplate;

    private final RedisTemplate<String, String> roomRedisTemplate;

    private ZSetOperations<String, ChatMessageSaveDto> zSetOperations;

    @PostConstruct
    private void init() {
        zSetOperations = chatRedisTemplate.opsForZSet();
    }

    //redis chat data 삽입
    public void addChat(ChatMessageSaveDto chatMessageSaveDto) {

        ChatMessageSaveDto savedData = ChatMessageSaveDto.createChatMessageSaveDto(chatMessageSaveDto);

        redisTemplate.opsForZSet().add(NEW_CHAT, savedData, chatUtils.changeLocalDateTimeToDouble(savedData.getCreatedAt()));
        redisTemplate.opsForZSet().add(CHAT_SORTED_SET_ + savedData.getRoomNo(), savedData, chatUtils.changeLocalDateTimeToDouble(savedData.getCreatedAt()));
    }

    //chat_data 조회
    public ResponseDto<List<ChatPagingResponseDto>> getChatsFromRedis(Long roomNo, ChatPagingDto chatPagingDto) {

        //마지막 채팅을 기준으로 redis의 Sorted set에 몇번째 항목인지 파악
        ChatMessageSaveDto cursorDto = ChatMessageSaveDto.builder()
                .type(ChatMessageSaveDto.MessageType.TALK)
                .roomNo(roomNo.toString())
                .createdAt(chatPagingDto.getCursor())
                .message(chatPagingDto.getMessage())
                .writer(chatPagingDto.getWriter())
                .build();


        //마지막 chat_data cursor Rank 조회
        Long rank = zSetOperations.reverseRank(CHAT_SORTED_SET_ + roomNo, cursorDto);

        //Cursor 없을 경우 -> 최신채팅 조회
        if (rank == null)
            rank = 0L;
        else rank = rank + 1;

        //Redis 로부터 chat_data 조회
        Set<ChatMessageSaveDto> chatMessageSaveDtoSet = zSetOperations.reverseRange(CHAT_SORTED_SET_ + roomNo, rank, rank + 10);

        List<ChatPagingResponseDto> chatMessageDtoList =
                chatMessageSaveDtoSet
                        .stream()
                        .map(ChatPagingResponseDto::byChatMessageDto)
                        .collect(Collectors.toList());

        //Chat_data 부족할경우 MYSQL 추가 조회
        if (chatMessageDtoList.size() != 10) {
            findOtherChatDataInMysql(chatMessageDtoList, roomNo, chatPagingDto.getCursor());
        }

        //redis caching 닉네임으로 작성자 삽입
        for (ChatPagingResponseDto chatPagingResponseDto : chatMessageDtoList) {
            chatPagingResponseDto.setNickname(findUserNicknameByUsername(chatPagingResponseDto.getWriter()));
        }

        return ResponseDto.success(chatMessageDtoList);
    }

    public void cachingDBDataToRedis(Chat chat) {
        ChatMessageSaveDto chatMessageSaveDto = ChatMessageSaveDto.of(chat);
        redisTemplate.opsForZSet()
                .add(
                        CHAT_SORTED_SET_ + chatMessageSaveDto.getRoomNo(),
                        chatMessageSaveDto,
                        chatUtils.changeLocalDateTimeToDouble(chatMessageSaveDto.getCreatedAt()));
    }

    //redis 회원 닉네임 조회 username > userId
    public String findUserNicknameByUsername(String username) {

        String nickname = (String) roomRedisTemplate.opsForHash().get(USERNAME_NICKNAME, username);

        if (nickname != null)
            return nickname;

        //redis 닉네임이 존재하지 않는다면, MYSQL에서 데이터 불러오기
//        User user = userRepository.findByUsername(username)
//                .orElse(null);
        
        FeignUserDto feginUserDto = feginService.getUser(username);
        
        if (feginUserDto == null) return OUT_USER;

        // redis nickname_data insert
        roomRedisTemplate.opsForHash().put(USERNAME_NICKNAME, username, feginUserDto.getNickname());

        return feginUserDto.getNickname();
    }

    public void changeUserCachingNickname(String username, String changedNickname) {
        roomRedisTemplate.opsForHash().put(USERNAME_NICKNAME, username, changedNickname);
    }

    public void deleteUserCahchingNickname(String username) {
        roomRedisTemplate.opsForHash().delete(USERNAME_NICKNAME, username);
    }

    private void findOtherChatDataInMysql(List<ChatPagingResponseDto> chatMessageDtoList, Long roomNo, String cursor) {

        String lastCursor;
        // 데이터가 하나도 없을 경우 현재시간을 Cursor로 활용
        if (chatMessageDtoList.size() == 0 && cursor == null) {
            ;
            lastCursor = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss.SSS"));
        }

        //redis 적재된 마지막 데이터를 입력했을 경우.
        else if (chatMessageDtoList.size() == 0 && cursor != null) {
            lastCursor = cursor;
        }

        // 데이터가 존재할 경우 CreatedAt을 Cursor로 사용
        else lastCursor = chatMessageDtoList.get(chatMessageDtoList.size() - 1).getCreatedAt();

        int dtoListSize = chatMessageDtoList.size();
        Slice<Chat> chatSlice =
                chatRepository
                        .findAllByCreatedAtBeforeAndChatroomOrderByCreatedAtDesc(
                                lastCursor,
                                roomNo,
                                PageRequest.of(0, 30)
                        );

        for (Chat chat : chatSlice.getContent()) {
            cachingDBDataToRedis(chat);
        }


        //추가 데이터가 없을 때 return;
        if (chatSlice.getContent().isEmpty())
            return;

        //추가 데이터가 존재하다면, responseDto에  데이터 추가.
        for (int i = dtoListSize; i <= 10; i++) {
            try {
                Chat chat = chatSlice.getContent().get(i - dtoListSize);
                chatMessageDtoList.add(ChatPagingResponseDto.of(chat));
            } catch (IndexOutOfBoundsException e) {
                return;
            }
        }

    }
}
