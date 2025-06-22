import { CatGrid } from '../components/Cats/CatGrid';
import { Alert, Center, Loader, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useInfiniteCats } from '../hooks/useInfiniteCatsQuery';
import { useLikedCats } from '../hooks/useLikedCatsQuery';
import { useLikeMutation } from '../hooks/useLikeMutation';
import { InfiniteData } from '@tanstack/react-query';
import { Cat } from '../types';
import InfiniteScroll from 'react-infinite-scroll-component';

export function AllCatsPage() {
  const { data, isLoading: isCatsLoading, error: catsError, fetchNextPage, hasNextPage } = useInfiniteCats();
  const { data: liked = [], isLoading: isLikesLoading, error: likesError } = useLikedCats();
  const { mutateAsync: toggleLike } = useLikeMutation();

  const cats = (data as InfiniteData<Cat[]> | undefined)?.pages.flat() ?? [];

  const isLoading = isCatsLoading || isLikesLoading;

  const likedCatIds = new Set<string>(liked?.map((like) => like.cat_id));

  const handleLikeToggle = async (catId: string) => {
    const isLiked = likedCatIds.has(catId);
    try {
      await toggleLike({ catId, isLiked });
    } catch (err) {
      console.error('Не удалось переключить лайк:', err);
    }
  };

  if (catsError || likesError) {
    return (
      <Alert icon={<IconAlertCircle size="1rem" />} title="Ошибка!" color="red">
        Что-то пошло не так. Пожалуйста, попробуйте позже.
      </Alert>
    );
  }

  return (
    <InfiniteScroll
      dataLength={cats.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={
        <Center p="md" h={80}>
          <Loader/>
        </Center>
      }
      endMessage={
        <Center p="md">
          <Text c="dimmed" fw={500}>
            Ура! Вы посмотрели всех котиков
          </Text>
        </Center>
      }
    >
      <CatGrid
        cats={cats}
        likedCatIds={likedCatIds}
        onLikeToggle={handleLikeToggle}
        isLoading={isLoading}
      />
    </InfiniteScroll>
  );
}
