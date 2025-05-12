package com.example.myspringapp.repository;

import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.myspringapp.entity.Vegetables;

@Repository
public interface VegetablesRepository extends JpaRepository<Vegetables, Long> {}