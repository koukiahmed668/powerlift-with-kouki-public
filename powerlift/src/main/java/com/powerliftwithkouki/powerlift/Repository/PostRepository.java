package com.powerliftwithkouki.powerlift.Repository;

import com.powerliftwithkouki.powerlift.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
