import { type Dispatch, type SetStateAction, createContext, useContext } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Data = Record<string, any>

export interface WizardContextValue<TData> {
  data: TData | undefined
  setData: Dispatch<SetStateAction<TData | undefined>>
  currentStep: number
}

export const WizardContext = createContext<WizardContextValue<Data> | null>(null)

export function useWizardContext<TData>(): WizardContextValue<TData> {
  const context = useContext(WizardContext)

  if (!context) {
    throw new Error('useWizardContext must be used within a WizardContextProvider')
  }

  return context as WizardContextValue<TData>
}

export const WizardControlsContext = createContext<Dispatch<SetStateAction<number>> | null>(null)

export const useWizardControlsContext = () => {
  const context = useContext(WizardControlsContext)

  if (!context) {
    throw new Error('useWizardControlsContext must be used within a WizardContextProvider')
  }

  return context
}
