package com.gtbackend.gtbackend.dao;

import com.gtbackend.gtbackend.model.WordAddition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordAdditionRepository extends JpaRepository<WordAddition, Long> {

}


