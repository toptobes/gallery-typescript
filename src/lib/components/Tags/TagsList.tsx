import s from './TagsList.module.scss';
import { Tag } from '~/lib/components/Tags/Tag.tsx';
import clsx from 'clsx';
import { WithSelected } from '~/App.tsx';
import { Tags } from '~/lib/types.ts';

interface Props extends WithSelected {
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
