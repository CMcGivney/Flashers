import React, { useContext } from "react";
import { Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import useToggle from "../util/toggle.js";

function FlashCard({
  flash: {
    category,
    question,
    answer,
    hint1,
    hint2,
    hint3,
    createdAt,
    id,
    username,
    likeCount,
    likes
  },
}, client) {
  const { user } = useContext(AuthContext);
  const [hintOne, toggleOne] = useToggle();
  const [hintTwo, toggleTwo] = useToggle();
  const [hintThree, toggleThree] = useToggle();
  const [answerOn, toggleAnswer] = useToggle();

  return (
    <Card>
      <Card.Content>
        <Card.Header as={Link} to={`/flashes/${id}`} textAlign="center" >{category}</Card.Header>
        <div style={{display:"flex", flexFlow:"row nowrap", justifyContent:"space-around"}}>
        <Card.Meta>createdBy: {username}</Card.Meta>
        <Card.Meta>
          {moment(createdAt).fromNow(true)} ago
        </Card.Meta>
        </div>
        <hr></hr>
        <Card.Description style={{height:"150px", display:"flex", justifyContent: "center"}} textAlign="center">{question} </Card.Description>
        <hr></hr>
        <Button.Group vertical fluid>
          <Button onClick={toggleOne}>
            Hint #1 {hintOne ? ": '" + hint1 + "'" : ""}
          </Button>
          <Button onClick={toggleTwo}>
            Hint #2 {hintTwo ? ": '" + hint2 + "'" : ""}
          </Button>
          <Button onClick={toggleThree}>
            Hint #3 {hintThree ? ": '" + hint3 + "'": ""}
          </Button>
          <Button onClick={toggleAnswer}>
            Answer {answerOn ? ": '" + answer + "'": ""}
          </Button>
        </Button.Group>
      </Card.Content>
      <Card.Content extra>
        <div>
          <LikeButton user={user} flash={{ id, likes, likeCount }} />
        </div>
        {user && user.username === username && <DeleteButton flashId={id} />}
      </Card.Content>
    </Card>
  );
}

export default FlashCard;
