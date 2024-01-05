'use client'

import Calendar from '@/components/random/Calendar/Calendar'
import { useWizardContext } from '@/components/random/Wizard/Wizard.context'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

const Step3 = () => {
  const { form } = useWizardContext()
  return (
    <>
      {/* potrebna oprema */}
      <FormField
        control={form.control}
        name="equipment"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="equipment">Potrebna oprema i podrška:</FormLabel>
            <FormDescription>
              Mi osiguravamo laptop / kompjuter, projektor / TV ekran i pristup internetu, potreban Vam je samo usb,
              navedite ako je još nešto potrebno ili imate posebne napomene.
            </FormDescription>
            <FormControl>
              <Textarea
                id="equipment"
                placeholder="LCD projektor, platno, TV, računalo, stolice…)"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <br />
      <Calendar />
    </>
  )
}

export default Step3
