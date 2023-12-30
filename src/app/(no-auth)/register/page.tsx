'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { register } from '@/api/repository'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

const RegisterSchema = z
  .object({
    firstName: z.string().min(1, {
      message: '*',
    }),
    lastName: z.string().min(1, {
      message: '*',
    }),
    email: z
      .string()
      .min(3, {
        message: '*',
      })
      .email(' ' + ' Koristite valjanu email adresu.'),

    password: z.string().min(8, {
      message: 'Koristite lozinku od barem 8 znakova.',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Lozinke se ne podudaraju.',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof RegisterSchema>

export default function Register() {
  const router = useRouter()

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await register(data)
      return response
    },

    onSuccess(response) {
      if (response?.status === 'success') {
        toast({
          title: 'Uspjesno ste se registriali!',
          description: response.message,
        })
        router.push('/login')
      }
    },

    onError(error) {
      if (error?.message) {
        toast({
          title: 'Greška',
          description: error.message,
          variant: 'destructive',
        })
      }
    },
  })

  const isLoading = registerMutation.isPending

  async function onSubmit(formData: RegisterFormData) {
    registerMutation.mutate(formData)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <div className="w-full max-w-md space-y-4 rounded-xl  bg-white px-8 py-6 shadow-md dark:bg-gray-800">
        <h2 className="text-center text-2xl font-bold">Pridružite se</h2>
        <p className="text-center text-gray-600 dark:text-gray-400">Kreirajte svoj korisnički račun</p>
        <Form {...registerForm}>
          <form className="space-y-2" onSubmit={registerForm.handleSubmit(onSubmit)}>
            <FormField
              control={registerForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex">
                    <FormLabel htmlFor="firstName">Ime</FormLabel>
                    <FormMessage className="text-sm font-medium leading-none" />
                  </div>
                  <FormControl>
                    <Input id="firstName" placeholder="Ivan" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex">
                    <FormLabel htmlFor="last-name">Prezime</FormLabel>
                    <FormMessage className="text-sm font-medium leading-none" />
                  </div>
                  <FormControl>
                    <Input id="last-name" placeholder="Horvat" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormMessage className="text-sm font-medium leading-none" />
                  </div>
                  <FormControl>
                    <Input id="email" placeholder="ivan.horvat@festival-znanosti.hr" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2">
                    <FormLabel htmlFor="password">Lozinka</FormLabel>
                    <FormMessage className="text-sm font-medium leading-none" />
                  </div>
                  <FormControl>
                    <Input id="password" placeholder="FestivalZnanostiJeZakon123" type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2">
                    <FormLabel htmlFor="confirm-password">Potvrdite Lozinku</FormLabel>
                    <FormMessage className="text-sm font-medium leading-none" />
                  </div>

                  <FormControl>
                    <Input id="confirm-password" placeholder="FestivalZnanostiJeZakon123" type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="w-full select-none disabled:cursor-not-allowed" type="submit" disabled={isLoading}>
              Registriraj se
            </Button>
          </form>
        </Form>
        <p className="select-none text-center">
          Već imate korisnički račun?{' '}
          <Link
            className="text-blue-500 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            href="/login"
          >
            Prijavite se
          </Link>
        </p>
      </div>
    </div>
  )
}
