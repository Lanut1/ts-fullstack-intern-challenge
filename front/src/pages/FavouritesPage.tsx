import { CatGrid } from '../components/Cats/CatGrid';
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useLikedCats } from '../hooks/useLikedCatsQuery';
import { useCatsByIds } from '../hooks/useCatsByIdsQuery';
import { useLikeMutation } from '../hooks/useLikeMutation';

export function FavoritesPage() {
  const { data: likes, isLoading: isLikesLoading, error: likesError } = useLikedCats();
   const { mutateAsync: toggleLike } = useLikeMutation();

  const likedCatIds = likes?.map((like) => like.cat_id) ?? [];

  const {
    data: cats,
    isLoading: isCatsLoading,
    error: catsError
  } = useCatsByIds(likedCatIds);

  const isLoading = isLikesLoading || isCatsLoading;
  const error = likesError || catsError;

  const handleUnlike = async (catId: string) => {
    try {
      await toggleLike({ catId, isLiked: true });
    } catch (err) {
      console.error('Failed to unlike cat:', err);
    }

  };
  
  if (error) {
    return (
      <Alert icon={<IconAlertCircle size="1rem" />} title="Ошибка!" color="red">
        Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.
      </Alert>
    );
  }

  return (
    <CatGrid
      cats={cats ?? []}
      likedCatIds={new Set(likedCatIds)}
      onLikeToggle={handleUnlike}
      isLoading={isLoading}
    />
  );
}
