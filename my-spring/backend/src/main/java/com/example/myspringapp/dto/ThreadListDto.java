package com.example.myspringapp.dto;

import lombok.Getter;
import lombok.Setter;
import com.example.myspringapp.entity.Users;
import com.example.myspringapp.dto.UserDto;
import java.time.LocalDateTime;

@Getter
@Setter
public class ThreadListDto {
    private Integer id;
    private String title;
    private String content;
    private UserDto user;
    private LocalDateTime postedAt;

     public ThreadListDto() {//commentsListDtoで使うやつ
    }

    public ThreadListDto (Integer id,String title, String content, Integer user_id, String username, LocalDateTime postedAt){  
        this.id = id;
        this.title = title;
        this.content = content;
        this.user = new UserDto(user_id, username);
        this.postedAt = postedAt;
    }
    
}
