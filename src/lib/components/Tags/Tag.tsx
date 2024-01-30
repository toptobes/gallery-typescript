import s from './Tag.module.scss';
import clsx from 'clsx';
import { CSSProperties } from 'react';
import { WithFilter } from '~/App.tsx';
import { OrderedSet } from 'immutable';

interface Props extends WithFilter {
  name: string,
  mainColor?: string,
  invertedColor?: string,
}

export const Tag = ({ filter, setFilter, name, mainColor, invertedColor }: Props) => {
  const onClick = () => setFilter((filter) =>
    filter.type === 'similar'
      ? { type: 'tags', tags: OrderedSet() } :
    filter.tags.has(name)
      ? { type: 'tags', tags: filter.tags.delete(name) }
      : { type: 'tags', tags: filter.tags.add(name) }
  );

  const isSelected = (filter.type === 'tags' && filter.tags.has(name));

  return <li style={{ '--main': mainColor, '--inverted': invertedColor } as CSSProperties}>
    <button className={clsx(s.tag, isSelected && s.selected)} onClick={onClick}>{name}</button>
  </li>;
}
