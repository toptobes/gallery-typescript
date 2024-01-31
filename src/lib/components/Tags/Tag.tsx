import s from './Tag.module.scss';
import clsx from 'clsx';
import { CSSProperties } from 'react';
import { UseFilter } from '~/lib/filter.ts';

interface Props extends UseFilter {
  name: string,
  mainColor?: string,
  invertedColor?: string,
}

export const Tag = ({ filter, filterDispatch, name, mainColor, invertedColor }: Props) => {
  const onClick = () => filterDispatch({ type: 'toggle-tag', tag: name });

  const isSelected = (filter.type === 'normal' && filter.tags.has(name));

  return <li style={{ '--main': mainColor, '--inverted': invertedColor } as CSSProperties}>
    <button
      className={clsx(s.tag, isSelected && s.selected)}
      onClick={onClick}
      aria-label={isSelected ? `Remove tag '${name}' from filter` : `Add tag '${name}' to filter`}
    >{name}</button>
  </li>;
}
