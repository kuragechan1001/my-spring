package com.example.myspringapp.dto;

import lombok.*;
import com.fasterxml.jackson.annotation.*;
import java.time.LocalDateTime;

@Getter
@Setter
public class PostCommentsRequest {
    private String commentsContent;

    // @JsonProperty("user_id")
    private Integer userId;

    // @JsonProperty("thread_id")//データベース上のカラム名がthread_idだから、それとthreadsIdは同じですよって教えてあげてる
    private Integer threadId;

    private LocalDateTime commentPostedAt;
}