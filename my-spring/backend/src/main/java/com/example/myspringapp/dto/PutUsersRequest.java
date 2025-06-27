package com.example.myspringapp.dto;

import lombok.*;
import com.fasterxml.jackson.annotation.*;
import jakarta.validation.constraints.*;
import jakarta.annotation.Nullable;




@Getter
@Setter
public class PutUsersRequest {

    // @Min(value = 0)
    private Integer Id;

    @NotEmpty
    @Size(min = 0, max = 20, message = "名前は20文字以下のキラキラネームで登録してください")
    private String username;

    @Email
    private String mailadress;

    @NotEmpty
    @Pattern(regexp="^(?=.*[A-Z])[a-zA-Z0-9]{3,24}+$",  message = "パスワードは３文字以上２４文字以下で大文字小文字と数字を最低一個使ってください")//最低一文字は大文字を含む、半角英数字を含む3～24文字のパスワード
    private String password;//@Patternは指定された正規表現と一致する必要があるアノテーション
   
    @Pattern(regexp="^\\d{3}-\\d{4}-\\d{4}$", message="電話番号の形式が正しくありません")
    private String phoneNumber;

}