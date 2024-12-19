'use client';

import { usePosts } from '@/app/hooks/usePosts';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRelayPagination } from 'use-relay-pagination';

export function Posts() {
  const pagination = useRelayPagination(20);
  const router = useRouter();

  const searchParams = useSearchParams();
  const { data, isFetching } = usePosts({ pagination });

  const updateUrl = (cursor: string | null, direction: 'next' | 'prev') => {
    const params = new URLSearchParams(searchParams.toString());

    if (direction === 'next') {
      params.delete('before');
      cursor ? params.set('after', cursor) : params.delete('after');
    } else {
      params.delete('after');
      cursor ? params.set('before', cursor) : params.delete('before');
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data?.posts.edges?.map(({ node }) => (
            <tr key={node.id}>
              <td>{node.id}</td>
              <td>{node.title}</td>
              <td>{node.content}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          type="button"
          onClick={() => updateUrl(data?.posts?.pageInfo.startCursor, 'prev')}
          disabled={!data?.posts?.pageInfo?.hasPreviousPage || isFetching}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() => updateUrl(data?.posts?.pageInfo.endCursor, 'next')}
          disabled={!data?.posts?.pageInfo?.hasNextPage || isFetching}
        >
          Next
        </button>

        {isFetching && <span>Loading...</span>}
      </div>
    </div>
  );
}
