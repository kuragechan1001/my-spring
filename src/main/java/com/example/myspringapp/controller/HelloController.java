package com.example.myspringapp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api")

public class HelloController {
    @GetMapping("/hell")
    public String hello() {
        return "hello";
    }

    @GetMapping("/godbuy")
    public String godbuy () {
         return "godbuy";
    }
}






