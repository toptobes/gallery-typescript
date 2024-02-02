import s from './LearnMoreModal.module.scss';
import { ModalProps } from '~/lib/hooks/useModal.ts';
import { AppInfo } from '~/lib/api/apps.ts';

export const LearnMoreModal = ({ modalRef, modalState: app,  hideModal }: ModalProps<AppInfo>) =>
  <dialog ref={modalRef} className={s.modal} aria-label={app && `Readme of the selected app (${app.title})`}>{
    app && <>
      <header className={s.header}>
        <h2 className={s.title}>readme.md</h2>
        <button className={s.close} onClick={hideModal}>✕</button>
      </header>
      <div className={s.content} dangerouslySetInnerHTML={{ __html: app.readme }}/>
    </>
  }</dialog>
