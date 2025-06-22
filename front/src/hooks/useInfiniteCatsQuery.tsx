import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllCats } from '../api/cats.api';
import { Cat } from '../types';

export function useInfiniteCats() {
  return useInfiniteQuery<Cat[], Error, Cat[], ['cats'], number>({
    queryKey: ['cats'],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await getAllCats(pageParam);
      return data;
    },
    getNextPageParam: (_lastPage, allPages) => allPages.length,
    initialPageParam: 0,
    staleTime: 10 * 60 * 1000,
  });
}
