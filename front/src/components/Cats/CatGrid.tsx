import { SimpleGrid, Text } from '@mantine/core';
import { CatCard, CatCardSkeleton } from './CatCard';
import { Cat } from '../../types';

interface CatGridProps {
  cats: Cat[];
  likedCatIds: Set<string>;
  onLikeToggle: (catId: string) => void;
  isLoading: boolean;
}

export function CatGrid({ cats, likedCatIds, onLikeToggle, isLoading }: CatGridProps) {
  if (isLoading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        {Array.from({ length: 8 }).map((_, index) => <CatCardSkeleton key={index} />)}
      </SimpleGrid>
    );
  }

  if (cats.length === 0) {
    return <Text>У вас ещё нет любимых котиков. Пора найти первого!</Text>;
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
      {cats.map((cat) => (
        <CatCard
          key={cat.id}
          cat={cat}
          isLiked={likedCatIds.has(cat.id)}
          onLikeToggle={onLikeToggle}
        />
      ))}
    </SimpleGrid>
  );
}
