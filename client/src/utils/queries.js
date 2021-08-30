import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query getSingleUser {
    users {
      _id
      username
      email
      bookCount
      books{
        bookID
        authors
        description
        title
        image
        link
      }
    }
  }
`;
