'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

const EVENT_TYPES = ['Predavanje - kino dvorana', 'Prezentacija - izložbena dvorana', 'Radionica - izložbena dvorana']
const AGE_OF_PARTICIPANTS = [
  { id: '2', label: 'S1 - 5. i 6. razred osnovne škole' },
  { id: '1', label: 'S0 - predškolski uzrast i niži razredi osnovne škole' },
  { id: '3', label: 'S2 - 7. i 8. razred osnovne škole, 1. razred srednje škole' },
  { id: '4', label: 'S3 - 2., 3. i 4. razred srednje škole' },
  { id: '5', label: 'PP - djeca s posebnim potrebama' },
]

const EventFormSchema = z.object({
  title: z.string().min(1, 'Naziv događanja je obavezan'),
  type: z.string().min(1, 'Vrsta događanja je obavezna'),
  age: z.array(z.string()).nonempty('Uzrast sudionika je obavezan'),
})

export default function RegularDashboard() {
  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: {
      title: '',
      type: '',
      age: [],
    },
  })

  const [_isLoading, setIsLoading] = useState(false)

  function onSubmit(data: z.infer<typeof EventFormSchema>) {
    setIsLoading(true)
    setTimeout(() => {
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
      setIsLoading(false)
    }, 2000)
  }
  return (
    <main>
      Dashbard
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2 text-left">
            <h1 className="text-3xl font-bold">Obrazac za prijavu</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Unesite informacije vezane uz dogadaj</p>
            <br />
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">Naziv događanja</FormLabel>
                <FormDescription>Upišite naziv / naslov radionice / predavanja / prezentacije</FormDescription>
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
            render={() => (
              <FormItem>
                <FormLabel htmlFor="type">Vrsta događanja</FormLabel>
                <FormDescription>
                  Izborom predavanja odabirete ex-catedra predavanje u kino dvorani kapaciteta do 80 osoba, ukupan broj
                  predavanja u toj dvorani manji je od ukupnog broja radionica i prezentacija u izložbenoj dvorani, pa
                  moguće da su svi termini već popunjeni, u tom slučaju molimo da prilagodite predavanje načinu
                  izlaganja poput prezentacije u izložbenoj dvorani u kojoj se istovremeno održava više prezentacija /
                  radionica. Radionice i prezentacije se održavaju u izložbenoj dvorani na stolu s projektorom ili
                  televizorom. Radionicu i prezentaciju moguće je po potrebi i posjećenosti provesti više puta u
                  odabranom terminu. Za lokaciju radionice ili prezentacije možete izabrati i dvorište, ali tada ovisite
                  o vremenskim prilikama, u dvorištu možemo osigurati izvor struje i televizor.)
                </FormDescription>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Odaberite:</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 border rounded-md">
                      <DropdownMenuGroup>
                        {EVENT_TYPES.map((type, index) => (
                          <DropdownMenuItem key={index}>
                            <span>{type}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Uzrast sudionika</FormLabel>
                  <FormDescription>Odaberite sve uzraste prikladne za Vaš događaj</FormDescription>
                </div>
                {AGE_OF_PARTICIPANTS.map((age) => (
                  <FormField
                    key={age.id}
                    control={form.control}
                    name="age"
                    render={({ field }) => {
                      return (
                        <FormItem key={age.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(age.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, age.id])
                                  : field.onChange(field.value?.filter((value) => value !== age.id))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{age.label}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </main>
  )
}
