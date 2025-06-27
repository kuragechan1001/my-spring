package com.example.myspringapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.example.myspringapp.dto.CommentsListDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;


@Service
public class CommentsService{

    @Autowired
    public CommentsRepository commentsRepository;
    @Autowired
    public UsersRepository usersRepository;
    @Autowired
    public ThreadsRepository threadsRepository;

    public Comments postComments(String commentsContent, Integer userId, Integer threadId,LocalDateTime commentPostedAt) {
        Users user = usersRepository.findById(userId.longValue())//これでUsersテーブルのid(user_id）が使える。
        .orElseThrow(() -> new NullPointerException("nullはやめて欲しいです"));
        Threads thread = threadsRepository.findById(threadId)
        .orElseThrow(() -> new NullPointerException("nullは嫌ですって言いましたよね？"));
        //NullPointerException文字の値がNullの時使うやつらしい

        Comments comments = new Comments();
        comments.setCommentsContent(commentsContent);
        comments.setUser(user);
        comments.setThread(thread);
        comments.setCommentPostedAt(commentPostedAt);

        return commentsRepository.save(comments);
    }

    public void delete(Integer id){//voidは戻り値なしでOK。削除して何も返さない。
        // commentsRepository.deleteById(id);これは物理削除
        Comments comments = commentsRepository.findById(id).get();//既存内容を取得
        comments.setDeleted(true);
        commentsRepository.save(comments); //idを見つけて、falseからtrueに変えて更新！（保存
    }

    public Comments updateComments(Integer id, String commentsContent,LocalDateTime commentPostedAt) {
        Comments comments = commentsRepository.findById(id).get();//既存のタイトルと内容をとってこれる？

        comments.setCommentsContent(commentsContent);
       
        if (commentPostedAt != null) {
            comments.setCommentPostedAt(commentPostedAt);
        } else {
            comments.setCommentPostedAt(LocalDateTime.now()); // デフォルト値を設定
        }
            return commentsRepository.save(comments); 
    }

    //  public List<CommentsListDto> getComments() {
    //     return commentsRepository.getComments();
    //     //getCommentsは、threadIdに基づいた投稿を取得する。
    // }

    public List<CommentsListDto> getComments (Integer threadId,Integer offset, Integer limit) {
        Pageable pageable = PageRequest.of(offset / limit, limit, Sort.by(Sort.Direction.DESC, "commentPostedAt"));
        return commentsRepository.getComments(threadId,pageable);
         //getCommentsは、threadIdに基づいた投稿を3件ずつ取得する。
    }

    public List<CommentsListDto> getMyComments (Integer userId,Integer offset, Integer limit) {
        Pageable pageable = PageRequest.of(offset / limit, limit, Sort.by(Sort.Direction.DESC, "commentPostedAt"));
        return commentsRepository.getMyComments(userId,pageable);
         //getCommentsは、threadIdに基づいた投稿を3件ずつ取得する。
    }
    
}