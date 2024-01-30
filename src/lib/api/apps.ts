import { OrderedSet } from 'immutable';
import { Tags } from '~/lib/api/tags.ts';
import { Filter } from '~/App.tsx';

export interface CardInfo {
  id: string,
  title: string,
  tags: Tags,
  url: string,
  difficulty: string,
  time: string,
  yt?: {
    views: string | number,
    likes: string | number,
  },
  gh?: {
    stars: string | number,
    forks: string | number,
  }
}

interface CardInfoDTO {
  key: string,
  name: string,
  duration?: string,
  skilllevel?: string,
  stargazers_count?: number,
  forks_count?: number,
  tags: string[],
  views?: number,
  likes?: number,
  urls: {
    heroimage?: string,
  }
}

const processCards = (cards: CardInfoDTO[]): CardInfo[] =>
  cards.map((dto) => ({
    id: dto.key,
    title: dto.name,
    tags: OrderedSet(dto.tags),
    url: dto.urls.heroimage ?? '',
    time: dto.duration ?? 'Unknown',
    difficulty: dto.skilllevel ?? 'Unknown',
    yt: (dto.views !== undefined && dto.likes !== undefined) ? {
      views: dto.views,
      likes: dto.likes,
    } : undefined,
    gh: (dto.stargazers_count !== undefined && dto.forks_count !== undefined) ? {
      stars: dto.stargazers_count,
      forks: dto.forks_count,
    } : undefined,
  }));

// export const fetchCards = (tags: Tags) =>
//   fetch('/.netlify/functions/getApps?tag=' + tags.join(','))
//     .then(res => res.json())
//     .then(processCards);

export const fetchCards = (filter: Filter) =>
  fetch(mkUrl(filter))
    .then(res => res.json())
    .then(processCards);

const mkUrl = (filter: Filter) => (filter.type === 'tags')
  ? '/.netlify/functions/getApps?tag=' + filter.tags.join(',')
  : '/.netlify/functions/searchApps?similar=' + filter.key;
