import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookId: String!, $authors: [String]!, $description: String!, $title: String!, $image: String!, $link: String) {
    saveBook(bookId: $bookId, authors: $authors, description: $description, title: $title, image: $image, link: $link) {
      _id
      username
      email
      bookCount
      books {
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

export const LOGIN_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      books {
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
