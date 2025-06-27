package com.example.myspringapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.myspringapp.entity.Users;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;
import com.example.myspringapp.dto.UserListDto;
import org.springframework.data.repository.query.Param;

@Repository//ここの層はデータベースのデータを入出力するだけの層
public interface UsersRepository  extends JpaRepository<Users, Long> {
    boolean existsByMailadress(String mailadress);
    boolean existsByPhoneNumber(String phoneNumber);
    Optional<Users> findByUsername(String username); 

    @Query("""
    SELECT new com.example.myspringapp.dto.UserListDto(
        u.id,
        u.username,
        u.mailadress,
        u.password,
        u.phoneNumber,
        u.deleted
    )
    FROM Users u
    WHERE u.deleted = false AND u.id = :id
""")
// Pageable pageable = PageRequest.of(0, 3); // 1ページ3件
List<UserListDto> getUsers(@Param("id") Integer id);
}
