import {ReactElement} from 'react'

type StateValue = { [index: string]: boolean }

type State = {
  [index: string]: StateValue
}

type ValidatesWith = (args?: any) => boolean

type initialProps = {
  watches: string[] | string,
  validatesWith: ValidatesWith
} & ReactElement;

type managedProps = {
  dirty: boolean, 
  isvalid: boolean  
} & ReactElement

export declare function FormGuard (props: initialProps | managedProps): ReactElement