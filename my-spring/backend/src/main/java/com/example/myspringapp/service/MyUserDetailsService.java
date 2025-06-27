//アプリケーションの認証処理 でユーザー情報を取得するためのサービスを定義
package com.example.myspringapp.service;

import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import com.example.myspringapp.entity.Users;
import java.util.ArrayList;
import com.example.myspringapp.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User; // Spring SecurityのUserを使用

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepository usersRepository;

    // Spring Security が求める標準のメソッド
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = usersRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return User.withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }

    // JWTやIDベースで使いたいとき用の独自メソッド
    public UserDetails loadUserById(Long id) {
        Users user = usersRepository.findById(id)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return User.withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }
}


// @Service
// public class MyUserDetailsService implements UserDetailsService {

//     @Autowired
//     private UsersRepository usersRepository; // ユーザー情報を取得するリポジトリ

//     @Override// loadUserByUsernameはSpring Securityの認証処理で、指定されたユーザー名に対応するユーザー情報を取得するメソッド
//     public UserDetails loadUserById(Long id) {
//          Users user = usersRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));

//         return User.withUsername(users.getUsername())
//                 .password(users.getPassword()) // DBに保存されたハッシュ化されたパスワードを使用
//                 .authorities("USER")
//                 .build();
//     }
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//         Users user = usersRepository.findByUsername(username)
//             .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//         return User.withUsername(user.getUsername())
//                 .password(user.getPassword())
//                 .authorities("USER")
//                 .build();
// }
// }