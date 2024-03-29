'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createEvent } from '@/api/repository'
import { LecturerArrayType, LecturerSchema } from '@/components/random/Lecturers/Lecturers'
import Step1, { EventType } from '@/components/random/Wizard/Steps/Step1'
import Step2 from '@/components/random/Wizard/Steps/Step2'
import Step3 from '@/components/random/Wizard/Steps/Step3'
import Step4 from '@/components/random/Wizard/Steps/Step4'
import Step5 from '@/components/random/Wizard/Steps/Step5'
import { Wizard, WizardStep } from '@/components/random/Wizard/Wizard'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'

export type EventFormSchemaType = z.infer<typeof EventFormSchema>

const EventFormSchema = z
  .object({
    title: z.string().min(1, 'Naziv događanja je obavezan'),
    type: z.nativeEnum(EventType, {
      required_error: 'Odaberite vrstu događanja',
      invalid_type_error: 'Odaberite vrstu događanja',
    }),
    locationId: z.number({
      required_error: 'Odaberite lokaciju događanja',
      invalid_type_error: 'Odaberite lokaciju događanja',
    }),
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
    // timeSlots: z.array(z.object({ id: z.number(), start: z.string() })).min(1, 'Odaberite barem jedan termin'),
    timeSlotIds: z.array(z.number()).min(1, 'Odaberite barem jedan termin'),
  })
  .refine((data) => !isNaN(data.visitorsCount), {
    message: 'Broj posjetitelja mora biti broj',
  })

const Page = () => {
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
      // timeSlots: [],
      timeSlotIds: [],
    },
  })

  const [lecturers, setLecturers] = useState<LecturerArrayType>([])
  const [firstRender, setFirstRender] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false)
      return
    } else {
      form.setValue('lecturers', lecturers)
      form.trigger(['lecturers'])
    }
  }, [lecturers])

  const createEventMutation = useMutation({
    mutationFn: async (data: EventFormSchemaType) => {
      const response = await createEvent(data)
      return response
    },

    onSuccess(response) {
      toast({
        title: 'Uspjesno ste kreirali događaj!',
        description: response.message,
      })

      router.push('/my-forms')
    },

    onError(error) {
      toast({
        title: 'Greška',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  function onSubmit(data: z.infer<typeof EventFormSchema>) {
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] select-text overflow-scroll rounded-md bg-slate-950 p-4">
    //       <code className=" h-full select-text overflow-auto text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
    createEventMutation.mutate(data)
  }

  return (
    <Wizard form={form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-max min-h-full flex-1 flex-col">
          <WizardStep>
            <Step1 />
          </WizardStep>
          <WizardStep>
            <Step2 />
          </WizardStep>
          <WizardStep>
            <Step3 lecturers={lecturers} setLecturers={setLecturers} />
          </WizardStep>
          <WizardStep>
            <Step4 />
          </WizardStep>
          <WizardStep>
            <Step5 />
          </WizardStep>
          {/* {JSON.stringify(form.getValues())} */}
        </form>
      </Form>
    </Wizard>
  )
}

export default Page
