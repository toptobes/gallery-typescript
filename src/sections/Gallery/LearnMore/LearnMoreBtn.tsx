import s from './LearnMoreBtn.module.scss';
import { AppInfo } from '~/lib/api/apps.ts';
import { Consumer } from '~/lib/prelude.ts';

interface Props {
  showModal: Consumer<AppInfo>,
  app: AppInfo,
}

export const LearnMoreBtn = ({ showModal, app }: Props) => {
  return <button className={s.learnMore} onClick={() => showModal(app)}>Learn More</button>;
}
