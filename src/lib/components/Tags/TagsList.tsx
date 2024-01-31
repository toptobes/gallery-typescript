import s from './TagsList.module.scss';
import { Tag } from '~/lib/components/Tags/Tag.tsx';
import clsx from 'clsx';
import { Tags } from '~/lib/api/tags.ts';
import { UseFilter } from '~/lib/filter.ts';

interface Props extends UseFilter {
  tags: Tags,
  listClass?: string,
  mainColor?: string,
  invertedColor?: string,
  label: string,
}

export const TagsList = ({ tags, listClass, label, ...props }: Props) =>
  <ul className={clsx(s.list, listClass)} aria-label={label}>{
    tags.map((tag) =>
      <Tag name={tag} key={tag} {...props}/>)
  }</ul>
