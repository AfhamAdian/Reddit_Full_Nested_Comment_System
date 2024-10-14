import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import makeRequest from "../api/api";
import Card from "react-bootstrap/Card";
import Comments from "../components/Comments";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [comments1, setComments1] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const options = {};
    makeRequest(`/posts/${id}`, options)
      .then((res) => {
        setPost(res.data.data.post);
        setComments1(res.data.data.comments);

        console.log(res.data.data.post);
        console.log(res.data.data.comments);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
        setPost(null);
      });
  }, [id]);

  return (
    <div>
      {post != null ? (
        <>
          <div className="post-div">
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="comment-div">
            {comments1.map((comment) => (
                <Comments id={comment.id} />
            ))}
          </div>
        </>
      ) : (
        <div>Post not found</div>
      )}
    </div>
  );
};

export default PostDetails;
