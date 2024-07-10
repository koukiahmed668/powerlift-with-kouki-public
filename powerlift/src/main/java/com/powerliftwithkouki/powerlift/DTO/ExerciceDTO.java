package com.powerliftwithkouki.powerlift.DTO;

import com.powerliftwithkouki.powerlift.Entity.Difficulty;
import com.powerliftwithkouki.powerlift.Entity.Muscles;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExerciceDTO {
    private Long id;
    private String name;
    private String description;
    private Difficulty difficulty;
}
