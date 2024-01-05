'use client'

import { SelectContent, SelectViewport } from '@radix-ui/react-select'

import { EventType } from '../new-form/page'

import PageTitle from '@/components/random/PageTitle'
import { useWizardContext } from '@/components/random/Wizard/Wizard.context'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const Step1 = () => {
  const { form } = useWizardContext()
  return (
    <>
      <PageTitle title="Obrazac za prijavu" description="Unesite informacije vezane uz dogadaj" />
      <br />
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base" htmlFor="title">
                Naziv događanja
              </FormLabel>
              <FormDescription>Upišite naziv / naslov radionice / predavanja / prezentacije</FormDescription>
            </div>
            <FormControl>
              <Input id="title" placeholder="Kako napraviti jako dobru aplikaciju" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem className="mt-6">
            <div className="mb-4">
              <FormLabel className="text-base" htmlFor="type">
                Vrsta događanja
              </FormLabel>
              <FormDescription>
                Izborom predavanja odabirete ex-catedra predavanje u kino dvorani kapaciteta do 80 osoba, ukupan broj
                predavanja u toj dvorani manji je od ukupnog broja radionica i prezentacija u izložbenoj dvorani, pa
                moguće da su svi termini već popunjeni, u tom slučaju molimo da prilagodite predavanje načinu izlaganja
                poput prezentacije u izložbenoj dvorani u kojoj se istovremeno održava više prezentacija / radionica.
                Radionice i prezentacije se održavaju u izložbenoj dvorani na stolu s projektorom ili televizorom.
                Radionicu i prezentaciju moguće je po potrebi i posjećenosti provesti više puta u odabranom terminu. Za
                lokaciju radionice ili prezentacije možete izabrati i dvorište, ali tada ovisite o vremenskim prilikama,
                u dvorištu možemo osigurati izvor struje i televizor.
              </FormDescription>
            </div>
            <Select
              onValueChange={(val) => field.onChange(Object(EventType)[val])}
              defaultValue={form.getValues('type') as unknown as string}
            >
              <FormControl>
                {/* <div className="flex items-center gap-4"> */}
                <SelectTrigger className="w-full md:w-[400px]">
                  <SelectValue placeholder="Odaberite" />
                </SelectTrigger>
                {/* <p>{Object(EventType)[form.getValues('type')]}</p> */}
                {/* <p>{form.getValues('type')}</p> */}
                {/* </div> */}
              </FormControl>
              <SelectContent>
                <SelectViewport className="rounded-md border bg-background">
                  {Object.keys(EventType)
                    .filter((val) => isNaN(+val))
                    .map((type, index) => (
                      <SelectItem value={type} key={index}>
                        {type}
                      </SelectItem>
                    ))}
                </SelectViewport>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export default Step1
