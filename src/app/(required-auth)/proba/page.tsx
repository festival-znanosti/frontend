'use client'

import { Wizard, WizardStep, useWizardControls } from '@/components/random/Wizard/Wizard'
import { useWizardContext } from '@/components/random/Wizard/Wizard.context'
import { cn } from '@/lib/utils'

const steps = ['Step1', 'Step2', 'Step3'] as const

interface User {
  firstname?: string
  lastname?: string
  age?: number
}

const useFormWizard = useWizardContext<User>

const Step1 = () => {
  const { data, setData } = useFormWizard()
  const { goNext } = useWizardControls()

  return (
    <div className="flex flex-col gap-4">
      <div>{JSON.stringify(data, null, 2)}</div>
      <div className="flex gap-4">
        <button
          onClick={() => {
            setData((prev) => ({
              ...prev,
              firstname: 'John',
            }))
            goNext()
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

const Step2 = () => {
  const { data, setData } = useFormWizard()
  const { goNext, goPrevious } = useWizardControls()

  return (
    <div className="flex flex-col gap-4">
      <div>{JSON.stringify(data, null, 2)}</div>
      <div className="flex gap-4">
        <button onClick={goPrevious}>Previous</button>
        <button
          onClick={() => {
            setData((prev) => ({
              ...prev,
              lastname: 'Smith',
            }))
            goNext()
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

const Step3 = () => {
  const { data, setData } = useFormWizard()
  const { goPrevious } = useWizardControls()

  return (
    <div className="flex flex-col gap-4">
      <div>{JSON.stringify(data, null, 2)}</div>
      <div className="flex gap-4">
        <button onClick={goPrevious}>Previous</button>
        <button
          onClick={() => {
            setData((prev) => ({
              ...prev,
              age: 15,
            }))
          }}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

const Stepper = () => {
  const { currentStep } = useFormWizard()

  return (
    <div className="flex gap-3">
      {steps.map((step) => (
        <div key={step} className={cn(steps[currentStep] === step ? 'text-green-500' : 'text-red-500')}>
          {step}
        </div>
      ))}
    </div>
  )
}

const page = () => {
  return (
    <Wizard>
      <Stepper />
      <WizardStep>
        <Step1 />
      </WizardStep>
      <WizardStep>
        <Step2 />
      </WizardStep>
      <WizardStep>
        <Step3 />
      </WizardStep>
    </Wizard>
  )
}

export default page
