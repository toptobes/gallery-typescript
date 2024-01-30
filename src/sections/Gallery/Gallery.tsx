import { Header } from '~/sections/Gallery/Header.tsx';
import { Card } from '~/sections/Gallery/Card/Card.tsx';
import s from './Gallery.module.scss';
import { Tags } from '~/lib/types.ts';
import { WithSelected } from '~/App.tsx';
import { OrderedSet } from 'immutable';
import { useQuery } from '@tanstack/react-query';

export interface CardInfo {
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
    title: dto.name,
    tags: OrderedSet(dto.tags),
    url: dto.urls.heroimage ?? 'src/assets/images/404.webp',
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

export const Gallery = (props: WithSelected) => {
  const query = useQuery({
    queryKey: ['apps', props.selected.sort().join(',')],
    queryFn: () => fetch('/.netlify/functions/getApps?tag=' + props.selected.join(','))
      .then(res => res.json())
      .then(processCards),
  });

  if (!query.data) {
    return <em>Loading...</em>;
  }

  return <section>
    <Header numApps={query.data.length} {...props}/>
    <div className={s.cards}>
      {query.data.map((card, i) =>
        <Card {...card} key={i} {...props}/>)}
    </div>
  </section>;
}
