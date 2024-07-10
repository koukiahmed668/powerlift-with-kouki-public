package com.powerliftwithkouki.powerlift.ServiceIMPL;

import com.powerliftwithkouki.powerlift.DTO.UserDTO;
import com.powerliftwithkouki.powerlift.Entity.User;
import com.powerliftwithkouki.powerlift.Repository.UserRepository;
import com.powerliftwithkouki.powerlift.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDTO saveUser(UserDTO userDTO) {
        // Convert UserDTO to User entity
        User user = new User();
        user.setFirstname(userDTO.getFirstname());
        user.setLastname(userDTO.getLastname());
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        Set<String> roles = new HashSet<>();
        roles.add("USER");
        user.setRoles(roles);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Hash the password

        // Save the User entity to the database
        User savedUser = userRepository.save(user);

        // Convert the saved User entity back to UserDTO
        UserDTO savedUserDTO = new UserDTO();
        savedUserDTO.setId(savedUser.getId());
        savedUserDTO.setFirstname(savedUser.getFirstname());
        savedUserDTO.setLastname(savedUser.getLastname());
        savedUserDTO.setUsername(savedUser.getUsername());
        savedUserDTO.setEmail(savedUser.getEmail());
        savedUserDTO.setPassword(savedUser.getPassword());

        return savedUserDTO;
    }

    @Override
    public boolean authenticateUser(String username, String password) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Use the password encoder to check if the provided password matches the stored hashed password
            return passwordEncoder.matches(password, user.getPassword());
        }
        return false; // User not found
    }

    @Override
    public UserDTO findByUsername(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setFirstname(user.getFirstname());
            userDTO.setLastname(user.getLastname());
            userDTO.setUsername(user.getUsername());
            userDTO.setEmail(user.getEmail());
            // Do not set the password in the DTO
            return userDTO;
        }
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.get().getUsername(), user.get().getPassword(), new ArrayList<>());
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public Long getUserIdByUsername(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            return userOptional.get().getId();
        }
        return null;
    }



}
