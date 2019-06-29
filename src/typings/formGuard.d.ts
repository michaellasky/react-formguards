import {ReactElement} from 'react'

type StateValue = { [index: string]: boolean }

type State = {
  [index: string]: StateValue
}

type ValidatesWith = (args?: any) => boolean

type FormGuardProps = {
  watches: string[] | string,
  validatesWith: ValidatesWith
} & ReactElement

export declare function FormGuard (props: FormGuardProps): ReactElement