import s from './Tag.module.scss';
import clsx from 'clsx';
import { CSSProperties } from 'react';
import { UseFilter } from '~/lib/filter.ts';

interface Props extends UseFilter {
  name: string,
  invertColor?: boolean,
}

export const Tag = ({ filter, filterDispatch, name, invertColor }: Props) => {
  const onClick = () => filterDispatch({ type: 'toggle-tag', tag: name });

  const isSelected = (filter.type === 'normal' && filter.tags.has(name));

  const highlightColor = (name === 'deprecated')
    ? 'rgb(255,213,47)'
    : 'white';

  const mainColor = (invertColor)
    ? highlightColor
    : 'rgb(32, 41, 58)';

  const invertedColor = (invertColor)
    ? 'rgb(32, 41, 58)'
    : highlightColor;

  return <li style={{ '--main': mainColor, '--inverted': invertedColor } as CSSProperties}>
    <button
      className={clsx(s.tag, isSelected && s.selected)}
      onClick={onClick}
      aria-label={isSelected ? `Remove tag '${name}' from filter` : `Add tag '${name}' to filter`}
    >{name}</button>
  </li>;
}
