package com.example.myspringapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;
import jakarta.persistence.OneToMany;
import java.util.List;
import com.example.myspringapp.entity.Threads;


@Data
@Entity//データベース使うためのアノテーション
@Table(name="users")//データベースのテーブル名や設定を管理するためのアノテーション
public class Users {
    @Id//主キーを指定
    @GeneratedValue(strategy = GenerationType.IDENTITY)//オートインクリメントみたいなやつっぽい。自動的に生成してくれる
    private Integer id;
    private String username;
    private String mailadress;
    private String password;
    private String phoneNumber;
    private boolean deleted;
    // @OneToMany(mappedBy="threads")
	// private List<Threads> threads;
}