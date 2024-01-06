import Location from '../../Location/Location'
import PageTitle from '../../PageTitle'
import Stepper from '../Stepper'
import { useWizardContext } from '../Wizard.context'

import { EventFormSchemaType } from '@/app/(required-auth)/new-form/page'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const Step2 = () => {
  const { form } = useWizardContext<EventFormSchemaType>()
  return (
    <>
      <div className="w-full flex-1">
        <PageTitle title="Lokacija događaja" description="Unesite informacije vezane uz lokaciju događaja" />
        <br />

        {/* Location*/}
        <FormField
          control={form.control}
          name="locationId"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Glavna lokacija događaja:</FormLabel>
                <FormDescription>
                  Izaberite jednu od lokacija. Ukoliko željena lokacija nije dostupna kreirajte ju sami!
                </FormDescription>
              </div>
              <FormControl>
                <Location onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <br />
      </div>
      <Stepper trigger={() => form.trigger(['locationId'])} />
    </>
  )
}

export default Step2
