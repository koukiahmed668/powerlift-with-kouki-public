package com.powerliftwithkouki.powerlift.ServiceIMPL;

import com.powerliftwithkouki.powerlift.DTO.PostDTO;
import com.powerliftwithkouki.powerlift.Entity.Post;
import com.powerliftwithkouki.powerlift.Entity.User;
import com.powerliftwithkouki.powerlift.Repository.PostRepository;
import com.powerliftwithkouki.powerlift.Service.PostService;
import com.powerliftwithkouki.powerlift.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceIMPL implements PostService {

        @Autowired
        private PostRepository postRepository;

        @Autowired
        private UserService userService;


        @Override
        public PostDTO createPost(PostDTO postDTO, Long userId) {
            Post post = new Post();
            post.setTitle(postDTO.getTitle());
            post.setBody(postDTO.getBody());
            post.setTimestamp(LocalDateTime.now()); // Set current timestamp
            User user = userService.getUserById(userId); // Fetch the user by ID
            post.setUser(user);

            Post savedPost = postRepository.save(post);

            PostDTO savedPostDTO = new PostDTO();
            savedPostDTO.setId(savedPost.getId());
            savedPostDTO.setTitle(savedPost.getTitle());
            savedPostDTO.setBody(savedPost.getBody());
            savedPostDTO.setTimestamp(savedPost.getTimestamp());
            savedPostDTO.setUserFirstName(savedPost.getUser().getFirstname());
            savedPostDTO.setUserLastName(savedPost.getUser().getLastname());

            return savedPostDTO;
        }

    @Override
    public List<PostDTO> getAllPosts() {
        return postRepository.findAll().stream().map(post -> {
            PostDTO postDTO = new PostDTO();
            postDTO.setId(post.getId());
            postDTO.setTitle(post.getTitle());
            postDTO.setBody(post.getBody());
            postDTO.setTimestamp(post.getTimestamp());
            postDTO.setUserFirstName(post.getUser().getFirstname()); // Corrected method call
            postDTO.setUserLastName(post.getUser().getLastname()); // Corrected method call
            return postDTO;
        }).collect(Collectors.toList());
    }


    @Override
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }
}