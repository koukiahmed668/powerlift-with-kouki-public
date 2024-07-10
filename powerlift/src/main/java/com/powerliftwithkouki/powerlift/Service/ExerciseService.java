package com.powerliftwithkouki.powerlift.Service;

import com.powerliftwithkouki.powerlift.DTO.ExerciceDTO;
import com.powerliftwithkouki.powerlift.Entity.Exercise;

import java.util.List;

public interface ExerciseService {
    Exercise createExercice(ExerciceDTO exerciceDTO);
    List<ExerciceDTO> getAllExercices();
    ExerciceDTO getExerciceById(Long id);
    void deleteExercice(Long id);
    List<ExerciceDTO> searchExercices(String query);

}
