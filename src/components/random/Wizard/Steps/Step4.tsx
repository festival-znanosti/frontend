import { z } from 'zod'

import Stepper from '../Stepper'
import { useWizardContext } from '../Wizard.context'

import { EventFormSchema } from '@/app/(required-auth)/proba/page'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const ParticipantsAges = [
  { id: '1', label: 'S0', age: 'predškolski uzrast i niži razredi osnovne škole' },
  { id: '2', label: 'S1', age: '5. i 6. razred osnovne škole' },
  { id: '3', label: 'S2', age: '7. i 8. razred osnovne škole, 1. razred srednje škole' },
  { id: '4', label: 'S3', age: '2., 3. i 4. razred srednje škole' },
  { id: '5', label: 'PP', age: 'djeca s posebnim potrebama' },
] as const

const Step4 = () => {
  const { form } = useWizardContext<z.infer<typeof EventFormSchema>>()

  return (
    <>
      <FormField
        control={form.control}
        name="participantsAges"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Uzrast sudionika</FormLabel>
              <FormDescription>Odaberite sve uzraste prikladne za Vaš događaj</FormDescription>
            </div>
            {ParticipantsAges.map((age) => (
              <FormField
                key={age.id}
                control={form.control}
                name="participantsAges"
                render={({ field }) => {
                  return (
                    <FormItem key={age.id} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value.some((a) => a.id === age.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, age])
                              : field.onChange(field.value.filter((value) => value.id !== age.id))
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{`${age.label} - ${age.age}`}</FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
            <FormMessage />
          </FormItem>
        )}
      />

      <br />

      <FormField
        control={form.control}
        name="visitorsCount"
        render={({ field }) => (
          <FormItem>
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
      <Stepper trigger={() => form.trigger(['participantsAges', 'visitorsCount', 'equipment'])} />
    </>
  )
}

export default Step4
