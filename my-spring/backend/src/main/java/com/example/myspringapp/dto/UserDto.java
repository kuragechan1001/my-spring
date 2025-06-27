package com.example.myspringapp.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import com.example.myspringapp.entity.Threads;
import com.example.myspringapp.entity.Users;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;


@Getter
@Setter
@AllArgsConstructor
public class UserDto {
    private Integer id;
    private String username;  
}
