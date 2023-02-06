package com.blur.chat.utils;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.redis.core.BoundZSetOperations;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.blur.chat.api.dto.request.ChatMessageSaveDto;
import com.blur.chat.api.entity.Chat;
import com.blur.chat.api.entity.Chatroom;
import com.blur.chat.api.repository.ChatJdbcRepository;
import com.blur.chat.api.repository.ChatRepository;
import com.blur.chat.api.repository.ChatRoomNoRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class ChatWriteBackScheduling {

    private final RedisTemplate<String,Object> redisTemplate;

    private final RedisTemplate<String, ChatMessageSaveDto> chatRedisTemplate;

    private final ChatRepository chatRepository;

    private final ChatJdbcRepository chatJdbcRepository;
    
//    private final WorkSpaceRepository workSpaceRepository;
    
    private final ChatRoomNoRepository chatRoomNoRepository;

    @Scheduled(cron = "0 0 0/1 * * *")
    @Transactional
    public void writeBack(){
        log.info("Scheduling start");
        //여기서부터 읽어오는 과정.
        BoundZSetOperations<String, ChatMessageSaveDto> setOperations = chatRedisTemplate.boundZSetOps("NEW_CHAT");

        ScanOptions scanOptions = ScanOptions.scanOptions().build();

        List<Chat> chatList = new ArrayList<>();
        try(Cursor<ZSetOperations.TypedTuple<ChatMessageSaveDto>> cursor= setOperations.scan(scanOptions)){

            while(cursor.hasNext()){
                ZSetOperations.TypedTuple<ChatMessageSaveDto> chatMessageDto = cursor.next();

                Chatroom chatroom = chatRoomNoRepository
                        .findById(Long.parseLong(chatMessageDto.getValue().getRoomNo()))
                        .orElse(null);

                if(chatroom == null) {
                    continue;
                }

                chatList.add( Chat.of(chatMessageDto.getValue(), chatroom));
            }
            chatJdbcRepository.batchInsertRoomInventories(chatList);

            redisTemplate.delete("NEW_CHAT");

        }catch (Exception e){
            e.printStackTrace();
        }

        log.info("Scheduling done");
    }
}
