import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton.js";
import DeleteButton from "../components/DeleteButton.js";
import useToggle from "../util/toggle.js";

function SingleFlash(props) {
  const flashId = props.match.params.flashId;
  const { user } = useContext(AuthContext);

  const [hintOne, toggleOne] = useToggle();
  const [hintTwo, toggleTwo] = useToggle();
  const [hintThree, toggleThree] = useToggle();
  const [answerOn, toggleAnswer] = useToggle();

  const { data } = useQuery(FETCH_ONE_FLASH_QUERY, {
    variables: {
      flashId,
    },
  });

  function deleteFlashCallback() {
    props.history.push("/home");
  }

  let postMarkup;

  if (!data) {
    postMarkup = <p>Loading flashcard...</p>;
  } else {
    const {
      id,
      category,
      question,
      hint1,
      hint2,
      hint3,
      answer,
      createdAt,
      username,
      likes,
      likeCount,
    } = data.getFlash;

    postMarkup = (
      <Card fluid>
        <Card.Content>
          <Card.Header>{category}</Card.Header>
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-around",
            }}
          >
            <Card.Meta>createdBy: {username}</Card.Meta>
            <Card.Meta>{moment(createdAt).fromNow(true)} ago</Card.Meta>
          </div>
          <Card.Description>{question}</Card.Description>
          <hr></hr>
          <Button.Group vertical fluid>
            <Button onClick={toggleOne}>
              Hint #1 {hintOne ? ": '" + hint1 + "'" : ""}
            </Button>
            <Button onClick={toggleTwo}>
              Hint #2 {hintTwo ? ": '" + hint2 + "'" : ""}
            </Button>
            <Button onClick={toggleThree}>
              Hint #3 {hintThree ? ": '" + hint3 + "'" : ""}
            </Button>
            <Button onClick={toggleAnswer}>
              Answer {answerOn ? ": '" + answer + "'" : ""}
            </Button>
          </Button.Group>
        </Card.Content>
        <Card.Content extra>
          <div>
            <LikeButton user={user} flash={{ id, likes, likeCount }} />
            {user && user.username === username && (
              <DeleteButton flashId={id} callback={deleteFlashCallback} />
            )}
          </div>
        </Card.Content>
      </Card>
    );
  }
  return postMarkup;
}

const FETCH_ONE_FLASH_QUERY = gql`
  query ($flashId: ID!) {
    getFlash(flashId: $flashId) {
      id
      category
      question
      hint1
      hint2
      hint3
      answer
      createdAt
      username
      likeCount
      likes {
        username
        createdAt
      }
    }
  }
`;

export default SingleFlash;
