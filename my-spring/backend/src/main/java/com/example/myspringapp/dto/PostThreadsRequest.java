package com.example.myspringapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;


@Getter
@Setter
public class PostThreadsRequest {
    private String title;
    private String content;

    // @NotEmpty
    // @Min(value = 1)
    // @JsonProperty("user_id")
    private Integer userId;
   
    // @JsonProperty("posted_at")
    private LocalDateTime postedAt;
    
}
