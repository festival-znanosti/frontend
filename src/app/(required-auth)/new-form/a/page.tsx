'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import LecturersStep from './Lecturers'
import Step1 from './Step1'
import Step3 from './Step3'
import { EventType } from '../page'

import { LecturerArrayType, LecturerSchema } from '@/components/random/Lecturers/Lecturers'
import { Wizard, WizardStep, useDescendants, useWizardControls } from '@/components/random/Wizard/Wizard'
import { useWizardContext } from '@/components/random/Wizard/Wizard.context'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const EventFormSchema = z
  .object({
    title: z.string().min(1, 'Naziv događanja je obavezan'),
    type: z.nativeEnum(EventType, { required_error: 'Odaberite vrstu događanja' }),
    locationId: z.coerce.number({ required_error: 'Odaberite lokaciju događanja' }),
    participantsAges: z
      .array(
        z.object({
          id: z.string(),
          label: z.string(),
          age: z.string(),
        })
      )
      .min(1, 'Odaberite barem jedan uzrast'),
    visitorsCount: z
      .number({
        required_error: 'Broj posjetitelja je obavezan',
        invalid_type_error: 'Broj posjetitelja je obavezan',
      })
      .min(1, 'Broj posjetitelja mora biti veći od 0'),
    lecturers: z
      .array(LecturerSchema)
      .refine((lecturers) => lecturers.some((lec) => lec.type === 0), 'Morate dodati glavnog sudionika'),
    equipment: z.string().optional(),
    summary: z.string().optional(),
  })
  .refine((data) => !isNaN(data.visitorsCount), {
    message: 'Broj posjetitelja mora biti broj',
  })

export const Stepper = ({ trigger }: { trigger: () => Promise<boolean> }) => {
  const { currentStep, finalStepNumber } = useWizardContext()
  const { goPrevious, goNext } = useWizardControls()

  const validateAndGoNext = async () => {
    const valid = await trigger()
    if (valid) {
      goNext()
    }
  }

  const isFinal = currentStep === finalStepNumber

  return (
    <div className="flex h-10 w-full items-center ">
      <Button onClick={goPrevious} disabled={currentStep === 0} className={cn('mr-auto', isFinal && 'hidden')}>
        Previous
      </Button>
      <Button onClick={validateAndGoNext} disabled={isFinal} className={cn('ml-auto', isFinal && 'hidden')}>
        Next
      </Button>
      {isFinal && (
        <Button type="submit" className="ml-auto">
          Predaj
        </Button>
      )}
    </div>
  )
}

const FormComponent = () => {
  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: {
      title: '',
      type: undefined,
      locationId: undefined,
      participantsAges: [],
      visitorsCount: undefined,
      lecturers: [],
      equipment: '',
      summary: '',
    },
  })

  const [lecturers, setLecturers] = useState<LecturerArrayType>([])
  const initialRender = useRef(true)

  useEffect(() => {
    if (initialRender.current === true) {
      initialRender.current = false
      return
    } else {
      form.setValue('lecturers', lecturers)
      form.trigger(['lecturers'])
    }
  }, [lecturers])

  function onSubmit(data: z.infer<typeof EventFormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] select-text overflow-scroll rounded-md bg-slate-950 p-4">
          <code className=" h-full select-text overflow-auto text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Wizard form={form}>
          <WizardStep>
            <Step1 />
          </WizardStep>
          <WizardStep>
            <LecturersStep lecturers={lecturers} setLecturers={setLecturers} />
          </WizardStep>
          <WizardStep>
            <Step3 />
          </WizardStep>
        </Wizard>
      </form>
    </Form>
  )
}

export default FormComponent
