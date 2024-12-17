import { useRef } from 'react';
import { useQuery } from 'convex/react';

type Query = typeof useQuery;

/**
 * https://stack.convex.dev/help-my-app-is-overreacting#impacting-how-the-querys-reacting
 *
 * useQuery 在初始执行时返回的值是 undefined
 */
export const useStableQuery: Query = (query, ...args) => {
  const result = useQuery(query, ...args);
  const stored = useRef(result);

  /**
   * 第一次渲染后，stored.current 只有在我更改它时才会发生变化
   * 如果结果未定义，说明正在加载新数据，我们什么都不应该做
   */
  if (result !== undefined) {
    // 如果有新加载的结果，则使用 ref 进行存储
    stored.current = result;
  }

  // 首次加载时未定义，重新加载时数据为旧的数据，加载后数据为新数据
  return stored.current;
};

/**
 * useQuery 目前存在的问题是：
 *
 * - 自动订阅数据，当数据发生更新时，useQuery将自动重新执行
 * - 当数据更新 > useQuery 重新执行 > 组件重新渲染 > useQuery 返回 undefined > 组件重新渲染
 *    查询到最新数据后，useQuery 返回最新数据，组件重新渲染
 *
 * 会出现 loading 屏闪的问题
 *
 */
