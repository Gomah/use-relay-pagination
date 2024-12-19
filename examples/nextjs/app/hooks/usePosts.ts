'use client';

import { useQuery } from '@tanstack/react-query';
import request, { gql } from 'graphql-request';
import type { RelayPagination } from '../../../../dist/types';

export function usePosts({ pagination }: { pagination: RelayPagination }) {
  return useQuery({
    queryKey: ['posts', pagination],
    queryFn: async () => {
      const query = gql`
        query GetPosts($first: Int, $after: String, $last: Int, $before: String) {
          posts(after: $after, before: $before, first: $first, last: $last) {
            edges {
              cursor
              node {
                id
                title
                content
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
          }
        }
      `;

      const variables = {
        ...pagination,
      };

      const data = await request('http://localhost:3000/api/graphql', query, variables);
      return data;
    },
  });
}
