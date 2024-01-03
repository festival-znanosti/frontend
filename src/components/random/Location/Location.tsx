// import { useQuery } from '@tanstack/react-query'
// import { Check, ChevronsUpDown } from 'lucide-react'
// import { useEffect, useState } from 'react'

// import { getAllParentLocations } from '@/api/repository'
// import { Button } from '@/components/ui/button'
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
// import { cn } from '@/lib/utils'

// const Location = ({ onChange }: { onChange: any }) => {
//   const [open, setOpen] = useState(false)
//   const [value, setValue] = useState<string>('')

//   useEffect(() => {
//     console.log(value)
//   }, [value])

//   const {
//     isPending,
//     error,
//     data: allParentLocations,
//   } = useQuery({
//     queryKey: ['allParentLocations'],
//     queryFn: () => getAllParentLocations(),
//   })

//   return (
//     <DropdownMenu open={open} onOpenChange={setOpen}>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" role="combobox" aria-expanded={open} className="w-[400px] justify-between">
//           {value && !isPending
//             ? allParentLocations!.find((location) => location.name.toLocaleLowerCase() === value)?.name
//             : 'Odaberite'}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-[400px] p-0">
//         <Command>
//           <CommandInput placeholder="Pretražite lokacije..." />
//           <CommandEmpty>Ako Vaše tražene lokacije nema, kreirajte novu!</CommandEmpty>
//           <CommandGroup>
//             {!isPending &&
//               open &&
//               allParentLocations!.map((location) => (
//                 <CommandItem
//                   key={location.id}
//                   value={location.name}
//                   onSelect={(currentValue) => {
//                     onChange(allParentLocations!.find((loc) => loc.name.toLocaleLowerCase() === currentValue)?.id)
//                     setValue(currentValue === value ? '' : currentValue)
//                     setOpen(false)
//                   }}
//                 >
//                   <Check
//                     className={cn(
//                       'mr-2 h-4 w-4',
//                       value === location.name.toLocaleLowerCase() ? 'opacity-100' : 'opacity-0'
//                     )}
//                   />
//                   {location.name}
//                 </CommandItem>
//               ))}
//           </CommandGroup>
//         </Command>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

// export default Location

const Location = ({ onChange }: { onChange: any }) => {
  return <div onChange={onChange()}>Location</div>
}

export default Location
