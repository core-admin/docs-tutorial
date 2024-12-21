import { useCallback, useEffect, useRef } from 'react';

/**
 * @function useDebounce
 * @description 创建一个防抖函数，在指定延迟时间内多次调用只执行最后一次
 * @param {T} callback - 需要防抖的回调函数
 * @param {number} delay - 防抖延迟时间（毫秒）
 * @returns {(...args: Parameters<T>) => void} 防抖处理后的函数
 * @example
 * ```tsx
 * const debouncedFn = useDebounce((value: string) => {
 *   console.log(value);
 * }, 500);
 * ```
 */
export function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number = 500) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}
