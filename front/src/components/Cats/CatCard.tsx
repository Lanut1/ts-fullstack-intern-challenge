import { Card, Image, ActionIcon, Group, Skeleton } from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { Cat } from '../../types';

interface CatCardProps {
  cat: Cat;
  isLiked: boolean;
  onLikeToggle: (catId: string) => void;
}

export function CatCard({ cat, isLiked, onLikeToggle }: CatCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={cat.url}
          height={180}
          alt={`A cute cat`}
          fallbackSrc="https://placehold.co/600x400?text=Image+not+found"
        />
      </Card.Section>

      <Group justify="flex-end" mt="md">
        <ActionIcon variant="subtle" color="red" size="lg" onClick={() => onLikeToggle(cat.id)}>
          {isLiked ? <IconHeartFilled /> : <IconHeart />}
        </ActionIcon>
      </Group>
    </Card>
  );
}

export function CatCardSkeleton() {
  return <Skeleton height={227} radius="md" />;
}
