import { Dispatch, SetStateAction } from 'react';

export type Consumer<T> = (t: T) => void;

export type UseStateProps<T, Name extends string> = {
  [K in Name | `set${Capitalize<Name>}`]: K extends Name ? T : Dispatch<SetStateAction<T>>;
}

export const id = <T>(t: T): T => t;

export const not = (b: boolean) => !b;

export const prevDefault = <E extends { preventDefault: () => void }>(fn: (e: E) => void) => (e: E) => {
  e.preventDefault();
  fn(e);
}
