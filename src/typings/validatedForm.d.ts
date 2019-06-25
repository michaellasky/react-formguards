import {ReactElement} from 'react'

interface FormVals {
  [index: string]: any
}

type ResetForm = () => void

type OnSubmit = (
  e: React.FormEvent<HTMLFormElement>, 
  formVals: FormVals, 
  reset: ResetForm
) => void

type ValidatedFormProps = {
  children: [ReactElement],
  className?: string,
  id?: string,
  name: string,
  onSubmit: OnSubmit,
  formVals?: FormVals
} & ReactElement

export declare function ValidatedForm (props: ValidatedFormProps): ReactElement