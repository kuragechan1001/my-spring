package com.example.myspringapp.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.example.myspringapp.entity.Users;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import jakarta.validation.constraints.Size;

import jakarta.annotation.Nullable;

@Data
@Entity//データベース使うためのアノテーション
@Table(name="Comments")//データベースのテーブル名や設定を管理するためのアノテーション
public class Comments{ 
    @Id//主キーを指定
    @GeneratedValue(strategy = GenerationType.IDENTITY)//オートインクリメントみたいなやつっぽい。自動的に生成してくれる
    private Integer id;

    @Size(max = 140, min = 5, message = "5文字以上で入力してください")
    private String commentsContent;

    @ManyToOne//多い→１つ（ユーザーテーブルのユーザーネームとユーザーIDがスレッドテーブルのユーザーIDに詰まってる）
    @JoinColumn(name = "user_id")//外部キーとしてuser_idを設定
    @Nullable
    private Users user;

    @ManyToOne
    @JoinColumn(name = "thread_id")//外部キーとしてuser_idを設定
    @Nullable
    private Threads thread;

    @Nullable
    // @CreatedDate
    private LocalDateTime commentPostedAt;

    @PrePersist
    protected void onCreate(){
        this.commentPostedAt = LocalDateTime.now();
    }

     private boolean deleted;
 }