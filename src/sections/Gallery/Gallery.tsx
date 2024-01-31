import { Header } from '~/sections/Gallery/Header.tsx';
import { Card } from '~/sections/Gallery/Card/Card.tsx';
import s from './Gallery.module.scss';
import { useQuery } from '@tanstack/react-query';
import { AppInfo, fetchCards } from '~/lib/api/apps.ts';
import { List } from 'immutable';
import { UseFilter } from '~/lib/filter.ts';

export const Gallery = ({ filter, ...props }: UseFilter) => {
  const querylessFilter = { ...filter, query: '' };

  const appsQuery = useQuery({
    queryKey: ['apps', querylessFilter],
    queryFn: () => fetchCards(querylessFilter),
    gcTime: 0,
  });

  if (!appsQuery.data) {
    return <em>Loading...</em>;
  }

  const searched = (filter.type === 'normal')
    ? search(filter.query, appsQuery.data)
    : appsQuery.data;

  return <section aria-label="All application results">
    <Header numApps={searched.size} filter={filter} {...props}/>
    <div className={s.cards}>
      {searched.map((card, i) =>
        <Card {...card} key={i} filter={filter} {...props}/>)}
    </div>
  </section>;
}

const searchFields = [['title', 'Title'], ['desc', 'Description'], ['readme', 'Readme']] as const;

const search = (query: string, apps: List<AppInfo>): List<AppInfo> => {
  if (!query) {
    return apps.map(app => ({ ...app, searchField: undefined }));
  }

  const lowerCaseQuery = query.toLowerCase();

  const filtered = apps.reduce((acc, app) => {
    for (const [field, tag] of searchFields) {
      if (app[field]?.toLowerCase().includes(lowerCaseQuery)) {
        return acc.push({ ...app, searchField: tag });
      }
    }
    return acc;
  }, List<AppInfo>());

  return filtered.sortBy(a => fieldVals[a.searchField!], (a, b) => b - a);
};

const fieldVals = {
  Title: 3,
  Description: 2,
  Readme: 1,
};
