import s from './Header.module.scss'
import { TagsList } from '~/lib/components/Tags';
import { WithSelected } from '~/App.tsx';
import { Tags } from '~/lib/types.ts';

interface Props extends WithSelected {
  title: string,
  tags: Tags,
}

export const Header = ({ title, ...props }: Props) =>
  <header className={s.header}>
    <h1 className={s.h3}>{title}</h1>
    <TagsList {...props} mainColor="white" invertedColor="rgb(32, 41, 58)"/>
  </header>
