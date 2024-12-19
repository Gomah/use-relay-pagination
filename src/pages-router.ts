import { useRouter } from 'next/router';
import type { RelayPagination } from './types';

/**
 * Hook for handling Relay-style cursor-based pagination for Next.js Pages Router
 * @param perPage Number of items per page (default: 20)
 * @returns Relay pagination parameters
 */
export const useRelayPagination = (perPage = 20): RelayPagination => {
  const router = useRouter();

  const getQueryParam = (key: string): string | null => (router.query[key] as string) || null;

  const after = getQueryParam('after');
  const before = getQueryParam('before');
  const first = after || !before ? perPage : undefined;
  const last = before ? perPage : undefined;

  return {
    first,
    last,
    after,
    before,
  };
};
