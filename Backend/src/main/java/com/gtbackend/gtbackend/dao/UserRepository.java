package com.gtbackend.gtbackend.dao;

import com.gtbackend.gtbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    @Query("SELECT u.bestScore FROM User u WHERE u.email = :email")
    Integer getBestScore(@Param("email") String email);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.bestScore = :score WHERE u.email = :email")
    void updateBestScore(@Param("email") String email, @Param("score") int score);

    @Query("SELECT count(*) FROM User")
    Integer numOfUsers();

    @Query("SELECT u.name, u.bestScore FROM User u ORDER BY u.bestScore DESC")
    List<Object[]> getLeaderBoard();

}
