import {gql} from "@apollo/client"

// Define your mutation
export const CREATE_TIP = gql`
  mutation CreateTip($recipient: String!, $amount: Float!) {
    createTip(recipient: $recipient, amount: $amount) {
      id
    }
  }
`;
