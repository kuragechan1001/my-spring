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
import java.util.List; 
import org.springframework.http.ResponseEntity;
import java.util.Map;
import com.example.myspringapp.dto.CommentsListDto;


@CrossOrigin(origins = "http://localhost:3000") // フロントエンドのURLを許可
@RestController
@RequestMapping("app")
public class CommentsController {

    @Autowired
    private CommentsService commentsService;
    @Autowired
    private CommentsRepository commentsRepository;

    private final static Logger logger = LoggerFactory.getLogger(CommentsController.class);
    
    @PostMapping("/comments/post")
    public Comments postComments(@RequestBody @Valid PostCommentsRequest request) {
        return commentsService.postComments(request.getCommentsContent(),request.getUserId(),request.getThreadId(),request.getCommentPostedAt());
    } 
    //@RequestBodyはリクエストボディに含まれるJSONデータを、適切なJavaオブジェクトに自動的に変換してくれるてくれる
    //@Validは検証を行いたいオブジェクトにつける。これでPostCommentsRequestから来たリクエストにバリデーションをつける。

    @PutMapping("/comments/{id}")//commentのidを指定して消せるようにしたい
    public  ResponseEntity<Map<String, String>> deleteComments(@PathVariable Integer id){// Map（連想配列） を作る構文.ResponseEntityは型。
        commentsService.delete(id);
        return ResponseEntity.ok(Map.of("message", "コメントを消しました"));//message", "コメントを消しましたもString型だから、<String, String>
        //@PathVariable　URLのパス部分をパラメーターとして取得してくれる
    }

    @PutMapping("/comments/update")
    public Comments putComments(@RequestBody PutCommentsRequest request){
        return commentsService.updateComments(request.getId(), request.getCommentsContent(),request.getCommentPostedAt());
    }

     @GetMapping("/comments")
        public List<CommentsListDto>getComments(
            @RequestParam Integer threadId,//@RequestParamブラウザからのリクエストの値（パラメータ）を取得することができるアノテーション
            @RequestParam Integer offset ,
            @RequestParam Integer limit
            ) {
        return commentsService.getComments(threadId,offset, limit);
    }

         @GetMapping("/comments/mypage")
        public List<CommentsListDto>getMyComments(
            @RequestParam Integer userId,//@RequestParamブラウザからのリクエストの値（パラメータ）を取得することができるアノテーション
            @RequestParam Integer offset ,
            @RequestParam Integer limit
            ) {
        return commentsService.getMyComments(userId,offset, limit);
    }
}

