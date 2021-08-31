import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks{
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
