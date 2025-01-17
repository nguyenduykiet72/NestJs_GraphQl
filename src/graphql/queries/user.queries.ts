export const GET_USERS = `query GetUsers {
    User {
        id
        name
        email
        createdAt
        updatedAt
    }
}`;

export const GET_USER_BY_ID = `
  query GetUserById($id: Int!) {
    User_by_pk(id: $id) {
        id
        name
        email
        createdAt
        updatedAt
    }
  }
`;

export const GET_USER_BY_EMAIL = `
  query GetUserByEmail($email: String!) {
    users(where: {email: {_eq: $email}}) {
        id
        name
        email
        password
    }
  }
`;
