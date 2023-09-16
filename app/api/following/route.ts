import { getServerSideClient } from "@/lib/apollo-ssclient";
import { gql } from "@apollo/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const GET_FOLLOWINGS = gql`
query ListFollowings($userId: ID!) {
  listFollowings(id: $userId) {
    _id
  }
}
`;

export async function GET(req: NextRequest) {
  // const client = getServerSideClient(
  //   req.headers.get('authorization')!
  // );
  // const { data } = await client.getClient().query({
  //   query: GET_FOLLOWINGS,
  //   variables: {
  //     userId: req.nextUrl.searchParams.get("userId")
  //   },
  // });
  const res = axios({
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    url: 'http://localhost:4000/graphql',
    data: JSON.stringify({
      operationName: 'ListFollowings',
      query: GET_FOLLOWINGS,
      variables: {
        userId: req.nextUrl.searchParams.get("userId")
      }
    }),
  });
  return NextResponse.json({
    'kkhk': req.nextUrl,
  });
}