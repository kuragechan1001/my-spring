package com.example.myspringapp.dto;

import lombok.Getter;
import lombok.Setter;
import com.example.myspringapp.entity.Users;
import com.example.myspringapp.dto.UserDto;
import java.time.LocalDateTime;

@Getter
@Setter
public class ThreadListDto {
    private String title;
    private String content;
    private Integer id;
    private UserDto user;
    private LocalDateTime postedAt;

    public ThreadListDto (String title, String content, Integer id, Integer user_id, String name, LocalDateTime postedAt){  
        this.id = id;
        this.title = title;
        this.content = content;
        this.user = new UserDto(user_id, name);
        this.postedAt = postedAt;
    }
}
