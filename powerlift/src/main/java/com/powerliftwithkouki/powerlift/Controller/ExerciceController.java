package com.powerliftwithkouki.powerlift.Controller;

import com.powerliftwithkouki.powerlift.DTO.ExerciceDTO;
import com.powerliftwithkouki.powerlift.Entity.Exercise;
import com.powerliftwithkouki.powerlift.Service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercices")
public class ExerciceController {

    @Autowired
    private ExerciseService exerciseService;

    @PostMapping
    public ResponseEntity<Exercise> createExercice(@RequestBody ExerciceDTO exerciceDTO) {
        Exercise createdExercise = exerciseService.createExercice(exerciceDTO);
        return new ResponseEntity<>(createdExercise, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ExerciceDTO>> getAllExercices() {
        List<ExerciceDTO> exercices = exerciseService.getAllExercices();
        return new ResponseEntity<>(exercices, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExerciceDTO> getExerciceById(@PathVariable("id") Long id) {
        ExerciceDTO exercice = exerciseService.getExerciceById(id);
        return new ResponseEntity<>(exercice, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExercice(@PathVariable("id") Long id) {
        exerciseService.deleteExercice(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ExerciceDTO>> searchUsers(@RequestParam String query) {
        List<ExerciceDTO> exercices = exerciseService.searchExercices(query);
        return ResponseEntity.ok(exercices);
    }
}
