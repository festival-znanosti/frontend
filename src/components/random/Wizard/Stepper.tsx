import { ChevronLeft, ChevronRight } from 'lucide-react'

import { useWizardControls } from './Wizard'
import { useWizardContext } from './Wizard.context'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

const Stepper = ({ trigger }: { trigger: () => Promise<boolean> }) => {
  const { currentStep, finalStepNumber } = useWizardContext()
  const { goPrevious, goNext } = useWizardControls()

  const validateAndGoNext = async () => {
    const valid = await trigger()
    if (valid) {
      goNext()
    }
  }

  const isFinal = currentStep === finalStepNumber
  const progress = (currentStep / (finalStepNumber + 1)) * 100

  return (
    <div className="mt-auto flex h-10 w-full items-center justify-center gap-4 sm:gap-10">
      <Button onClick={goPrevious} disabled={currentStep === 0} className={cn('mr-auto')}>
        <ChevronLeft />
      </Button>
      <Progress value={progress} />
      <Button onClick={validateAndGoNext} disabled={isFinal} className={cn('ml-auto', isFinal && 'hidden')}>
        <ChevronRight />
      </Button>
      {isFinal && (
        <Button type="submit" className="ml-auto">
          Predaj
        </Button>
      )}
    </div>
  )
}

export default Stepper
