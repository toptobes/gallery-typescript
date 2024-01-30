import { Dispatch, SetStateAction } from 'react';

export type Consumer<T> = (t: T) => void;

export type UseStateProps<T, Name extends string> = {
  [K in Name | `set${Capitalize<Name>}`]: K extends Name ? T : Dispatch<SetStateAction<T>>;
}
