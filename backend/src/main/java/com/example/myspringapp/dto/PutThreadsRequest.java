package com.example.myspringapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;



@Getter
@Setter
public class PutThreadsRequest {
    @NotEmpty
    private Integer id;
    @NotEmpty
    private String title;
    @NotEmpty
    private String content;
    private LocalDateTime postedAt;

}
