// package com.example.myspringapp.controller;

// import org.springframework.web.bind.annotation.*;
// import org.springframework.beans.factory.annotation.Autowired;
// import com.example.myspringapp.service.AuthService;

// //ログイン、サインアップ時のエンドポイント
// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {
//    @Autowired
//    private AuthService authService;

//    @PostMapping("/signup")
//    public ResponseEntity<User> signup(@Valid @RequestBody SignupRequestDto signupRequestDto) {
//        User signupUser = authService.signup(signupRequestDto);
//        return ResponseEntity.ok(signupUser);
//    }

//    @PostMapping("/login")
//    public ResponseEntity<ResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
       
//        ResponseDto response = authService.authenticateUser(loginRequestDto);
//        return ResponseEntity.ok(response);
//    }    
// }

// //認証後にアクセス可能なエンドポイント
// @RestController
// @RequestMapping("/home")
// public class HomeController {
//    @GetMapping
//    public String hello(@AuthenticationPrincipal UserDetails userDetails) {
//    	return "hello, " + userDetails.getUsername();
//    }
// }