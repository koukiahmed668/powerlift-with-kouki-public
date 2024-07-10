package com.powerliftwithkouki.powerlift.Controller;

import com.powerliftwithkouki.powerlift.DTO.PostDTO;
import com.powerliftwithkouki.powerlift.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/createpost")
    public ResponseEntity<PostDTO> createPost(@RequestBody PostDTO postDTO, @RequestParam Long userId) {
        PostDTO createdPost = postService.createPost(postDTO, userId);
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    @GetMapping("/getallposts")
    public List<PostDTO> getAllPosts() {
        return postService.getAllPosts();
    }

    @DeleteMapping("/deletepost/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}