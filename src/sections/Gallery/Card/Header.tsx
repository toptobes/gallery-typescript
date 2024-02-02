import s from './Header.module.scss'
import { TagsList } from '~/lib/components/Tags';
import { UseFilter } from '~/lib/filter.ts';
import { AppInfo } from '~/lib/api/apps.ts';

interface Props extends UseFilter {
  inView: boolean,
  app: AppInfo,
}

export const Header = ({ app, inView, ...props }: Props) =>
  <header className={s.header}>
    <h1 className={s.h3}>{app.title}</h1>
    {app.desc && <p className={s.p}>{app.desc}</p>}
    {inView && <TagsList listClass={s.list} tags={app.tags} {...props} mainColor="white" invertedColor="rgb(32, 41, 58)" label="The list of tags for the current card"/>}
  </header>
