import s from './Selector.module.scss';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { UseStateProps } from '~/lib/prelude.ts';
import { Categories } from '~/lib/api/tags.ts';
import { Bubble } from '~/lib/components/Bubble';
import { UseFilter } from '~/lib/filter.ts';

interface Props extends UseStateProps<string, 'currCategory'>, Pick<UseFilter, 'filter'> {
  categories: Categories,
}

export const Selector = ({ categories, filter, currCategory, setCurrCategory }: Props) => {
  const borderRef = useRef<HTMLDivElement>(null!);
  const [selectedRef, setSelectedRef] = useState<HTMLElement>();

  const [selectedStyle, setSelectedStyle] = useState({ transform: 'scaleX(0)', left: 0 });
  const categoryNames = Object.keys(categories);

  const onClick = (category: string) => (e: { currentTarget: HTMLElement }) => {
    setSelectedRef(e.currentTarget);
    setCurrCategory(category);
  }

  useEffect(() => {
    // Temporary, I swear
    const actualSelectedRef = selectedRef ?? document.querySelector<HTMLElement>(`.${s.list} li button`)!;

    setSelectedStyle(calcUnderline(actualSelectedRef, borderRef.current));
  }, [filter, selectedRef]);

  return <div className={s.wrapper}>
    <header className={s.header} aria-label="The tag categories tab switcher">
      <i className={s.icon}/>
      <ul className={s.list} aria-label="The list of possible category tabs to choose">{
        categoryNames.map((category) => {
          const numSelected = (filter.type === 'normal' )
            ? categories[category].intersect(filter.tags).size
            : 0;

          return <li key={category} className={clsx(category === currCategory && s.selected)} aria-label={`The category ${category} which contains ${numSelected} currently selected tags`}>
            <button onClick={onClick(category)}>
              <span>{category}</span>
              {/*{numSelected > 0 && <em>{numSelected}</em>}*/}
              {numSelected > 0 && <Bubble number={numSelected} scale={.8}/>}
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

const calcUnderline = (selected: HTMLElement, border: HTMLElement) => ({
  transform: `scaleX(${selected.offsetWidth})`,
  left: selected.offsetLeft - border.offsetLeft,
});
