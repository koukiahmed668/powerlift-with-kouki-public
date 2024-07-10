package com.powerliftwithkouki.powerlift.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProgramDTO {

    private Long id;
    private List<WeekDTO> weeks;

}
