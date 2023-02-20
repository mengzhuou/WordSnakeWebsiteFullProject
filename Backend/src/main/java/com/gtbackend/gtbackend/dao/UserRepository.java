package com.gtbackend.gtbackend.dao;

import com.gtbackend.gtbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);

    @Query("SELECT u.bestScore FROM User u WHERE u.email = :email")
    Integer getBestScore(@Param("email") String email);
}
