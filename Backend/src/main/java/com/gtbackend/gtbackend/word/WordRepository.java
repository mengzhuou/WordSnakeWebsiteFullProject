package com.gtbackend.gtbackend.word;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

//write JPA Select query to fetch data from db
@Repository
public interface WordRepository extends JpaRepository<WordModel, Integer> {

    @Query("SELECT w FROM words w")
    List<WordModel> findAll();

    @Query("SELECT w FROM words w WHERE w.word = :inputWord")
    List<WordModel> getWordAndDef(@Param("inputWord") String inputWord);

    @Query("SELECT w FROM words w WHERE w.word = 'snake'")
    List<WordModel> getWordAndDefTest();

    @Query("SELECT w.definition FROM words w WHERE w.word = 'snake'")
    List<String> getDefTest();



//    @Query("select w from WordModel w where w.id = ?1 ")
//    List<WordModel> findById(Integer id);
}
