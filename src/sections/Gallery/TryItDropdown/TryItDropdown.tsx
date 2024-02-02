import s from './TryItDropdown.module.scss';
import { AppLinks } from '~/lib/api/apps.ts';

interface Props {
  links: AppLinks
}

const labels = {
  youtube: 'Watch on YouTube',
  github: 'View in GitHub',
  demo: 'Try the demo',
  gitpod: 'Open in IDE',
} as const;

export const TryItDropdown = ({ links }: Props) =>
  <ul className={s.list}>{
    links.toArray().map(([name, url]) =>
      <li key={name} className={s.item}>
        <a href={url} target="_blank" rel="noopener norefferer noreferrer" className={s.link}>
          <i className={s[`${name}Icon`]}/>
          <span>{labels[name]}</span>
        </a>
      </li>)
  }</ul>
