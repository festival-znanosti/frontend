'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Stepper from '@/components/random/Wizard/Stepper'
import { Wizard, WizardStep, useWizardControls } from '@/components/random/Wizard/Wizard'
import { useWizardContext } from '@/components/random/Wizard/Wizard.context'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const steps = ['Step1', 'Step2', 'Step3'] as const

const UserFormSchema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  age: z.string().min(1, 'Age is required'),
})

const Step1 = () => {
  const { form } = useWizardContext<z.infer<typeof UserFormSchema>>()

  return (
    <div className="flex flex-col gap-4">
      <FormField
        // @ts-ignore
        control={form.control}
        name="firstname"
        render={({ field }) => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base" htmlFor="firstname">
                Ime
              </FormLabel>
              <FormDescription>Upišite ime</FormDescription>
            </div>
            <FormControl>
              <Input id="firstname" placeholder="Petar" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* @ts-ignore */}
      <Stepper trigger={() => form.trigger(['firstname'])} />
    </div>
  )
}

const Step2 = () => {
  const { form } = useWizardContext<z.infer<typeof UserFormSchema>>()

  return (
    <div className="flex flex-col gap-4">
      <FormField
        // @ts-ignore
        control={form.control}
        name="lastname"
        render={({ field }) => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base" htmlFor="lastname">
                Prezime
              </FormLabel>
              <FormDescription>Upišite prezime</FormDescription>
            </div>
            <FormControl>
              <Input id="lastname" placeholder="Peric" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* @ts-ignore */}
      <Stepper trigger={() => form.trigger(['lastname'])} />
    </div>
  )
}

const Step3 = () => {
  const { form } = useWizardContext<z.infer<typeof UserFormSchema>>()

  return (
    <div className="flex flex-col gap-4">
      <FormField
        // @ts-ignore
        control={form.control}
        name="age"
        render={({ field }) => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base" htmlFor="age">
                Godine
              </FormLabel>
              <FormDescription>Upišite godine</FormDescription>
            </div>
            <FormControl>
              <Input id="age" placeholder="10" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* @ts-ignore */}
      <Stepper trigger={() => form.trigger(['age'])} />
    </div>
  )
}

const StepCount = () => {
  const { currentStep } = useWizardContext()

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

const Page = () => {
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      age: '',
    },
  })

  function onSubmit(data: z.infer<typeof UserFormSchema>) {
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
        {/* @ts-ignore */}
        <Wizard form={form}>
          <StepCount />
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

        {/* <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base" htmlFor="firstname">
                  Ime
                </FormLabel>
                <FormDescription>Upišite ime</FormDescription>
              </div>
              <FormControl>
                <Input id="firstname" placeholder="Petar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base" htmlFor="lastname">
                  Prezime
                </FormLabel>
                <FormDescription>Upišite prezime</FormDescription>
              </div>
              <FormControl>
                <Input id="lastname" placeholder="Peric" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base" htmlFor="age">
                  Godine
                </FormLabel>
                <FormDescription>Upišite godine</FormDescription>
              </div>
              <FormControl>
                <Input id="age" placeholder="10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <div>{JSON.stringify(form.getValues(), null, 2)}</div>
      </form>
    </Form>
  )
}

export default Page
