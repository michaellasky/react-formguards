import {ReactElement} from 'react'

type StateValue = { [index: string]: boolean }

type State = {
  [index: string]: StateValue
}

type ValidatesWith = (args?: any) => boolean
type MergeState = (name: string, state: StateValue) => void

type FormGuardProps = {
  watches: string[] | string,
  state: State,
  mergeState: MergeState,
  validatesWith: ValidatesWith
} & ReactElement

export declare function FormGuard (props: FormGuardProps): ReactElement