import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

function LikeButton({ user, flash: { id, likes, likeCount } }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likeFlash] = useMutation(LIKE_FLASH_MUTATION, {
    variables: { flashId: id },
  });

  const likeButton = user ? (
    liked ? (
      <button className="ui teal button" tabIndex="0">
        <i aria-hidden="true" className="heart outline icon"></i> Like
      </button>
    ) : (
      <button className="ui teal basic button" tabIndex="0">
        <i aria-hidden="true" className="heart icon"></i> Like
      </button>
    )
  ) : (
    <a href={`/login`} alt="link to login page">
      <button className="ui teal button" tabIndex="0">
        <i aria-hidden="true" className="heart icon"></i> Like
      </button>
    </a>
  );
  return (
    <div className="ui labeled button" onClick={likeFlash}>
      {likeButton}
      <div className="ui teal left pointing basic label">{likeCount}</div>
    </div>
  );
}

const LIKE_FLASH_MUTATION = gql`
  mutation likeFlash($flashId: ID!) {
    likeFlash(flashId: $flashId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
export default LikeButton;
