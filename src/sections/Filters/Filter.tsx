import { CategorySelector } from '~/sections/Filters/CategorySelector.tsx';
import { ClearFilters } from '~/sections/Filters/ClearFilters.tsx';
import { TagsList } from '~/lib/components/Tags';
import { useState } from 'react';
import { OrderedSet } from 'immutable';
import s from './Filter.module.scss';
import { UseStateProps } from '~/lib/prelude.ts';
import { Categories } from '~/lib/types.ts';

type Props = UseStateProps<OrderedSet<string>, 'selected'> & { categories: Categories };

export const Filter = ({ categories, selected, setSelected }: Props) => {
  const [currCategory, setCurrCategory] = useState<string>(Object.keys(categories)[0]);

  return <section>
    <CategorySelector categories={categories} selected={selected} currCategory={currCategory} setCurrCategory={setCurrCategory}/>
    {!currCategory
      ? <em className={s.em}>Select a filter...</em>
      : <>
        <TagsList tags={categories[currCategory]} selected={selected} setSelected={setSelected} mainColor="rgb(32, 41, 58)" invertedColor="white"/>
        {selected.size > 0 && <ClearFilters setSelected={setSelected}/>}
      </>}
  </section>;
}
