package com.example.myspringapp.dto;

import lombok.Getter;
import lombok.Setter;
import com.example.myspringapp.entity.Users;

@Getter
@Setter
public class UserListDto {
    private Integer id;
    private String username;
    private String mailadress;
    private String password;
    private String phoneNumber;
    private boolean deleted;

    public UserListDto(Integer id, String username, String mailadress, String password, String phoneNumber, boolean deleted) {
    this.id = id;
    this.username = username;
    this.mailadress = mailadress;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.deleted = deleted;
}
}