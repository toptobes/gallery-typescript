import { List, OrderedSet } from 'immutable';
import { Tags } from '~/lib/api/tags.ts';
import { Filter } from '~/lib/filter.ts';

export type SearchField = 'Title' | 'Description' | 'Readme';

export interface AppInfo {
  id: string,
  title: string,
  desc?: string,
  readme: string,
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
  },
  searchField?: SearchField,
}

interface AppInfoDTO {
  key: string,
  name: string,
  duration?: string,
  description: string,
  readme: string,
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

const processCards = (apps: AppInfoDTO[]): AppInfo[] =>
  apps.map((dto) => ({
    id: dto.key,
    title: dto.name,
    tags: OrderedSet(dto.tags),
    desc: dto.description,
    readme: dto.readme,
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

export const fetchCards = (filter: Filter) =>
  fetch(mkUrl(filter))
    .then(res => res.json())
    .then(processCards)
    .then(List);

const mkUrl = (filter: Filter) => (filter.type === 'normal')
  ? '/.netlify/functions/getApps?tag=' + filter.tags.join(',')
  : '/.netlify/functions/searchApps?similar=' + filter.key;
