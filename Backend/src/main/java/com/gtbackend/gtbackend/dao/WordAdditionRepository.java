package com.gtbackend.gtbackend.dao;

import com.gtbackend.gtbackend.model.WordAddition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordAdditionRepository extends JpaRepository<WordAddition, Long> {
    @Query("SELECT COUNT(w) > 0 FROM WordAddition  w WHERE w.word = :word")
    boolean isWordForAdditionExist(@Param("word") String word);

//    @Modifying
//    @Transactional
//    @Query(value = "INSERT INTO feedback (email, timestamp, message, rating, status) VALUES (:email, :timestamp, :message, :rating, :status)", nativeQuery = true)
//    void addWord(@Param("email") String email, @Param("timestamp") String timestamp, @Param("message") String message, @Param("rating") Float rating, @Param("status") String status);

    @Query(value = "SELECT * FROM word_additions", nativeQuery = true)
    List<String> getFromWordAddition();
}


