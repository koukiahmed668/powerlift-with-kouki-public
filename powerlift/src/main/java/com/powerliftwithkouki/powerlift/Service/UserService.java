package com.powerliftwithkouki.powerlift.Service;

import com.powerliftwithkouki.powerlift.DTO.UserDTO;
import com.powerliftwithkouki.powerlift.Entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService {

     UserDTO saveUser(UserDTO userDTO);
    boolean authenticateUser(String username, String password);

    UserDTO findByUsername(String username);

    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    User getUserById(Long userId);

    Long getUserIdByUsername(String username);
}
