package com.blur.chat.config;

import java.util.Optional;

import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import com.blur.chat.api.dto.request.ChatMessageSaveDto;
import com.blur.chat.api.service.ChatRoomService;
import com.blur.chat.api.service.RedisPublisher;
import com.blur.chat.api.service.UserInfo;
import com.blur.chat.utils.ChatUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class StompHandler implements ChannelInterceptor {

//    private final JwtDecoder jwtDecoder;

//    public static final String TOKEN = "token";
	public static final String USERID = "userId";
    public static final String SIMP_DESTINATION = "simpDestination";
    public static final String SIMP_SESSION_ID = "simpSessionId";
    public static final String INVALID_ROOM_ID = "InvalidRoomId";

//    private final HeaderTokenExtractor headerTokenExtractor;
    private final ChatUtils chatUtils;

    private final ChannelTopic topic;

    private final ChatRoomService chatRoomService;

    private final RedisPublisher redisPublisher;
    
    private final UserInfo userInfo;


    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        // 최초 소켓 연결
        if (StompCommand.CONNECT == accessor.getCommand()) {
            String headerToken = accessor.getFirstNativeHeader(USERID);
//            String token = headerTokenExtractor.extract(headerToken);
//            string userId = accessor.g
//            log.info(jwtDecoder.decodeUsername(token).getUsername());
        }
        
        // 소켓 연결 후 ,SUBSCRIBE 등록
        else if (StompCommand.SUBSCRIBE == accessor.getCommand()) {
            log.info("SubScribe destination : " + message.getHeaders().get(SIMP_DESTINATION));
            log.info("SubScribe sessionId : " + message.getHeaders().get(SIMP_SESSION_ID));

            String headerToken = accessor.getFirstNativeHeader(USERID);
//            String token = headerTokenExtractor.extract(headerToken);
//            String username = jwtDecoder.decodeUsername(token).getUsername();
            String username = headerToken;

            String destination = Optional.ofNullable(
                    (String) message.getHeaders().get(SIMP_DESTINATION)
            ).orElse(INVALID_ROOM_ID);

            String sessionId = Optional.ofNullable(
                    (String) message.getHeaders().get(SIMP_SESSION_ID)
            ).orElse(null);

            String roomNo = chatUtils.getRoodIdFromDestination(destination);

            //redis에  key(roomId) :  Value( sessionId , nickname ) 저장
            chatRoomService.enterChatRoom(roomNo, sessionId, username);


            redisPublisher.publish(topic,
                    ChatMessageSaveDto.builder()
                            .type(ChatMessageSaveDto.MessageType.ENTER)
                            .roomNo(roomNo)
                            .userList(chatRoomService.findUser(roomNo, sessionId))
                            .build()
            );

        }

        //reids SubScribe 해제
        else if (StompCommand.UNSUBSCRIBE == accessor.getCommand()) {

            String sessionId = Optional.ofNullable(
                    (String) message.getHeaders().get(SIMP_SESSION_ID)
            ).orElse(null);

            String roomNo = chatRoomService.leaveChatRoom(sessionId);

            redisPublisher.publish(topic,
                    ChatMessageSaveDto.builder()
                            .type(ChatMessageSaveDto.MessageType.QUIT)
                            .roomNo(roomNo)
                            .userList(chatRoomService.findUser(roomNo, sessionId))
                            .build()
            );
        }
        //소켓 연결 후 , 소켓 연결 해제 시
        else if (StompCommand.DISCONNECT == accessor.getCommand()) {

            String sessionId = Optional.ofNullable(
                    (String) message.getHeaders().get(SIMP_SESSION_ID)
            ).orElse(null);

            String roomNo = chatRoomService.disconnectWebsocket(sessionId);

            redisPublisher.publish(topic,
                    ChatMessageSaveDto.builder()
                            .type(ChatMessageSaveDto.MessageType.QUIT)
                            .roomNo(roomNo)
                            .userList(chatRoomService.findUser(roomNo, sessionId))
                            .build()
            );

        }
        return message;
    }
}
