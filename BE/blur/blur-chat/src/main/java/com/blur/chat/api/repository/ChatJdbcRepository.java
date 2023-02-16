package com.blur.chat.api.repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.blur.chat.api.entity.Chat;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ChatJdbcRepository {

    private final JdbcTemplate jdbcTemplate;


    public void batchInsertRoomInventories(List<Chat> chatList){


        String sql = "INSERT INTO chats"
                +  "(message, users, chatroom_no, createdAt) VALUE(?,?,?,?)";


        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Chat chat = chatList.get(i);
                ps.setString(1,chat.getMessage());
                ps.setString(2,chat.getUsers());
                ps.setLong(3,chat.getChatroom().getRoomNo());
                ps.setString(4,chat.getCreatedAt());
            }

            @Override
            public int getBatchSize() {
                return chatList.size();
            }
        });
    }

}