import gql from "graphql-tag";

export default gql`
  {
    deputies(limit: 9999) {
      name
      party
    }
  }
`;
