import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const LecturerSchema = z.object({
  lecturerName: z.string().min(1, '*'),
  lecturerLastName: z.string().min(1, '*'),
  lecturerPhoneNumber: z.string().min(1, '*'),
  lecturerEmail: z
    .string()
    .min(3, {
      message: '*',
    })
    .email(' ' + ' Koristite valjanu email adresu.'),
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
      lecturerName: '',
      lecturerLastName: '',
      lecturerPhoneNumber: '',
      lecturerEmail: '',
    },
  })

  const addLecturer = async () => {
    if (main && lecturers.length === 1) {
      return
    }

    const isValid = await lecturerForm.trigger([
      'lecturerName',
      'lecturerLastName',
      'lecturerEmail',
      'lecturerPhoneNumber',
    ])

    if (isValid) {
      const newLecturer = lecturerForm.getValues([
        'lecturerName',
        'lecturerLastName',
        'lecturerEmail',
        'lecturerPhoneNumber',
      ])

      setLecturers([
        ...lecturers,
        {
          lecturerName: newLecturer[0],
          lecturerLastName: newLecturer[1],
          lecturerEmail: newLecturer[2],
          lecturerPhoneNumber: newLecturer[3],
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
                name="lecturerName"
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
                name="lecturerLastName"
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
                name="lecturerEmail"
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
                name="lecturerPhoneNumber"
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
                  Dodaj sudionika
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
                {lecturer.lecturerName} {lecturer.lecturerLastName}
              </TableCell>
              <TableCell>{lecturer.lecturerEmail}</TableCell>
              <TableCell>{lecturer.lecturerPhoneNumber}</TableCell>
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
