package com.example.myspringapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.myspringapp.entity.Threads;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import com.example.myspringapp.dto.ThreadListDto;
import java.time.LocalDateTime;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;



@Repository//ここの層はデータベースのデータを入出力するだけの層
public interface ThreadsRepository  extends JpaRepository<Threads, Integer> {

    @Query("""
        SELECT
            new com.example.myspringapp.dto.ThreadListDto(
                t.id,
                t.title,
                t.content,
                u.id,
                u.username,
                t.postedAt
            )
        FROM Threads t
        JOIN t.user u
        WHERE t.deleted = false
        ORDER BY t.postedAt DESC
        """)
    // @Query("SELECT new com.example.myspringapp.ThreadListDto(t.title, t.content, t.id, u.id, u.name) FROM threads t JOIN t.user u")
	public List<ThreadListDto> getThreads(Pageable pageable);//「2ページ目のスレッドを3件、投稿日が新しい順で取得してね！」みたいな使い方

    @Query("""
        SELECT 
            t.postedAt      
        FROM Threads t
        WHERE t.user.id = :userId
        ORDER BY t.postedAt DESC
        LIMIT 1        
        """)
    public LocalDateTime getLatestPost(@Param("userId") Integer userId);

     @Query("""
        SELECT
            new com.example.myspringapp.dto.ThreadListDto(
                t.id,
                t.title,
                t.content,
                u.id,
                u.username,
                t.postedAt
            )
        FROM Threads t
        JOIN t.user u
        WHERE t.deleted = false AND t.user.id = :userId
        ORDER BY t.postedAt DESC
        """)
    // @Query("SELECT new com.example.myspringapp.ThreadListDto(t.title, t.content, t.id, u.id, u.name) FROM threads t JOIN t.user u")
	public List<ThreadListDto> getMyThreads(@Param("userId") Integer userId,Pageable pageable);

}
