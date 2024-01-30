import s from './TagsList.module.scss';
import { Tag } from '~/lib/components/Tags/Tag.tsx';
import clsx from 'clsx';
import { WithFilter } from '~/App.tsx';
import { Tags } from '~/lib/api/tags.ts';

interface Props extends WithFilter {
  tags: Tags,
  listClass?: string,
  mainColor?: string,
  invertedColor?: string,
}

export const TagsList = ({ tags, listClass, ...props }: Props) =>
  <ul className={clsx(s.list, listClass)}>{
    tags.map((tag) =>
      <Tag name={tag} key={tag} {...props}/>)
  }</ul>
