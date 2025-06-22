import { useQuery } from '@tanstack/react-query';
import { getCatsByIds } from '../api/cats.api';
import { Cat } from '../types';

export function useCatsByIds(catIds: string[]) {
  return useQuery<Cat[], Error>({
    queryKey: ['catsByIds', catIds],
    queryFn: () => getCatsByIds(catIds),
    enabled: catIds.length > 0,
  });
}
