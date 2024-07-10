package com.powerliftwithkouki.powerlift.DTO;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostDTO {

    private Long id;
    private String title;
    private String body;
    private LocalDateTime timestamp;
    private String userFirstName;
    private String userLastName;

}
