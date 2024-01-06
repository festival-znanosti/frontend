import Lecturers, { LecturerArrayType } from '../../Lecturers/Lecturers'
import PageTitle from '../../PageTitle'
import Stepper from '../Stepper'
import { useWizardContext } from '../Wizard.context'

import { EventFormSchemaType } from '@/app/(required-auth)/new-form/page'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const Step3 = ({
  lecturers,
  setLecturers,
}: {
  lecturers: LecturerArrayType
  setLecturers: (lecturers: LecturerArrayType) => void
  main?: boolean
}) => {
  const { form } = useWizardContext<EventFormSchemaType>()
  return (
    <>
      <div className="w-full flex-1">
        <PageTitle title="Sudionici događaja" description="Unesite informacije vezane za sudionike." />
        <br />

        {/* glavni sudionik */}
        <FormField
          control={form.control}
          name="lecturers"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Voditelj događanja:</FormLabel>
                <FormDescription>
                  Navedite ime i kontakt jedne osobe koja je voditelj predavanja / radionice / prezentacije.
                </FormDescription>
              </div>
              <FormControl>
                <Lecturers lecturers={lecturers} setLecturers={setLecturers} main={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <br />

        {/* ostali sudionici */}
        <FormField
          control={form.control}
          name="lecturers"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sudionici događanja:</FormLabel>
                <FormDescription>
                  Navedite ime i kontakt svih osoba koje su uz voditelja sudionici predavanja / radionice /
                  prezentacije.
                </FormDescription>
              </div>
              <FormControl>
                <Lecturers lecturers={lecturers} setLecturers={setLecturers} />
              </FormControl>
            </FormItem>
          )}
        />
        <br />
      </div>
      <Stepper trigger={() => form.trigger(['lecturers'])} />
    </>
  )
}

export default Step3
