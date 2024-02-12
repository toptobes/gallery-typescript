import { List, OrderedSet } from 'immutable';
import { Tags } from '~/lib/api/tags.ts';
import { Filter } from '~/lib/filter.ts';
import { Map } from 'immutable';

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
  links: AppLinks,
  yt?: {
    views: string | number,
    likes: string | number,
  },
  gh?: {
    stars: string | number,
    forks: string | number,
  },
  searchField?: SearchField,
  lastModified: Date,
}

type AppLinkKey = 'gitpod' | 'youtube' | 'github' | 'demo';
export type AppLinks = Map<AppLinkKey, string>

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
  urls: Partial<Record<AppLinkKey | 'heroimage', string>>,
  last_modified: string,
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
    links: Map(dto.urls).delete('heroimage') as AppLinks,
    lastModified: new Date(dto.last_modified),
  }));

export const fetchCards = (filter: Filter) =>
  fetch(mkUrl(filter))
    .then(res => res.json())
    .then(processCards)
    .then(List);

const mkUrl = (filter: Filter) => (filter.type === 'normal')
  ? '/.netlify/functions/getApps?tag=' + filter.tags.join(',')
  : '/.netlify/functions/searchApps?similar=' + filter.key;
