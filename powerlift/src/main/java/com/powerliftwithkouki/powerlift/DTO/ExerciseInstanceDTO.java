package com.powerliftwithkouki.powerlift.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseInstanceDTO {
    private Long exerciseId;
    private int sets;
    private int reps;
    private int restTimeInSeconds;

}
