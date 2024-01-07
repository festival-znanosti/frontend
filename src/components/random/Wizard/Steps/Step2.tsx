import Location from '../../Location/Location'
import PageTitle from '../../PageTitle'
import Stepper from '../Stepper'
import { useWizardContext } from '../Wizard.context'

import { EventFormSchemaType } from '@/app/(required-auth)/new-form/page'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

const Step2 = () => {
  const { form } = useWizardContext<EventFormSchemaType>()

  return (
    <>
      <div className="mt-[80px] w-full flex-1">
        <PageTitle title="Lokacija događaja" description="Unesite informacije vezane uz lokaciju događaja" />
        <br />

        {/* Location*/}
        <FormField
          control={form.control}
          name="locationId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Location value={form.getValues('locationId')} onChange={field.onChange} />
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
