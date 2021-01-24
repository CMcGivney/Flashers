import React, {useContext} from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from 'moment'

import {AuthContext} from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'


function FlashCard({
  flash: { question, answer, hint1, hint2, hint3, createdAt, id, username, likeCount, likes },
}) {

const {user} = useContext(AuthContext)


  return (
    <Card>
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/flashes/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{question}</Card.Description>
        <hr></hr>
        <Card.Content>Answer: {answer}</Card.Content>
        <Card.Content>Hint #1: {hint1}</Card.Content>
        <Card.Content>Hint #2: {hint2}</Card.Content>
        <Card.Content>Hint #3: {hint3}</Card.Content>
      </Card.Content>
      <Card.Content extra>
        <div>
          <LikeButton user={user} post={{ id, likes, likeCount}}/>
        </div>
        {user && user.username === username && (
         <DeleteButton flashId={id} />
        )}
      </Card.Content>
    </Card>
  );
}

export default FlashCard;
