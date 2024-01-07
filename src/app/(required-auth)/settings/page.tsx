'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { changePassword } from '@/api/repository'
import PageTitle from '@/components/random/PageTitle'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useAccountDetails, useLogout } from '@/lib/useAccountDetails'

const ChangePasswordSchema = z
  .object({
    accountId: z.number().int(),
    oldPassword: z.string().min(8, { message: 'Upišite trenutnu lozinku.' }),
    newPassword: z.string().min(8, {
      message: 'Koristite lozinku od barem 8 znakova.',
    }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Lozinke se ne podudaraju.',
    path: ['confirmNewPassword'],
  })

type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>

const Settings = () => {
  const { accountDetails, isLoadingAccountDetails } = useAccountDetails()

  const changePasswordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      accountId: undefined,
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  useEffect(() => {
    if (accountDetails) {
      changePasswordForm.setValue('accountId', accountDetails.id)
    }
  }, [accountDetails])

  const changePasswordMutation = useMutation({
    mutationFn: async (data: ChangePasswordFormData) => {
      const response = await changePassword(data, data.accountId)
      return response
    },

    onSuccess(response) {
      toast({
        title: 'Uspjeh!',
        description: response.message,
      })
      changePasswordForm.reset()
    },

    onError(error) {
      toast({
        title: 'Greška',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  async function onSubmit(data: ChangePasswordFormData) {
    changePasswordMutation.mutate(data)
  }

  const { logout } = useLogout()

  return (
    <div className="flex h-full w-full flex-col">
      <PageTitle title="Postavke" description={`Pozdrav ${accountDetails?.firstName}!`} />
      <br />

      <Form {...changePasswordForm}>
        <FormLabel className="text-base" htmlFor="title">
          Promjena lozinke
        </FormLabel>
        <FormDescription>
          Kako biste promijenili lozinku potrebno je upisati trenutnu lozinku te zatim novoodabranu lozinku.
        </FormDescription>
        <br />
        <form
          className="flex w-full flex-col space-y-4 md:w-[400px]"
          onSubmit={changePasswordForm.handleSubmit(onSubmit)}
        >
          <FormField
            control={changePasswordForm.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <FormLabel htmlFor="oldPassword">Trenutna Lozinka</FormLabel>
                  <FormMessage className="text-sm font-medium leading-none" />
                </div>
                <FormControl>
                  <Input id="oldPassword" placeholder="FestivalZnanostiJeZakon123" type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={changePasswordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <FormLabel htmlFor="newPassword">Nova Lozinka</FormLabel>
                  <FormMessage className="text-sm font-medium leading-none" />
                </div>
                <FormControl>
                  <Input id="newPassword" placeholder="FestivalZnanostiJeNajbolji123" type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={changePasswordForm.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <FormLabel htmlFor="confirmNewPassword">Potvrdite Novu Lozinku</FormLabel>
                  <FormMessage className="text-sm font-medium leading-none" />
                </div>

                <FormControl>
                  <Input
                    id="confirmNewPassword"
                    placeholder="FestivalZnanostiJeNajbolji123"
                    type="password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            className="w-full select-none disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoadingAccountDetails}
          >
            Promjenite lozinku
          </Button>
        </form>

        <br />
        <FormLabel className="text-base" htmlFor="title">
          Odjava
        </FormLabel>
        <FormDescription>
          Klikom na gumb ispod odjavljujete se iz sustava. Sve promjene koje ste napravili, a niste spremili biti će
          poništene.
        </FormDescription>
        <br />
        <Button
          className="flex w-full select-none gap-2 disabled:cursor-not-allowed md:w-[400px]"
          type="submit"
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
        >
          <LogOut />
          <p>Odjavite se</p>
        </Button>
      </Form>
    </div>
  )
}

export default Settings
