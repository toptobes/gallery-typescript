import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { id } from '~/lib/prelude.ts';

export interface WithModalRef {
  modalRef: RefObject<HTMLDialogElement>,
}

export interface ModalState<A, S = A> {
  showModal: (args: A) => void,
  modalProps: ModalProps<S>,
  isModalOpen: boolean,
}

export interface ModalProps<S = void> extends WithModalRef {
  hideModal: () => void,
  modalState?: S,
}

interface _UseModalArgs<A, S> {
  contramap: (args: A) => S,
  noBodyScroll?: boolean,
}

export type UseModalArgs<A, S> =
  A extends S
      ? Partial<_UseModalArgs<A, S>>
    : _UseModalArgs<A, S>;

interface StateWrapper<S> {
  state: S,
}

export const useModalState = <A = void, S = A>(props: UseModalArgs<A, S>): ModalState<A, S> => {
  const [state, setState] = useState<StateWrapper<S> | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const showModal = useCallback((newState: A) => {
    setState({ state: (props.contramap || id)(newState) });
    modalRef.current?.showModal();

    if (props.noBodyScroll) {
      document.body.style.overflowY = 'hidden';
    }
  }, [setState, modalRef, props]);

  const hideModal = useCallback(() => {
    setState(null);
    modalRef.current?.close();

    if (props.noBodyScroll) {
      document.body.style.overflowY = 'auto';
    }
  }, [setState, modalRef, props]);

  useEffect(() => {
    const dialog = modalRef.current;

    dialog && dialog.addEventListener('close', hideModal);

    return () => {
      dialog && dialog.removeEventListener('close', hideModal);
    }
  }, [modalRef, hideModal]);

  const modalProps = { modalRef, modalState: state?.state, hideModal };

  return { showModal, isModalOpen: state !== null, modalProps };
}
