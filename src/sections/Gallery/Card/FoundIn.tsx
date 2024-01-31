import s from './FoundIn.module.scss'
import { SearchField } from '~/lib/api/apps.ts';

export const FoundIn = ({ field }: { field?: SearchField }) => {
  if (!field) {
    return null;
  }

  const color = {
    'Title': '#5ac985',
    'Description': '#eeb54e',
    'Readme': '#de6c69',
  }[field]

  return <strong className={s.foundIn} style={{ background: color }}>Matched {field}</strong>;
}
