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

export const getTweet = async (tweetId: string, token: string) => {
  const client = getClientSideClient(token);
  const { data } = await client.query({
    query: gql`
      query GetTweet($tweetId: ID!) {
        fetchTweet(id: $tweetId) {
          _id
          text
          media
        }
      }
    `,
    variables: {
      tweetId,
    },
  });
  return data.fetchTweet;
}

export const getLikes = async (
  tweetId: string,
  token: string
) => {
  const client = getClientSideClient(token);
  const { data } = await client.query({
    query: gql`
      query GetLikesCount($tweetId: ID!) {
        listLikes(id: $tweetId) {
          _id
        }
      }
    `,
    variables: {
      tweetId,
    },
  });
  return data.listLikes.map((l: any) => l._id);
}

export const getComments = async(
  tweetId: string,
  token: string
) => {
  const client = getClientSideClient(token);  
  const { data } = await client.query({
    query: gql`
      query GetComments($tweetId: ID!) {
        listComments(id: $tweetId) {
          _id
          text
          dateTime
          author {
            _id
          }
        }
      }
    `,
    variables: {
      tweetId,
    },
  });
  return data.listComments;
}

export const likeTweet = async (
  tweetId: string,
  userId: string,
  token: string
) => {
  const client = getClientSideClient(token);
  const { data } = await client.mutate({
    mutation: gql`
      mutation LikeTweet($tweetId: ID!, $userId: ID!) {
        likeTweet(tweetId: $tweetId, userId: $userId) {
          _id
          likes {
            _id
          }
        }
      }
    `,
    variables: {
      tweetId,
      userId,
    },
  });
  return data.likeTweet.likes.map((l: any) => l._id);
}

export const unlikeTweet = async(
  tweetId: string,
  userId: string,
  token: string
) => {
  const client = getClientSideClient(token);
  const { data } = await client.mutate({
    mutation: gql`
      mutation UnlikeTweet($tweetId: ID!, $userId: ID!) {
        unlikeTweet(tweetId: $tweetId, userId: $userId) {
          _id
          likes {
            _id
          }
        }
      }
    `,
    variables: {
      tweetId,
      userId,
    },
  });
  return data.unlikeTweet.likes.map((l: any) => l._id);
}

export const updateTweet = async(
  tweetId: string,
  text: string,
  media: string[],
  token: string
) => {
  const client = getClientSideClient(token);
  const { data } = await client.mutate({
    mutation: gql`
      mutation UpdateTweet($tweetId: ID!, $text: String!, $media: [String!]) {
        updateTweet(id: $tweetId, text: $text, media: $media) {
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
      tweetId,
      text,
      media,
    },
  });
  return data.updateTweet;
}