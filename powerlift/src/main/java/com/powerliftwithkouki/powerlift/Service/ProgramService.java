package com.powerliftwithkouki.powerlift.Service;

import com.powerliftwithkouki.powerlift.DTO.ProgramCreationRequestDTO;
import com.powerliftwithkouki.powerlift.DTO.ProgramDTO;
import com.powerliftwithkouki.powerlift.Entity.Program;

import java.util.List;

public interface ProgramService {
    Program createProgram(ProgramCreationRequestDTO programRequest);
    Program getProgramById(Long id);
    List<ProgramDTO> getAllPrograms();
}

