import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import makeRequest from "../api/api";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const options = {};
    makeRequest("/posts", options).then((res) => {
        setPosts(res.data.data.posts);
    });
  }, []);

  const onClickPost = (id) => {
    navigate(`/posts/${id}`);
    console.log(`Clicked on post with id: ${id}`);
  };

  return (
    <ListGroup as="ul">
      {posts == null ? (
        <ListGroup.Item as="li">No posts available</ListGroup.Item>
        ) : (
        posts.map((post) => (
          <ListGroup.Item
            as="li"
            key={post.id}
            onClick={() => onClickPost(post.id)}
          >
            {post.title}
          </ListGroup.Item>
        ))
      )}
    </ListGroup>
  );
};

export default Posts;
