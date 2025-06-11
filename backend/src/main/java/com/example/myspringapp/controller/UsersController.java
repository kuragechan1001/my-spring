package com.example.myspringapp.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.myspringapp.service.UsersService;
import jakarta.validation.Valid;
import com.example.myspringapp.dto.PostUsersRequest;
import com.example.myspringapp.entity.Users;
import com.example.myspringapp.dto.PutUsersRequest;
import java.util.List; 

@CrossOrigin(origins = "http://localhost:3000") // フロントエンドのURLを指定
@RestController

@RequestMapping("/userApp")

public class UsersController {

    @Autowired
        private UsersService usersService;

    @PostMapping("/users/create")
        public Users postUsers(@RequestBody @Valid PostUsersRequest request) {
        return usersService.postUsers(request.getName(), request.getMailadress(), request.getPassword(), request.getPhoneNumber());
    }

    @DeleteMapping("/users/delete/{id}")
        public String deleteUsers(@PathVariable Integer id){
        usersService.delete(id);
        return "人を１人消しました";
    }

    @PutMapping("/users/update")
        public Users putUsers(@RequestBody PutUsersRequest request){
        return usersService.putUsers(request.getId(), request.getName(), request.getMailadress(), request.getPassword(), request.getPhoneNumber());
    }

    
    @GetMapping("/users")
        public List<Users>getUsers() {
        return usersService.getUsers();
    }

    @PostMapping("/users/login")
        public Users UsersLogin(@RequestBody @Valid PostUsersRequest request) {
        return usersService.UsersLogin(request.getName(), request.getPassword());
    }
    
}

