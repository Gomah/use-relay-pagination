'use client';

import { useSearchParams } from 'next/navigation';
import type { RelayPagination } from './types';

/**
 * Hook for handling Relay-style cursor-based pagination
 * @param perPage Number of items per page (default: 20)
 * @returns Relay pagination parameters
 */
export const useRelayPagination = (perPage = 20): RelayPagination => {
  const searchParams = useSearchParams();

  const after = searchParams.get('after');
  const before = searchParams.get('before');
  const first = !!after || !before ? perPage : undefined;
  const last = before ? perPage : undefined;

  return {
    first,
    last,
    after,
    before,
  };
};
