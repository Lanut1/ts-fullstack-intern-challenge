import { useQuery } from '@tanstack/react-query';
import { getLikedCats } from '../api/likes.api';
import { Like } from '../types';

export function useLikedCats() {
  return useQuery<Like[], Error>({
    queryKey: ['likedCats'],
    queryFn: getLikedCats,
    staleTime: 1 * 60 * 1000,
  });
}
