import s from './CategorySelector.module.scss';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { UseStateProps } from '~/lib/prelude.ts';
import { Categories } from '~/lib/types.ts';
import { OrderedSet } from 'immutable';

interface Props extends UseStateProps<string, 'currCategory'> {
  categories: Categories,
  selected: OrderedSet<string>,
}

export const CategorySelector = ({ categories, selected, currCategory, setCurrCategory }: Props) => {
  const borderRef = useRef<HTMLDivElement>(null!);
  const [selectedRef, setSelectedRef] = useState<HTMLElement>();

  const [selectedStyle, setSelectedStyle] = useState({ transform: `scaleX(0)`, left: 0 });
  const categoryNames = Object.keys(categories);

  const onClick = (category: string) => (e: { currentTarget: HTMLElement }) => {
    setCurrCategory(category);
    setSelectedRef(e.currentTarget);
  }

  useEffect(() => {
    // Temporary, I swear
    const actualSelectedRef = selectedRef ?? document.querySelector<HTMLElement>(`.${s.list} li button`)!;

    setSelectedStyle(calcUnderline(actualSelectedRef, borderRef.current));
  }, [selected, selectedRef]);

  return <div className={s.wrapper}>
    <header className={s.header}>
      <i className={s.icon}/>
      <ul className={s.list}>{
        categoryNames.map((category) => {
          const numSelected = categories[category].intersect(selected).size;

          return <li key={category} className={clsx(category === currCategory && s.selected)}>
            <button onClick={onClick(category)}>
              <span>{category}</span>
              {numSelected > 0 && <em>{numSelected}</em>}
            </button>
          </li>;
        })
      }</ul>
    </header>
    <div className={s.border} ref={borderRef}>
      <div className={s.borderSelected} style={selectedStyle}/>
    </div>
  </div>;
}

const calcUnderline = (selected: HTMLElement, border: HTMLElement) => {
  const borderStart = border.offsetLeft;
  const left = selected.offsetLeft;
  const width = selected.offsetWidth;
  return { transform: `scaleX(${width})`, left: left - borderStart };
}
