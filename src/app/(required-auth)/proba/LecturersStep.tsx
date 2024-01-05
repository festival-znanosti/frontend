'use client'

import Lecturers, { LecturerArrayType } from '@/components/random/Lecturers/Lecturers'
import { useWizardContext } from '@/components/random/Wizard/Wizard.context'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const LecturersStep = ({
  lecturers,
  setLecturers,
}: {
  lecturers: LecturerArrayType
  setLecturers: (lecturers: LecturerArrayType) => void
}) => {
  const { form } = useWizardContext()
  return (
    <>
      <FormField
        control={form.control}
        name="visitorsCount"
        render={({ field }) => (
          <FormItem className="mt-6">
            <div className="mb-4">
              <FormLabel className="text-base" htmlFor="visitorsCount">
                Predviđeni broj posjetitelja:
              </FormLabel>
              <FormDescription>
                Navesti koliki broj posjetitelja može sudjelovati predavanju / prezentaciji / radionici
              </FormDescription>
            </div>
            <FormControl>
              <Input
                id="visitorsCount"
                placeholder="30"
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
                Navesti ime i kontakt jedne osobe koja je voditelj predavanja / radionice / prezentacije.
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
                Navesti ime i kontakt svih osoba koje su uz voditelja sudionici predavanja / radionice / prezentacije.
              </FormDescription>
            </div>
            <FormControl>
              <LecturersStep lecturers={lecturers} setLecturers={setLecturers} />
            </FormControl>
            {/* <FormMessage /> */}
          </FormItem>
        )}
      />
    </>
  )
}

export default LecturersStep
