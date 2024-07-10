package com.powerliftwithkouki.powerlift.ServiceIMPL;

import com.powerliftwithkouki.powerlift.DTO.ExerciceDTO;
import com.powerliftwithkouki.powerlift.Entity.Difficulty;
import com.powerliftwithkouki.powerlift.Entity.Exercise;
import com.powerliftwithkouki.powerlift.Exception.NotFoundException;
import com.powerliftwithkouki.powerlift.Repository.ExerciseRepository;
import com.powerliftwithkouki.powerlift.Service.ExerciseService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExerciseServiceIMPL implements ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Exercise createExercice(ExerciceDTO exerciceDTO) {
        Exercise exercise = modelMapper.map(exerciceDTO, Exercise.class);
        return exerciseRepository.save(exercise);
    }

    @Override
    public List<ExerciceDTO> getAllExercices() {
        List<Exercise> exercises = exerciseRepository.findAll();
        return exercises.stream()
                .map(exercise -> modelMapper.map(exercise, ExerciceDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ExerciceDTO getExerciceById(Long id) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Exercice not found with id: " + id));
        return modelMapper.map(exercise, ExerciceDTO.class);
    }

    @Override
    public void deleteExercice(Long id) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Exercice not found with id: " + id));
        exerciseRepository.delete(exercise);
    }

    @Override
    public List<ExerciceDTO> searchExercices(String query) {
        Difficulty difficulty = null;
        try {
            difficulty = Difficulty.valueOf(query.toLowerCase());
        } catch (IllegalArgumentException ignored) {
            // If the query doesn't match any enum constant, proceed without setting difficulty
        }

        List<Exercise> exercises;
        if (difficulty != null) {
            // If difficulty is set, search by name, description, and difficulty
            exercises = exerciseRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrDifficulty(query, query, difficulty);
        } else {
            // If difficulty is not set or invalid, search only by name and description
            exercises = exerciseRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
        }

        return exercises.stream()
                .map(exercise -> modelMapper.map(exercise, ExerciceDTO.class))
                .collect(Collectors.toList());
    }


}
