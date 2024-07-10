package com.powerliftwithkouki.powerlift.ServiceIMPL;

import com.powerliftwithkouki.powerlift.DTO.*;
import com.powerliftwithkouki.powerlift.Entity.*;
import com.powerliftwithkouki.powerlift.Repository.ProgramRepository;
import com.powerliftwithkouki.powerlift.Service.ProgramService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProgramServiceIMPL implements ProgramService {

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private ModelMapper modelMapper;
    @Override
    public Program createProgram(ProgramCreationRequestDTO programRequest) {
        Program program = new Program();
        List<WeekDTO> weekDTOs = programRequest.getWeeks();

        for (WeekDTO weekDTO : weekDTOs) {
            Week week = new Week();
            week.setDurationInDays(weekDTO.getDurationInDays());
            week.setProgram(program);

            List<DayDTO> dayDTOs = weekDTO.getDays();
            for (DayDTO dayDTO : dayDTOs) {
                Day day = new Day();
                day.setWeek(week);

                List<ExerciseInstanceDTO> exerciseInstanceDTOs = dayDTO.getExerciseInstances();
                for (ExerciseInstanceDTO exerciseInstanceDTO : exerciseInstanceDTOs) {
                    ExerciseInstance exerciseInstance = new ExerciseInstance();
                    exerciseInstance.setDay(day);
                    exerciseInstance.setSets(exerciseInstanceDTO.getSets());
                    exerciseInstance.setReps(exerciseInstanceDTO.getReps());
                    exerciseInstance.setRestTimeInSeconds(exerciseInstanceDTO.getRestTimeInSeconds());

                    Exercise exercise = new Exercise();
                    exercise.setId(exerciseInstanceDTO.getExerciseId()); // Assuming you have a constructor to set the ID
                    exerciseInstance.setExercise(exercise);

                    day.getExerciseInstances().add(exerciseInstance);
                }

                week.getDays().add(day);
            }

            program.getWeeks().add(week);
        }

        return programRepository.save(program);
    }

    @Override
    public Program getProgramById(Long id) {
        return programRepository.findById(id).orElse(null);
    }

    @Override
    public List<ProgramDTO> getAllPrograms() {
        List<Program> programs = programRepository.findAll();
        return programs.stream()
                .map(this::convertToProgramDTO)
                .collect(Collectors.toList());
    }

    private ProgramDTO convertToProgramDTO(Program program) {
        return modelMapper.map(program, ProgramDTO.class);
    }
}
