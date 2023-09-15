import { getClientSideClient } from "@/lib/apollo-csclient";
import { gql } from "@apollo/client";

export const postTweet = async (text: string, media: string[], author: string, token: string) => {
  const client = getClientSideClient(token);
  const { data } = await client.mutate({
    mutation: gql`
      mutation CreateTweet($text: String!, $media: [String!]!, $author: ID!) {
        createTweet(text: $text, media: $media, author: $author) {
          _id
          text
          media
          dateTime
          author {
            _id
          }
        }
      }
    `,
    variables: {
      text,
      media,
      author
    },
  });
  return data;
}