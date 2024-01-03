'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SelectContent, SelectViewport } from '@radix-ui/react-select'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Calendar from '@/components/random/Calendar/Calendar'
import Lecturers, { LecturerArrayType, LecturerSchema } from '@/components/random/Lecturers/Lecturers'
import PageTitle from '@/components/random/PageTitle'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

enum EventType {
  Predavanje = 0,
  Prezentacija = 1,
  Radionica = 2,
  Izložba = 4,
}

const ParticipantsAges = [
  { id: '1', label: 'S0', age: 'predškolski uzrast i niži razredi osnovne škole' },
  { id: '2', label: 'S1', age: '5. i 6. razred osnovne škole' },
  { id: '3', label: 'S2', age: '7. i 8. razred osnovne škole, 1. razred srednje škole' },
  { id: '4', label: 'S3', age: '2., 3. i 4. razred srednje škole' },
  { id: '5', label: 'PP', age: 'djeca s posebnim potrebama' },
] as const // this one is new

const EventFormSchema = z
  .object({
    title: z.string().min(1, 'Naziv događanja je obavezan'),
    type: z.nativeEnum(EventType, { required_error: 'Odaberite vrstu događanja' }),
    participantsAges: z
      .array(
        z.object({
          id: z.string(),
          label: z.string(),
          age: z.string(),
        })
      )
      .min(1, 'Odaberite barem jedan uzrast'),
    visitorsCount: z
      .number({
        required_error: 'Broj posjetitelja je obavezan',
        invalid_type_error: 'Broj posjetitelja je obavezan',
      })
      .min(1, 'Broj posjetitelja mora biti veći od 0'),
    lecturers: z
      .array(LecturerSchema)
      .refine((lecturers) => lecturers.some((lec) => lec.type === 0), 'Morate dodati glavnog sudionika'),
    equipment: z.string().optional(),
    summary: z.string().optional(),
  })
  .refine((data) => !isNaN(data.visitorsCount), {
    message: 'Broj posjetitelja mora biti broj',
  })

export default function NewForm() {
  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: {
      title: '',
      type: undefined,
      participantsAges: [],
      visitorsCount: undefined,
      lecturers: [],
      equipment: '',
      summary: '',
    },
  })

  const [lecturers, setLecturers] = useState<LecturerArrayType>([])
  const initialRender = useRef(true)

  useEffect(() => {
    if (initialRender.current === true) {
      initialRender.current = false
      return
    } else {
      form.setValue('lecturers', lecturers)
      form.trigger(['lecturers'])
    }
  }, [lecturers])

  function onSubmit(data: z.infer<typeof EventFormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] select-text overflow-scroll rounded-md bg-slate-950 p-4">
          <code className=" h-full select-text overflow-auto text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  moguće da su svi termini već popunjeni, u tom slučaju molimo da prilagodite predavanje načinu
                  izlaganja poput prezentacije u izložbenoj dvorani u kojoj se istovremeno održava više prezentacija /
                  radionica. Radionice i prezentacije se održavaju u izložbenoj dvorani na stolu s projektorom ili
                  televizorom. Radionicu i prezentaciju moguće je po potrebi i posjećenosti provesti više puta u
                  odabranom terminu. Za lokaciju radionice ili prezentacije možete izabrati i dvorište, ali tada ovisite
                  o vremenskim prilikama, u dvorištu možemo osigurati izvor struje i televizor.
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

        <FormField
          control={form.control}
          name="participantsAges"
          render={() => (
            <FormItem className="mt-6">
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
                <Lecturers lecturers={lecturers} setLecturers={setLecturers} />
              </FormControl>
              {/* <FormMessage /> */}
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
        <br />

        <Calendar />
        <br />

        <Button type="submit" className="mt-6">
          Predaj
        </Button>
      </form>
    </Form>
  )
}
