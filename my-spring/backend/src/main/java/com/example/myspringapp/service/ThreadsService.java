package com.example.myspringapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.myspringapp.dto.ThreadListDto;
import java.util.List;
import com.example.myspringapp.repository.ThreadsRepository;
import com.example.myspringapp.entity.Users;
import com.example.myspringapp.entity.Threads;
import com.example.myspringapp.repository.UsersRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Optional;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.time.Duration;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;


@Service//ここの層はシステムの目的になる処理をするところ。
public class ThreadsService{

    @Autowired
    public ThreadsRepository threadsRepository;//これでコントロール→サービス→リポジトリになる？
    @Autowired
    public UsersRepository usersRepository;

    private final static Logger logger = LoggerFactory.getLogger(ThreadsService.class);

    public List<ThreadListDto> getThreads(Integer offset, Integer limit) {
        Pageable pageable = PageRequest.of(offset / limit, limit, Sort.by(Sort.Direction.DESC, "postedAt"));
        return threadsRepository.getThreads(pageable);
        //getThreadsは、スレッドリポジトリのfindThreadsの中身を返す
    }

    public Threads postThreads(String title, String content, Integer userId, LocalDateTime postedAt) {
        logger.info("usrId:{}" + userId);
        Users user = usersRepository.findById(userId.longValue()).get();//findByIdの戻り値は勝手にOptionalの型になってるから書かなくていい
        // .orElseThrow(() -> new IllegalArgumentException("nullだからダメです"));

        // LocalDateTime now = LocalDateTime.now();
        // LocalDateTime latestPost = threadsRepository.getLatestPost(userId);
        // logger.info("now: "+now);
        // logger.info("latestPost: "+latestPost);
        // Duration timeInterval = Duration.between(latestPost,now);//Durationは時刻間隔を表すオブジェクト
        
        // try{
        //     if( timeInterval.getSeconds() < 60 ){
        //     logger.info("入りました");
        //    throw new IllegalStateException("時間をおいてから出直してください。");//メソッドのパラメータ（引数）が不正だった場合にスローする例外クラス
        //     }
        // }catch(IllegalStateException e){
        //     logger.info("キャッチ入りました");
        //     throw new IllegalStateException("時間制限中"); 
        // }

        Threads threads = new Threads();
        threads.setTitle(title);
        threads.setContent(content);
        threads.setUser(user);//ユーザーをスレッドに入れる。
        threads.setPostedAt(postedAt);

        return threadsRepository.save(threads);//スレッドを保存。
    }

    public void delete(Integer id){//voidは戻り値なしでOK。削除して何も返さない。
        // threadsRepository.deleteById(id);//物理削除
        Threads threads = threadsRepository.findById(id).get();//既存内容を取得

        threads.setDeleted(true);
        
        threadsRepository.save(threads); //idを見つけて、falseからtrueに変えて更新！（保存）
    }

    public Threads updateThreads(Integer id, String title, String content, LocalDateTime postedAt) {
        Threads threads = threadsRepository.findById(id).get();//既存内容をとってこれる？
        
        threads.setTitle(title);
        threads.setContent(content);

        if (postedAt != null) {
            threads.setPostedAt(postedAt);
        } else {
            threads.setPostedAt(LocalDateTime.now()); // デフォルト値を設定
        }
        return threadsRepository.save(threads); 
    }

    public List<ThreadListDto> getMyThreads(Integer userId,Integer offset, Integer limit) {
        Pageable pageable = PageRequest.of(offset / limit, limit, Sort.by(Sort.Direction.DESC, "postedAt"));
        return threadsRepository.getMyThreads(userId,pageable);
        //getThreadsは、スレッドリポジトリのfindThreadsの中身を返す
    }
}