package com.example.myspringapp.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.myspringapp.service.UsersService;
import jakarta.validation.Valid;
import com.example.myspringapp.dto.PostUsersRequest;
import com.example.myspringapp.entity.Users;
import com.example.myspringapp.dto.PutUsersRequest;
import java.util.List; 
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Map;
import com.example.myspringapp.entity.JwtUtil;
import com.example.myspringapp.dto.UserListDto;

@RestController
 @CrossOrigin(origins = "http://localhost:3000") // フロントエンドのURLを許可
@RequestMapping("/app")

public class UsersController {

    private final JwtUtil jwtUtil;

    @Autowired
    public UsersController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Autowired
        private UsersService usersService;

    @PostMapping("/users/create")
        public Users postUsers(@RequestBody @Valid PostUsersRequest request) {
        return usersService.postUsers(request.getUsername(), request.getMailadress(), request.getPassword(), request.getPhoneNumber());
    }

    @PutMapping("/users/delete/{id}")
        public  ResponseEntity<Map<String, String>> deleteUsers(@PathVariable Integer id){
        usersService.delete(id);
        return ResponseEntity.ok(Map.of("message", "人を１人消しました"));
        //"message", "人を１人消しました”もString型だから、<String, String>
    }

    @PutMapping("/users/update")
        public Users putUsers(@RequestBody PutUsersRequest request){
        return usersService.putUsers(request.getId(), request.getUsername(), request.getMailadress(), request.getPassword(), request.getPhoneNumber());
    }

    
    @GetMapping("/users")
        public List<UserListDto>getUsers(  
            @RequestParam Integer id)
            //@RequestParamブラウザからのリクエストの値（パラメータ）を取得することができるアノテーション) 
        {
        return usersService.getUsers(id);
    }

    // @PostMapping("/users/login")
    // @CrossOrigin(origins = "http://localhost:3000") // フロントエンドのURLを指定
    //     public Users UsersLogin(@RequestBody @Valid PostUsersRequest request) {
    //     return usersService.UsersLogin(request.getUsername(), request.getPassword());
    // }
    @PostMapping("/users/login")
   
        public ResponseEntity<?> UsersLogin(@RequestBody @Valid PostUsersRequest request) {
        Users users = usersService.UsersLogin(request.getUsername(), request.getPassword());
    
        if (users != null) {
            String token = jwtUtil.generateToken(users); // トークン生成
            return ResponseEntity.ok(Map.of("token", token, "user", users)); // トークンとユーザー情報を返す
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
    
}

