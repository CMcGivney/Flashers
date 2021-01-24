import React, {useContext} from "react";
import gql from "graphql-tag";
import {useQuery} from "@apollo/client"
import {Card, Image, Item} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import moment from 'moment'

import {AuthContext} from '../context/auth'
import LikeButton from '../components/LikeButton.js'
import DeleteButton from '../components/DeleteButton.js'


function SinglePost(props) {
  const postId = props.match.params.postId;
  const {user} = useContext(AuthContext);
     console.log(postId)

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });
  console.log(data)

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;

  if(!data){
    postMarkup = <p>Loading post...</p>
  } else {
    const { id, body, createdAt, username, comments, likes, likeCount, commentCount} = data.getPost;
     postMarkup = (
      <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="small"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <LikeButton user={user} post={{ id, likes, likeCount}}/>
          <Item className="ui labeled button" as={Link} to={`/posts/${id}`} onClick={() => console.log('comments on point')} >
            <button className="ui blue button" tabIndex="1" >
              <i aria-hidden="true" className="comments icon"></i> Comment
            </button>
            <div className="ui blue left pointing basic label">
              {commentCount}
            </div>
          </Item>
        {user && user.username === username && (
         <DeleteButton postId={id} callback={deletePostCallback}/>
        )}
        </div>
      </Card.Content>
      <hr/>
      <p>{comments}</p>
    </Card>
     )

  }
  return postMarkup
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
