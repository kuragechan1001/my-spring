package com.example.myspringapp.dto;

import lombok.Getter;
import lombok.Setter;
import com.example.myspringapp.entity.Users;
import com.example.myspringapp.dto.UserDto;
import com.example.myspringapp.entity.Threads;
import com.example.myspringapp.dto.ThreadListDto;
import java.time.LocalDateTime;

@Getter
@Setter
public class CommentsListDto {
    private Integer id;
    private String commentsContent;
    private ThreadListDto thread;
    private UserDto user;
    private LocalDateTime commentPostedAt;

     public CommentsListDto (Integer id,String commentsContent, Integer threadId, Integer user_id,String username,  LocalDateTime commentPostedAt){  
        this.id = id;
        this.commentsContent = commentsContent;
        this.thread = new ThreadListDto();
        this.thread.setId(threadId);
        this.user = new UserDto(user_id, username); 
        this.commentPostedAt = commentPostedAt;
    }
     
}
