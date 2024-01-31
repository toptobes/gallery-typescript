import s from './Header.module.scss'
import { TagsList } from '~/lib/components/Tags';
import { Tags } from '~/lib/api/tags.ts';
import { UseFilter } from '~/lib/filter.ts';

interface Props extends UseFilter {
  title: string,
  tags: Tags,
}

export const Header = ({ title, ...props }: Props) =>
  <header className={s.header}>
    <h1 className={s.h3}>{title}</h1>
    <TagsList listClass={s.list} {...props} mainColor="white" invertedColor="rgb(32, 41, 58)" label="The list of tags for the current card"/>
  </header>
