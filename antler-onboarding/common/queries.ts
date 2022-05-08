import { gql } from "@apollo/client";

export const QUERY_MAIN_USER_EMAIL = gql`
  query MyQuery($email: String!) {
    main_Users(where: { email: { _eq: $email } }) {
      id
      email
      linkedin_url
    }
  }
`;

export const MUTATION_MAIN_USERS = gql`
mutation MyMutation( $topics: [main_UserTopics_insert_input!] = [{user_id: "", topic_id: 10}], $expertise: String!, $linkedin: String!, $email: String) {
    insert_main_UserTopics(objects: $topics) {
      affected_rows
    }
    
    update_main_Users(
        _set: { expertise: $expertise, linkedin_url: $linkedin }
        where: { email: { _eq: $email } }
      ) {
        returning {
          startup_id
        }
      }
  }  
`;

export const QUERY_MAIN_TOPICS = gql`
  query MyQuery {
    main_Topics {
      id
      name
    }
  }
`;

export const MUTATION_INSERT_MAIN_STARTUPS = gql`
  mutation MyMutation(
    $id: uuid
    $name: String!
    $size: Int!
    $funding: float8!
  ) {
    insert_main_Startups(
      objects: { funding_raised: $funding, id: $id, name: $name, size: $size }
    ) {
      affected_rows
    }
  }
`;

export const MUTATION_UPDATE_STARTUP_ID = gql`
  mutation UpdateStartupId($startupid: uuid, $email: String!) {
    update_main_Users(
      _set: { startup_id: $startupid }
      where: { email: { _eq: $email } }
    ) {
      returning {
        startup_id
      }
    }
  }
`;

export const QUERY_STARTUP_ID = gql`
  query MyQuery1($name: String) {
    main_Startups(where: { name: { _eq: $name } }) {
      id
    }
  }
`;


export const QUERY_MAIN_STARTUPS_DATA = gql`
query MyQuery($userId:uuid) {
    main_Startups(where: {Users: {id: {_eq: $userId}}}) {
      name
      size
      funding_raised
      Users {
        name
        email
      }
    } 
}
`;
