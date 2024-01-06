import Location from '../../Location/Location'
import Stepper from '../Stepper'
import { useWizardContext } from '../Wizard.context'

import { EventFormSchemaType } from '@/app/(required-auth)/proba/page'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const Step2 = () => {
  const { form } = useWizardContext<EventFormSchemaType>()
  return (
    <>
      {/* Location*/}
      <FormField
        control={form.control}
        name="locationId"
        render={({ field }) => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Lokacija događaja:</FormLabel>
              <FormDescription>izaberite to be done....</FormDescription>
            </div>
            <FormControl>
              <Location onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Stepper trigger={() => form.trigger(['locationId'])} />
    </>
  )
}

export default Step2
