export const CREATE_USER = `
    mutation CreateUser($name: String!, $email: String!) {
        insert_users_one(object: {
        name: $name,
        email: $email
        }) {
            id
            name
            email
            created_at
            updated_at
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
  mutation CreateUserWithPosts($name: String!, $email: String!, $posts: [posts_insert_input!]!) {
    insert_users_one(object: {
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

export const REGISTER_USER = `
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    insert_users_one(object: {
      name: $name,
      email: $email,
      password: $password
    }) {
      id
      name
      email
    }
  }
`;

export const CREATE_POST = `
  mutation CreatePost($title: String!, $content: String, $published: Boolean!, $author_id: Int!) {
    insert_posts_one(object: {
      title: $title,
      content: $content,
      published: $published,
      author_id: $author_id
    }) {
      id
      title
      content
      published
      author_id
      created_at
      updated_at
    }
  }
`;

export const UPDATE_POST = `
  mutation UpdatePost($id: Int!, $data: posts_set_input!) {
    update_posts_by_pk(pk_columns: {id: $id}, _set: $data) {
      id
      title
      content
      published
      author_id
      created_at
      updated_at
    }
  }
`;
