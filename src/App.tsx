import { Header } from '~/sections/Header';
import { Filter } from '~/sections/Filters';
import { Gallery } from '~/sections/Gallery';
import s from './App.module.scss';
import { useState } from 'react';
import { UseStateProps } from '~/lib/prelude.ts';
import { useQuery } from '@tanstack/react-query';
import { OrderedSet } from 'immutable';
import { CategoriesDTO } from '~/lib/dto-types.ts';
import { Categories } from '~/lib/types.ts';

export type WithSelected = UseStateProps<OrderedSet<string>, 'selected'>;

export const App = () => <>
  <Header/>
  <main className={s.main}>
    <Body/>
  </main>
</>

const processCategories = (categories: CategoriesDTO): Categories =>
  categories.reduce((acc, { _id, tags }) => ({ ...acc, [_id]: OrderedSet(tags) }), {});

const Body = () => {
  const query = useQuery({
    queryKey: ['tags'],
    queryFn: () => fetch('/.netlify/functions/getTags')
      .then(res => res.json())
      .then(processCategories),
    staleTime: Infinity
  });

  const [selected, setSelected] = useState(OrderedSet<string>());

  if (!query.data) {
    return <BodyLoading/>;
  }

  return <>
    <Filter categories={query.data} selected={selected} setSelected={setSelected}/>
    <div className={s.spacer}/>
    <Gallery selected={selected} setSelected={setSelected}/>
  </>
}

const BodyLoading = () =>
  <em>Loading...</em>;
