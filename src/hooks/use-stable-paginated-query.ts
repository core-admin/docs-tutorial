import { useRef } from 'react';
import { usePaginatedQuery } from 'convex/react';

type Query = typeof usePaginatedQuery;

export const useStablePaginatedQuery: Query = (query, ...args) => {
  const result = usePaginatedQuery(query, ...args);
  result.status;
  const stored = useRef(result);

  /**
   * 如果新数据仍在加载中，请等待，不要做任何事情
   * 如果数据已加载完毕，则使用 ref 进行存储
   */
  if (result.status !== 'LoadingMore') {
    stored.current = result;
  }

  return stored.current;
};
