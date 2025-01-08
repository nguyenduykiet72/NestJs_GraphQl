export const CREATE_USER = `
    mutation CreateUser($name: String!, $email: String!) {
        insert_User_one(object: {
        name: $name,
        email: $email
        }) {
            id
            name
            email
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_USER = `
    mutation UpdateUser($id: Int!, $data: User_set_input!) {
        update_User_by_pk(pk_columns: {id: $id}, _set: $data) {
            id
            name
            email
            createdAt
            updatedAt
        }
    }
`;

export const CREATE_USER_WITH_POSTS = `
  mutation CreateUserWithPosts($name: String!, $email: String!, $posts: [Post_insert_input!]!) {
    insert_User_one(object: {
      name: $name,
      email: $email,
      posts: {
        data: $posts
      }
    }) {
      id
      name
      email
      posts {
        id
        title
        content
      }
    }
  }
`;
