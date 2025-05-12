package com.example.myspringapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.myspringapp.entity.Threads;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import com.example.myspringapp.dto.ThreadListDto;
import java.time.LocalDateTime;
import org.springframework.data.repository.query.Param;


@Repository//ここの層はデータベースのデータを入出力するだけの層
public interface ThreadsRepository  extends JpaRepository<Threads, Integer> {

    @Query("""
        SELECT
            new com.example.myspringapp.dto.ThreadListDto(
                t.title,
                t.content,
                t.id,
                u.id,
                u.name,
                t.postedAt
            )
        FROM Threads t
        JOIN t.user u
        ORDER BY t.postedAt DESC
        """)
    // @Query("SELECT new com.example.myspringapp.ThreadListDto(t.title, t.content, t.id, u.id, u.name) FROM threads t JOIN t.user u")
	public List<ThreadListDto> getThreads();

    @Query("""
        SELECT 
            t.postedAt      
        FROM Threads t
        WHERE t.user.id = :userId
        ORDER BY t.postedAt DESC
        LIMIT 1        
        """)
    public LocalDateTime getLatestPost(@Param("userId") Integer userId);

}
