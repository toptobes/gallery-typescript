import { Selector } from '~/sections/Filters/Selector.tsx';
import { ClearFilters } from '~/sections/Filters/ClearFilters.tsx';
import { TagsList } from '~/lib/components/Tags';
import { useState } from 'react';
import s from './Filter.module.scss';
import { Categories } from '~/lib/api/tags.ts';
import { WithFilter } from '~/App.tsx';

interface Props extends WithFilter {
  categories: Categories;
}

export const Filter = ({ categories, filter, setFilter }: Props) => {
  const [currCategory, setCurrCategory] = useState<string>(Object.keys(categories)[0]);

  return <search>
    <h2 className={s.h2}>Filter results</h2>
    <Selector categories={categories} filter={filter} currCategory={currCategory} setCurrCategory={setCurrCategory}/>
    {!currCategory
      ? <em className={s.em}>Select a filter...</em>
      : <>
        <TagsList tags={categories[currCategory]} filter={filter} setFilter={setFilter} mainColor="rgb(32, 41, 58)" invertedColor="white"/>
        <ClearFilters filter={filter} setFilter={setFilter}/>
      </>}
  </search>;
}
