import { Header } from '~/sections/Header';
import { Filter } from '~/sections/Filters';
import { Gallery } from '~/sections/Gallery';
import s from './App.module.scss';
import { useState } from 'react';
import { UseStateProps } from '~/lib/prelude.ts';
import { useQuery } from '@tanstack/react-query';
import { OrderedSet } from 'immutable';
import { fetchCategories, Tags } from '~/lib/api/tags.ts';

export type WithFilter = UseStateProps<Filter, 'filter'>;

export type Filter =
  | { type: 'tags', tags: Tags }
  | { type: 'similar', key: string, title: string }

export const App = () => <>
  <Header/>
  <main className={s.main}>
    <Body/>
  </main>
</>

const Body = () => {
  const query = useQuery({
    queryKey: ['tags'],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });

  const [filter, setFilter] = useState<Filter>({ type: 'tags', tags: OrderedSet() });

  if (!query.data) {
    return <BodyLoading/>;
  }

  return <>
    <Filter categories={query.data} filter={filter} setFilter={setFilter}/>
    <div className={s.spacer}/>
    <Gallery filter={filter} setFilter={setFilter}/>
  </>
}

const BodyLoading = () =>
  <em>Loading...</em>;
