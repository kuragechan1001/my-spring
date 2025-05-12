package com.example.myspringapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.myspringapp.dto.ThreadListDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.myspringapp.dto.UserDto;
import com.example.myspringapp.service.ThreadsService;
import com.example.myspringapp.dto.PostThreadsRequest;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.myspringapp.entity.Threads;
import jakarta.validation.Valid;
import com.example.myspringapp.dto.PutThreadsRequest;

@RestController//ユーザーからのリクエストに対応し、レスポンスを生成する層。問合せが来たら答えてあげる的な所。
@RequestMapping("app")
public class ThreadsController {
 
    @Autowired
    private ThreadsService threadsService;
    //依存性注入？とりあえずとりあえずThreadsSreviceクラスの使いたいやつをくれる
    //アノテーションが好きに選んでとってきて割と優秀な方。でもこの書き方非推奨らしい…

    private final static Logger logger = LoggerFactory.getLogger(ThreadsController.class);
    // デバック作業用。ログをバーッて表示してくれるから、どこで間違えたか見るのに使う

    @GetMapping("/threads")
    public List <ThreadListDto> getThreads() {
        logger.info("ーーーログのテストーーー");
        return threadsService.getThreads();
    }
    //logger.infoの部分は上のでデバック作業につながってる。
    //「/threads」ってリクエスト来たらとりあえずthreadsServiceの中身全部持ってくる。(findallが全部持って来いって意味)

    @PostMapping("/threads/create")
    public Threads postThreads(@RequestBody @Valid PostThreadsRequest request) {
        // ユーザーは仮にDBから取得済みとする（実際は userService.findById などが必要）
        return threadsService.postThreads(request.getTitle(), request.getContent(), request.getUserId(),request.getPostedAt());//
    }

    @DeleteMapping("/threads/delete/{id}")//threadsのidを指定（ダブりがないから）
    public String deleteThreads(@PathVariable Integer id){
        logger.info("ーーーログーーー");
        threadsService.delete(id);
        return "スレッドを消しました";
        //@PathVariable　URLのパス部分をパラメーターとして取得してくれる
    }

    @PutMapping("/threads/update")
    public Threads putThreads(@RequestBody PutThreadsRequest request){
        return threadsService.updateThreads(request.getId(), request.getTitle(), request.getContent());
    }
    
}