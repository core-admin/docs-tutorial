import { parseAsString, useQueryState } from 'nuqs';

export function useSearchParam() {
  return useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({
      // 当值为默认值时从 URL 中移除该参数
      clearOnDefault: true,
    }),
  );
}
