
import { getServerSideClient } from "@/lib/apollo-ssclient";
import { gql } from "@apollo/client";

export const followUser = async (userId: string, followerId: string, token: string) => {
  const client = getServerSideClient(token);
  const { data } = await client.getClient().mutate({
    mutation: gql`
      mutation FollowUser($userId: String!, $followerId: String!) {
        followUser(userId: $userId, followerId: $followerId) {
          followings {
            _id
          }
          followers {
            _id
          }
        }
      }
    `,
    variables: {
      userId,
      followerId
    },
  });
  return data;
}

export const unfollowUser = async (userId: string, followerId: string, token: string) => {
  const client = getServerSideClient(token);
  const { data } = await client.getClient().mutate({
    mutation: gql`
      mutation UnfollowUser($userId: String!, $followerId: String!) {
        unfollowUser(userId: $userId, followerId: $followerId) {
          followings {
            _id
          }
          followers {
            _id
          }
        }
      }
    `,
    variables: {
      userId,
      followerId
    },
  });
  return data;
}

export const postTweet = async (text: string, media: string[], author: string, token: string) => {
  const client = getServerSideClient(token);
  const { data } = await client.getClient().mutate({
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