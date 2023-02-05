package com.blur.chat.api.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.blur.chat.api.dto.UserDto;


public class test implements RowMapper<UserDto>{

	@Override
	public UserDto mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new UserDto(rs.getString("nickname"));
	}
	
}
	
