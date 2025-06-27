//DBとのアクセスメソッドを実装したクラス
package com.example.myspringapp.dto;

import lombok.*;
import com.fasterxml.jackson.annotation.*;

@Data
public class LoginUserDto {
    private String username;
    private String password;

}