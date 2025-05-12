package com.example.myspringapp.controller;

import com.example.myspringapp.service.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.myspringapp.entity.Comments;
import org.springframework.web.bind.annotation.*;
import com.example.myspringapp.dto.PostCommentsRequest ;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import com.example.myspringapp.repository.CommentsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.myspringapp.dto.PutCommentsRequest;

@RestController
@RequestMapping("app")
public class CommentsController {

    @Autowired
    private CommentsService commentsService;
    @Autowired
    private CommentsRepository commentsRepository;

    private final static Logger logger = LoggerFactory.getLogger(CommentsController.class);
    
    @PostMapping("/comments/post")
    public Comments postComments(@RequestBody @Valid PostCommentsRequest request ) {
        return commentsService.postComments(request.getContent(),request.getUserId(),request.getThreadId());
    } 
    //@RequestBodyはリクエストボディに含まれるJSONデータを、適切なJavaオブジェクトに自動的に変換してくれるてくれる
    //@Validは検証を行いたいオブジェクトにつける。これでPostCommentsRequestから来たリクエストにバリデーションをつける。

    @DeleteMapping("/comments/{id}")//commentのidを指定して消せるようにしたい
    public String deleteComments(@PathVariable Integer id){
        commentsService.delete(id);
        return "消せたあああああ!";
        //@PathVariable　URLのパス部分をパラメーターとして取得してくれる
    }

    @PutMapping("/comments/update")
    public Comments putComments(@RequestBody PutCommentsRequest request){
        return commentsService.updateComments(request.getId(), request.getContent());
    }
}

