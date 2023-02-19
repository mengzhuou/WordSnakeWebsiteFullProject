package com.gtbackend.gtbackend.user;

import com.gtbackend.gtbackend.word.WordModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);

    @Query("SELECT u.bestScore FROM User u WHERE u.email = :email")
    Integer getBestScore(@Param("email") String email);
}
