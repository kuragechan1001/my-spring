package com.example.myspringapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.myspringapp.dto.ThreadListDto;
import java.util.List;
import com.example.myspringapp.repository.CommentsRepository;
import com.example.myspringapp.entity.Users;
import com.example.myspringapp.entity.Comments;
import com.example.myspringapp.entity.Threads;
import com.example.myspringapp.repository.UsersRepository;
import com.example.myspringapp.repository.ThreadsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Optional;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.time.Duration;


@Service
public class CommentsService{

    @Autowired
    public CommentsRepository commentsRepository;
    @Autowired
    public UsersRepository usersRepository;
    @Autowired
    public ThreadsRepository threadsRepository;

    public Comments postComments(String content, Integer userId, Integer threadId) {
        Users user = usersRepository.findById(userId)//これでUsersテーブルのid(user_id）が使える。
        .orElseThrow(() -> new NullPointerException("nullはやめて欲しいです"));
        Threads thread = threadsRepository.findById(threadId)
        .orElseThrow(() -> new NullPointerException("nullは嫌ですって言いましたよね？"));
        //NullPointerException文字の値がNullの時使うやつらしい

        Comments comments = new Comments();
        comments.setContent(content);
        comments.setUser(user);
        comments.setThread(thread);

        return commentsRepository.save(comments);
    }

    public void delete(Integer id){//voidは戻り値なしでOK。削除して何も返さない。
        commentsRepository.deleteById(id);
    }

    public Comments updateComments(Integer id, String content) {
        Comments comments = commentsRepository.findById(id).get();//既存のタイトルと内容をとってこれる？

        comments.setContent(content);

        return commentsRepository.save(comments); 
    }
}