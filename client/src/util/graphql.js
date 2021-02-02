import gql from "graphql-tag";

export const FETCH_FLASH_QUERY = gql`
  {
    getFlashCards {
      id
      category
      question
      answer
      hint1
      hint2
      hint3
      createdAt
      username
      likeCount
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export const FETCH_CATAGORIES_QUERY = gql`
  query{
    getCardsByCategories {
      category
    }
  }
`;
