package com.example.myspringapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.myspringapp.entity.Comments;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import org.springframework.data.domain.Pageable;
import com.example.myspringapp.dto.CommentsListDto;
import org.springframework.data.repository.query.Param;


@Repository//ここの層はデータベースのデータを入出力するだけの層
public interface CommentsRepository  extends JpaRepository<Comments, Integer> {
    //  @Query("""
    //     SELECT
    //         new com.example.myspringapp.dto.CommentsListDto(
    //             c.content,
    //             t.id,
    //             u.id,
    //             c.postedAt
    //         )
    //     FROM Comments c
    //     JOIN c.user u
    //     JOIN c.thread t
    //     WHERE c.deleted = false AND c.threadId = :threadId
    //     ORDER BY c.postedAt DESC
    //     """)
	// public List<CommentsListDto> getComments();
    //特定のスレッドIDに紐づくデータだけに絞る条件。
    // コメント c が所属しているスレッドのIDが :threadId（引数で渡された値）と一致するデータだけを対象にする。
    // :threadId のようにコロンが付いてるのは、「プレースホルダー（引数）」で、実行時に渡される値に置き換えられる。
    @Query("""
    SELECT new com.example.myspringapp.dto.CommentsListDto(
        c.id,
        c.commentsContent,
        c.thread.id,
        u.id,
        u.username,
        c.commentPostedAt
    )
    FROM Comments c
    JOIN c.user u
    WHERE c.deleted = false AND c.thread.id = :threadId 
    ORDER BY c.commentPostedAt DESC
""")
// Pageable pageable = PageRequest.of(0, 3); // 1ページ3件
List<CommentsListDto> getComments(@Param("threadId") Integer threadId,Pageable pageable);//スレッドIDを引数で渡して、「その投稿だけに対応したコメント一覧」が取得できる。

  @Query("""
    SELECT new com.example.myspringapp.dto.CommentsListDto(
        c.id,
        c.commentsContent,
        c.thread.id,
        u.id,
        u.username,
        c.commentPostedAt
    )
    FROM Comments c
    JOIN c.user u
    WHERE c.deleted = false AND c.user.id = :userId
    ORDER BY c.commentPostedAt DESC
""")
// Pageable pageable = PageRequest.of(0, 3); // 1ページ3件
List<CommentsListDto> getMyComments(@Param("userId") Integer userId,Pageable pageable);

}