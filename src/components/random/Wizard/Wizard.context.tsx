import { type Dispatch, type SetStateAction, createContext, useContext } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

export interface WizardContextValue<T extends FieldValues> {
  form: UseFormReturn<T>
  currentStep: number
  finalStepNumber: number
}

// eslint-disable-next-line
export const WizardContext = createContext<WizardContextValue<any> | null>(null)

export function useWizardContext<T extends FieldValues>(): WizardContextValue<T> {
  const context = useContext(WizardContext)

  if (!context) {
    throw new Error('useWizardContext must be used within a WizardContextProvider')
  }

  return context as WizardContextValue<T>
}

export const WizardControlsContext = createContext<Dispatch<SetStateAction<number>> | null>(null)

export const useWizardControlsContext = () => {
  const context = useContext(WizardControlsContext)

  if (!context) {
    throw new Error('useWizardControlsContext must be used within a WizardContextProvider')
  }

  return context
}
