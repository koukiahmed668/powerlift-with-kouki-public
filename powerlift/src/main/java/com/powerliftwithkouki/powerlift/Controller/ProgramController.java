package com.powerliftwithkouki.powerlift.Controller;

import com.powerliftwithkouki.powerlift.DTO.ProgramCreationRequestDTO;
import com.powerliftwithkouki.powerlift.DTO.ProgramDTO;
import com.powerliftwithkouki.powerlift.Entity.Program;
import com.powerliftwithkouki.powerlift.Service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programs")
public class ProgramController {

    @Autowired
    private ProgramService programService;

    @PostMapping("/create")
    public Program createProgram(@RequestBody ProgramCreationRequestDTO programRequestDTO) {
        return programService.createProgram(programRequestDTO);
    }

    @GetMapping("/getall")
    public List<ProgramDTO> getAllPrograms() {
        return programService.getAllPrograms();
    }

}
