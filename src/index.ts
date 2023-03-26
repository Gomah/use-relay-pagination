import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const usePagination = (perPage = 20) => {
  const router = useRouter();

  const getQueryParam = (key: string) =>
    useMemo(() => router.query[key] || null, [router.query[key]]);

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
