'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { login } from '@/api/repository'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

const LoginSchema = z.object({
  email: z.string().min(1, {
    message: 'Email je obavezan',
  }),
  password: z.string().min(1, {
    message: 'Lozinka je obavezna',
  }),
})

type LoginFormData = z.infer<typeof LoginSchema>

export default function Login() {
  const router = useRouter()

  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await login(data)
      return response
    },

    onSuccess(response) {
      if (response?.status === 'success') {
        toast({
          title: 'Uspjesno ste se ulogirali!',
          description: response.message,
        })
        router.push('/dashboard')
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

  const isLoading = loginMutation.isPending

  const onSubmit = async (data: LoginFormData) => {
    loginMutation.mutate(data)
  }

  return (
    <div className="w-full h-full flex justify-between ">
      <div className="hidden h-full lg:w-[55%] xl:w-[50%] lg:flex items-center justify-center bg-zinc-100  dark:bg-zinc-900 relative">
        <Link href="/">
          <div> Moram smislit neki lijepi logo ili stavit onaj crveni koji postoji</div>
          <div>Pitaj Branimira</div>
        </Link>
      </div>
      <main className="flex w-full lg:w-[45%] xl:w-[50%] px-4 lg:px-0 h-full items-center justify-center py-12 bg-white dark:bg-gray-800">
        <Form {...loginForm}>
          <form className="mx-auto w-[350px]" onSubmit={loginForm.handleSubmit(onSubmit)}>
            <div className="space-y-2 text-left">
              <h1 className="text-3xl font-bold">Prijava</h1>
              <p className="text-zinc-500 dark:text-zinc-400">Unesite svoje korisničke podatke</p>
              <br />
            </div>
            <div className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input id="email" placeholder="ja@festival-znanosti.hr" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Lozinka</FormLabel>
                    <FormControl>
                      <Input id="password" placeholder="FestivalZnanostiJeZakon123" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full select-none disabled:cursor-not-allowed" type="submit" disabled={isLoading}>
                Prijavi se
              </Button>
            </div>
            <div className="mt-4 text-center text-sm select-none">
              Nemate korisnički račun?{' '}
              <Link
                className="underline  text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                href="/register"
              >
                Registrirajte se
              </Link>
            </div>
          </form>
        </Form>
      </main>
    </div>
  )
}
