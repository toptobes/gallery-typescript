import s from './Similar.module.scss';
import { WithFilter } from '~/App.tsx';
import { CardInfo } from '~/lib/api/apps.ts';

type Props = Pick<WithFilter & CardInfo, 'setFilter' | 'id' | 'title'>

export const Similar = ({ setFilter, id, title }: Props) => {
  const onClick = () => {
    setFilter({ type: 'similar', key: id, title });
    console.log('key:', 'title:', title)
  }

  return <button className={s.similar} onClick={onClick}/>;
}
