package com.example.myspringapp.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.example.myspringapp.entity.Users;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import jakarta.annotation.Nullable;
import lombok.*;
import com.fasterxml.jackson.annotation.*;
import jakarta.validation.constraints.Size;


@Data
@Entity//データベース使うためのアノテーション
@Table(name="threads")//データベースのテーブル名や設定を管理するためのアノテーション
public class Threads{ 
    @Id//主キーを指定
    @GeneratedValue(strategy = GenerationType.IDENTITY)//オートインクリメントみたいなやつっぽい。自動的に生成してくれる
    private Integer id;

    @Size(max = 140, min = 1, message = "1文字以上で入力してください")
    private String title;

    @Size(max = 140, min = 5, message = "5文字以上で入力してください")
    private String content;
    // @Column(name = "user_id", insertable=false, updatable=false)
    // private Integer userId;

    @ManyToOne//多い→１つ（ユーザーテーブルのユーザーネームとユーザーIDがスレッドテーブルのユーザーIDに詰まってる）
    @JoinColumn(name = "user_id")//外部キーとしてuser_idを設定
    private Users user;

    @Nullable
    // @CreatedDate
    private LocalDateTime postedAt;

    @PrePersist
    protected void onCreate(){
        this.postedAt = LocalDateTime.now();
    }

     private boolean deleted = false;//trueになったら消される

 }