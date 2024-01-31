import s from './Search.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { UseFilter } from '~/lib/filter.ts';
import { prevDefault } from '~/lib/prelude.ts';

export const Search = ({ filter, filterDispatch }: UseFilter) => {
  const [input, setInput] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const onSubmit = prevDefault(() => {
    filterDispatch({ type: 'set-query', query: input })
  });

  useEffect(() => {
    if (filter.type === 'normal') {
      setInput(filter.query);
    } else {
      setInput('');
    }
    // @ts-expect-error (Need to include filter.query but ts complains that the key may not exist)
  }, [filter.type, filter.query]);

  return <search>
    <form className={s.form} onSubmit={onSubmit} autoComplete="off">
      <div className={s.searchContainer}>
        <i className={s.searchIcon}/>
        <input id={s.searchInput} type="text" placeholder="Search Sample Apps" onChange={onChange} value={input} autoComplete="one-time-code"/>
      </div>
      <button className={s.button}>Search</button>
    </form>
  </search>;
}
