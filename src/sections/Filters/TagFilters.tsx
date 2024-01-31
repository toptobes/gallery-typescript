import { Selector } from '~/sections/Filters/Selector.tsx';
import { ClearFilters } from '~/sections/Filters/ClearFilters.tsx';
import { TagsList } from '~/lib/components/Tags';
import { useState } from 'react';
import s from './TagFilters.module.scss';
import { Categories } from '~/lib/api/tags.ts';
import { UseFilter } from '~/lib/filter.ts';

interface Props extends UseFilter {
  categories: Categories;
}

export const TagFilters = ({ categories, filter, filterDispatch }: Props) => {
  const [currCategory, setCurrCategory] = useState<string>(Object.keys(categories)[0]);

  return <search aria-label="Filter applications by the tag they contain (OR)">
    <h2 className={s.h2}>Filter results by tag</h2>
    <Selector categories={categories} filter={filter} currCategory={currCategory} setCurrCategory={setCurrCategory}/>
    {!currCategory
      ? <em className={s.em}>Select a filter...</em>
      : <>
        <TagsList tags={categories[currCategory]} filter={filter} filterDispatch={filterDispatch} mainColor="rgb(32, 41, 58)" invertedColor="white" label={`All tags in the category of ${currCategory}`}/>
        <ClearFilters filter={filter} filterDispatch={filterDispatch}/>
      </>}
  </search>;
}
