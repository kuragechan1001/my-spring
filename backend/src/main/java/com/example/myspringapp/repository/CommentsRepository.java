package com.example.myspringapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.myspringapp.entity.Comments;
// import java.util.List;


@Repository//ここの層はデータベースのデータを入出力するだけの層
public interface CommentsRepository  extends JpaRepository<Comments, Integer> {}