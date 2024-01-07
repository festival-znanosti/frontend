import { useMutation } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { FC, useEffect, useState } from 'react'

import { useChildLocations, useLocationDetails, useParentLocations } from './hooks'

import { createChildLocation, createParentLocation } from '@/api/repository'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { FormDescription, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface LocationProps {
  value: number | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void
}
const Location: FC<LocationProps> = ({ value, onChange }) => {
  const [openParent, setOpenParent] = useState(false)
  const [openChild, setOpenChild] = useState(false)

  const [parentId, setParentId] = useState<number | undefined>(undefined)
  const [childId, setChildId] = useState<number | undefined>(undefined)

  const [createParentLocationState, setCreateParentLocationState] = useState<string | undefined>(undefined)
  const [createChildLocationState, setCreateChildLocationState] = useState<string | undefined>(undefined)

  const { isPendingParent, allParentLocations, refetchParentLocations } = useParentLocations()
  const { isPendingChild, allChildLocations, refetchChildLocations } = useChildLocations(parentId!)
  const { isPendingLocation, locationDetails, refetchLocationDetails } = useLocationDetails(value!)

  const createParentMutation = useMutation({
    mutationFn: async (data: string) => {
      await createParentLocation(data)
    },

    onSuccess() {
      refetchParentLocations()
      setCreateParentLocationState('')
    },

    onError(error) {
      window.alert(error.message)
    },
  })

  const createParentLocationFn = () => {
    const queryLocation = encodeURIComponent(createParentLocationState!)
    createParentMutation.mutate(queryLocation)
  }

  const createChildMutation = useMutation({
    mutationFn: async (data: string) => {
      await createChildLocation(data, parentId!)
    },

    onSuccess() {
      refetchChildLocations()
      setCreateChildLocationState('')
    },

    onError(error) {
      window.alert(error.message)
    },
  })

  const createChildLocationFn = () => {
    const queryLocation = encodeURIComponent(createChildLocationState!)
    createChildMutation.mutate(queryLocation)
  }

  useEffect(() => {
    if (value) {
      if (locationDetails?.parentLocationId) {
        setParentId(locationDetails.parentLocationId)
        setChildId(locationDetails.id)
      } else {
        setParentId(locationDetails?.id)
      }
    }
  }, [])

  // TODO: use value to fetch location and set parent and child id

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="flex w-full flex-col lg:w-[50%]">
          <div className="mb-4">
            <FormLabel className="text-base">Glavna lokacija događaja:</FormLabel>
            <FormDescription>
              Izaberite jednu od lokacija. Ukoliko željena lokacija nije dostupna kreirajte ju sami!
            </FormDescription>
          </div>
          <DropdownMenu open={openParent} onOpenChange={setOpenParent}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openParent}
                className="w-full max-w-[400px] justify-between"
              >
                {parentId && !isPendingParent
                  ? allParentLocations!.find((location) => location.id === parentId)?.name
                  : 'Odaberite glavnu lokaciju...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Pretražite lokacije..." />
                <CommandEmpty>Ako Vaše tražene lokacije nema, kreirajte novu!</CommandEmpty>
                <CommandGroup>
                  {!isPendingParent &&
                    openParent &&
                    allParentLocations!.map((location) => (
                      <CommandItem
                        key={location.id}
                        value={location.name}
                        onSelect={(currentValue) => {
                          const selectedLocation = allParentLocations!.find(
                            (loc) => loc.name.toLocaleLowerCase() === currentValue
                          )
                          if (parentId === selectedLocation?.id) {
                            setParentId(undefined)
                            onChange(undefined)
                          } else {
                            setParentId(selectedLocation?.id)
                            onChange(selectedLocation?.id)
                          }
                          setChildId(undefined)
                          setOpenParent(false)
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', parentId === location.id ? 'opacity-100' : 'opacity-0')} />
                        {location.name}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </Command>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex w-full flex-col lg:w-[50%] lg:self-end">
          <div className="mb-4">
            <FormDescription>
              Ukoliko niste pronašli željenu lokaciju, upišite ime lokacije i pritisnite gumb 'Dodaj lokaciju'.
            </FormDescription>
          </div>

          <div className="flex w-full gap-2">
            <Input
              id="parentLocation"
              placeholder="Fakultet elektrotehnike i računarstva, Unska ul. 3"
              value={createParentLocationState}
              onChange={(e) => setCreateParentLocationState(e.target.value)}
            />
            <Button type="button" onClick={createParentLocationFn} disabled={createParentLocationState === undefined}>
              Dodaj Lokaciju
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="flex w-full flex-col lg:w-[50%]">
          <div className="mb-4">
            <FormLabel className="text-base">Podlokacija događaja:</FormLabel>
            <FormDescription>
              Ukoliko želite naznačiti točnu lokaciju događaja, odaberite jednu od podlokacija npr. A zgrada 2. kat.
              Ukoliko želite samo naznačiti glavnu lokaciju događaja, nemojte ništa odabrati.
            </FormDescription>
          </div>
          <DropdownMenu open={openChild} onOpenChange={setOpenChild}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openChild}
                className="w-full max-w-[400px] justify-between"
              >
                {childId && !isPendingChild
                  ? allChildLocations!.find((location) => location.id === childId)?.name
                  : 'Odaberite podlokaciju...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Pretražite podlokacije..." />
                <CommandEmpty>Ako Vaše tražene podlokacije nema, kreirajte novu!</CommandEmpty>
                <CommandGroup>
                  {!isPendingChild &&
                    openChild &&
                    allChildLocations!.map((location) => (
                      <CommandItem
                        key={location.id}
                        value={location.name}
                        onSelect={(currentValue) => {
                          const selectedLocation = allChildLocations!.find(
                            (loc) => loc.name.toLocaleLowerCase() === currentValue
                          )
                          if (childId === selectedLocation?.id) {
                            setChildId(undefined)
                            onChange(parentId)
                          } else {
                            setChildId(selectedLocation?.id)
                            onChange(selectedLocation?.id)
                          }
                          setOpenChild(false)
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', childId === location.id ? 'opacity-100' : 'opacity-0')} />
                        {location.name}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </Command>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex w-full flex-col lg:w-[50%] lg:self-end">
          <div className="mb-4">
            <FormDescription>
              Ukoliko niste pronašli željenu podlokaciju, upišite ime podlokacije i pritisnite gumb 'Dodaj podlokaciju'.
            </FormDescription>
          </div>

          <div className="flex w-full gap-2">
            <Input
              id="childLocation"
              placeholder="A zgrada, 2. kat"
              value={createChildLocationState}
              onChange={(e) => setCreateChildLocationState(e.target.value)}
            />
            <Button
              type="button"
              onClick={createChildLocationFn}
              disabled={createChildLocationState === undefined || !parentId}
            >
              Dodaj Podlokaciju
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Location
