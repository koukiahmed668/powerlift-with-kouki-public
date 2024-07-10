package com.powerliftwithkouki.powerlift.Repository;

import com.powerliftwithkouki.powerlift.Entity.Difficulty;
import com.powerliftwithkouki.powerlift.Entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface ExerciseRepository extends JpaRepository<Exercise,Long> {
    List<Exercise> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrDifficulty(String name, String description, Difficulty difficulty);

    List<Exercise> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String query, String query1);
}
