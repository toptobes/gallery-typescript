import { Header } from '~/sections/Header';
import s from './App.module.scss';
import { Suspense, useReducer } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '~/lib/api/tags.ts';
import { DEFAULT_FILTER, filterReducer, UseFilter } from '~/lib/filter.ts';
import lazyWithPreload from 'react-lazy-with-preload';

export const App = () => {
  const [filter, filterDispatch] = useReducer(filterReducer, DEFAULT_FILTER);

  return <>
    <Header filter={filter} filterDispatch={filterDispatch}/>
    <main className={s.main}>
      <Body filter={filter} filterDispatch={filterDispatch}/>
    </main>
  </>;
}

const TagFilters = lazyWithPreload(() => import('~/sections/Filters').then(m => ({ default: m.TagFilters })));
const Gallery = lazyWithPreload(() => import('~/sections/Gallery').then(m => ({ default: m.Gallery })));

const Body = ({ filter, filterDispatch }: UseFilter) => {
  preload();

  const tagsQuery = useQuery({
    queryKey: ['tags'],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });

  if (!tagsQuery.data) {
    return <BodyLoading/>;
  }

  return <Suspense fallback={<BodyLoading/>}>
    <TagFilters categories={tagsQuery.data} filter={filter} filterDispatch={filterDispatch}/>
    <div className={s.spacer}/>
    <Gallery filter={filter} filterDispatch={filterDispatch}/>
  </Suspense>
}

const BodyLoading = () =>
  <em>Loading...</em>;

const preload = () => {
  void TagFilters.preload();
  void Gallery.preload();
}
