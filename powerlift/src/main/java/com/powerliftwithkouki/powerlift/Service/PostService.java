package com.powerliftwithkouki.powerlift.Service;

import com.powerliftwithkouki.powerlift.DTO.PostDTO;

import java.util.List;

public interface PostService {

    PostDTO createPost(PostDTO postDTO, Long userId);
    List<PostDTO> getAllPosts();
    void deletePost(Long postId); // Add this method

}
