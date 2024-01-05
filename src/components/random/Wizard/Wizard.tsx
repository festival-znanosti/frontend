import { createDescendantContext } from '@chakra-ui/descendant'
import { HTMLProps, type PropsWithChildren, forwardRef, useCallback, useMemo, useState } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

import { WizardContext, WizardControlsContext, useWizardContext, useWizardControlsContext } from './Wizard.context'

export interface WizardCustomProps<T extends FieldValues> {
  form: UseFormReturn<T>
  defaultIndex?: number
}

export type WizardProps<T extends FieldValues> = WizardCustomProps<T> & Omit<HTMLProps<HTMLDivElement>, 'form'>

export const [DescendantsProvider, , useDescendants, useDescendant] = createDescendantContext()

export const useWizardControls = () => {
  const setCurrentStep = useWizardControlsContext()

  return {
    goNext: useCallback(() => setCurrentStep((value) => value + 1), [setCurrentStep]),
    goPrevious: useCallback(() => setCurrentStep((value) => value - 1), [setCurrentStep]),
  }
}

// eslint-disable-next-line
export const Wizard = forwardRef<HTMLDivElement, PropsWithChildren<WizardProps<any>>>(
  ({ children, defaultIndex, form, ...rest }, ref) => {
    const descendants = useDescendants()
    const finalStepNumber = descendants.count() - 1

    const [currentStep, setCurrentStep] = useState(defaultIndex ?? 0)
    const context = { form, currentStep, finalStepNumber }

    return (
      <div ref={ref} {...rest}>
        <WizardContext.Provider value={context}>
          <WizardControlsContext.Provider value={setCurrentStep}>
            <DescendantsProvider value={descendants}>{children}</DescendantsProvider>
          </WizardControlsContext.Provider>
        </WizardContext.Provider>
      </div>
    )
  }
)

interface WizardStepProps extends HTMLProps<HTMLDivElement> {}

export const WizardStep = ({ children }: PropsWithChildren<WizardStepProps>) => {
  const { currentStep } = useWizardContext()

  const { register, index } = useDescendant()

  const isActive = index === currentStep

  return (
    <div ref={register} hidden={!isActive}>
      {isActive && children}
    </div>
  )
}
