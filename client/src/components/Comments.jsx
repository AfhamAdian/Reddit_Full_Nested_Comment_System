import React, { useState, useEffect } from "react";
import makeRequest from "../api/api";

const Comments = (props) => {
  const comment_id = props.id;
  const level = props.level || 0; // Default level is 0 if not provided
  const [childComments, setChildComments] = useState([]);
  const [baseComment, setBaseComment] = useState({});

  useEffect(() => {
    const options = {};
    makeRequest(`/comments?parent_comment_id=${comment_id}`, options)
      .then((res) => {
        console.log(res.data.data.baseComment);
        console.log(res.data.data.comments);

        setChildComments(res.data.data.comments);
        setBaseComment(res.data.data.baseComment);
      })
      .catch((error) => {
        console.error("Error fetching comment details:", error);
      });
  }, [comment_id]);

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      {" "}
      {/* Adjust the multiplier as needed */}
      <div>{baseComment != null ? <>{baseComment.content}</> : <></>}</div>
      <div>
        {childComments.length === 0 ? (
          <></>
        ) : (
          childComments.map((comment) => (
            <Comments key={comment.id} id={comment.id} level={level + 1} />
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
