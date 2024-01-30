import { Header } from '~/sections/Gallery/Header.tsx';
import { Card } from '~/sections/Gallery/Card/Card.tsx';
import s from './Gallery.module.scss';
import { WithFilter } from '~/App.tsx';
import { useQuery } from '@tanstack/react-query';
import { fetchCards } from '~/lib/api/apps.ts';

export const Gallery = ({ filter, ...props }: WithFilter) => {
  const query = useQuery({
    queryKey: ['apps', filter],
    queryFn: () => fetchCards(filter),
    gcTime: 0,
  });

  if (!query.data) {
    return <em>Loading...</em>;
  }

  return <section>
    <Header numApps={query.data.length} filter={filter} {...props}/>
    <div className={s.cards}>
      {query.data.map((card, i) =>
        <Card {...card} key={i} filter={filter} {...props}/>)}
    </div>
  </section>;
}
