package com.example.myspringapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
public class PutUsersRequest {

    @NotEmpty
    private Integer Id;

    @NotEmpty
    @Size(min = 0, max = 20, message = "名前は20文字以下のキラキラネームで登録してください")
    private String name;

}