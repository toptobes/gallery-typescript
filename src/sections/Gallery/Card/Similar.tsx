import s from './Similar.module.scss';
import { AppInfo } from '~/lib/api/apps.ts';
import { UseFilter } from '~/lib/filter.ts';

type Props = Pick<UseFilter & AppInfo, 'filterDispatch' | 'id' | 'title'>

export const Similar = ({ filterDispatch, id, title }: Props) => {
  const onClick = () => {
    filterDispatch({ type: 'set-similar', key: id, title });
  }

  return <button
    className={s.similar}
    onClick={onClick}
    title={`Find similar apps`}
    aria-label={`Find apps similar to '${title}'`}
  />;
}
