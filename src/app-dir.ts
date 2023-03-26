'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const usePagination = (perPage = 20) => {
  const searchParams = useSearchParams();

  const getQueryParam = (key: string) =>
    useMemo(() => searchParams.get(key) || null, [searchParams.get(key)]);

  const after = getQueryParam('after');
  const before = getQueryParam('before');

  const first = useMemo(() => (!!after || !before ? perPage : undefined), [after, before, perPage]);

  const last = useMemo(() => (!!before ? perPage : undefined), [before, perPage]);

  return {
    first,
    last,
    after,
    before,
  };
};
