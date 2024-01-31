import { Header } from '~/sections/Header';
import { TagFilters } from '~/sections/Filters';
import { Gallery } from '~/sections/Gallery';
import s from './App.module.scss';
import { useReducer } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '~/lib/api/tags.ts';
import { DEFAULT_FILTER, filterReducer, UseFilter } from '~/lib/filter.ts';

export const App = () => {
  const [filter, filterDispatch] = useReducer(filterReducer, DEFAULT_FILTER);

  return <>
    <Header filter={filter} filterDispatch={filterDispatch}/>
    <main className={s.main}>
      <Body filter={filter} filterDispatch={filterDispatch}/>
    </main>
  </>;
}

const Body = ({ filter, filterDispatch }: UseFilter) => {
  const tagsQuery = useQuery({
    queryKey: ['tags'],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });

  if (!tagsQuery.data) {
    return <BodyLoading/>;
  }

  return <>
    <TagFilters categories={tagsQuery.data} filter={filter} filterDispatch={filterDispatch}/>
    <div className={s.spacer}/>
    <Gallery filter={filter} filterDispatch={filterDispatch}/>
  </>
}

const BodyLoading = () =>
  <em>Loading...</em>;
