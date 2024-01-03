import { createDescendantContext } from '@chakra-ui/descendant'
import { HTMLProps, type PropsWithChildren, forwardRef, useCallback, useMemo, useState } from 'react'

import {
  type Data,
  WizardContext,
  WizardControlsContext,
  useWizardContext,
  useWizardControlsContext,
} from './Wizard.context'

export interface WizardProps extends HTMLProps<HTMLDivElement> {
  defaultIndex?: number
}

export const [DescendantsProvider, , useDescendants, useDescendant] = createDescendantContext()

export const useWizardControls = () => {
  const setCurrentStep = useWizardControlsContext()

  return {
    goNext: useCallback(() => setCurrentStep((value) => value + 1), [setCurrentStep]),
    goPrevious: useCallback(() => setCurrentStep((value) => value - 1), [setCurrentStep]),
  }
}

export const Wizard = forwardRef<HTMLDivElement, PropsWithChildren<WizardProps>>(
  ({ children, defaultIndex, ...rest }, ref) => {
    const [data, setData] = useState<Data>()

    const descendants = useDescendants()

    const [currentStep, setCurrentStep] = useState(defaultIndex ?? 0)
    const context = useMemo(() => ({ data, setData, currentStep }), [currentStep, data])

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

  console.log(index, currentStep)

  return (
    <div ref={register} hidden={!isActive}>
      {isActive && children}
    </div>
  )
}
