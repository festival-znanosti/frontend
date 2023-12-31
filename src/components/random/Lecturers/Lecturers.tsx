import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const LecturerSchema = z.object({
  id: z.number().optional(),
  firstName: z.string().min(1, '*'),
  lastName: z.string().min(1, '*'),
  phone: z.string().min(1, '*'),
  email: z
    .string()
    .min(3, {
      message: '*',
    })
    .email(' ' + 'Koristite valjanu email adresu.'),
  type: z.number(),
  resume: z
    .string()
    .min(1, '*')
    .max(800, ' ' + 'Maksimalno 800 znakova.'),
})

const LecturerArraySchema = z.array(LecturerSchema)
export type LecturerArrayType = z.infer<typeof LecturerArraySchema>

const Lecturers = ({
  lecturers,
  setLecturers,
  main,
}: {
  lecturers: LecturerArrayType
  setLecturers: (lecturers: LecturerArrayType) => void
  main?: boolean
}) => {
  const lecturerForm = useForm<z.infer<typeof LecturerSchema>>({
    resolver: zodResolver(LecturerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      type: main ? 0 : 1,
      resume: 'CV',
    },
  })

  const addLecturer = async () => {
    if (main && lecturers.length === 1) {
      return
    }

    const isValid = await lecturerForm.trigger(['firstName', 'lastName', 'phone', 'email'])

    if (isValid) {
      const newLecturer = lecturerForm.getValues(['id', 'firstName', 'lastName', 'phone', 'email', 'type', 'resume'])

      setLecturers([
        ...lecturers,
        {
          id: newLecturer[0],
          firstName: newLecturer[1],
          lastName: newLecturer[2],
          phone: newLecturer[3],
          email: newLecturer[4],
          type: newLecturer[5],
          resume: newLecturer[6],
        },
      ])

      lecturerForm.reset()
    }
  }

  const removeLecturer = (index: number) => {
    setLecturers(lecturers.filter((_, idx) => idx !== index))
  }

  return (
    <>
      <Form {...lecturerForm}>
        <form className="w-full">
          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full items-center gap-2">
              <FormField
                control={lecturerForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex">
                      <FormLabel htmlFor="firstName">Ime</FormLabel>
                      <FormMessage className="text-sm font-medium leading-none" />
                    </div>
                    <FormControl>
                      <Input id="firstName" placeholder="Ivan" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={lecturerForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex">
                      <FormLabel htmlFor="lecturerLastName">Prezime</FormLabel>
                      <FormMessage className="text-sm font-medium leading-none" />
                    </div>
                    <FormControl>
                      <Input id="lecturerLastName" placeholder="Horvat" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex h-full w-full items-center gap-2">
              <FormField
                control={lecturerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex">
                      <FormLabel htmlFor="lecturerEmail">E-mail</FormLabel>
                      <FormMessage className="text-sm font-medium leading-none" />
                    </div>
                    <FormControl>
                      <Input id="lecturerEmail" placeholder="ivan.horvat@gmail.com" type="email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={lecturerForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex">
                      <FormLabel htmlFor="lecturerPhoneNumber">Broj mobitela</FormLabel>
                      <FormMessage className="text-sm font-medium leading-none" />
                    </div>
                    <FormControl>
                      <Input id="lecturerPhoneNumber" placeholder="+385 91 9186 976" type="tel" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex h-[62px] items-end ">
                <Button onClick={addLecturer} type="button" disabled={main && lecturers.length === 1}>
                  <p className="hidden md:block">Dodaj sudionika</p>
                  <p className="block md:hidden">Dodaj</p>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>

      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>Ime i prezime</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Broj mobitela</TableHead>
            <TableHead className="text-right">Ukloni sudionika</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lecturers.map((lecturer, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {lecturer.firstName} {lecturer.lastName}
              </TableCell>
              <TableCell>{lecturer.email}</TableCell>
              <TableCell>{lecturer.phone}</TableCell>
              <TableCell className="text-right">
                <Button type="button" onClick={() => removeLecturer(index)} className="px-2">
                  <X />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default Lecturers
