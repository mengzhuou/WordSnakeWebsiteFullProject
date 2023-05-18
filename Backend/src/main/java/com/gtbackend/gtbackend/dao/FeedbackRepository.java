package com.gtbackend.gtbackend.dao;

import com.gtbackend.gtbackend.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, String> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO feedback (email, timestamp, message, status) VALUES (:email, :timestamp, :message, :status)", nativeQuery = true)
    void addFeedback(@Param("email") String email, @Param("timestamp") LocalDateTime timestamp, @Param("message") String message, @Param("status") String status);


}
