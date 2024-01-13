'use client'

import { FileEdit } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useMyEvents } from '@/components/random/Location/hooks'
import NewCard from '@/components/random/NewCard'
import PageTitle from '@/components/random/PageTitle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAccountDetails } from '@/lib/useAccountDetails'

const YourForms = () => {
  const { accountDetails } = useAccountDetails()

  const { myEvents, isPendingMyEvents } = useMyEvents(accountDetails!.id)
  const router = useRouter()

  return (
    <div className="flex h-full w-full flex-col">
      <PageTitle title="Vaši obrazci" description="Izmjenite postojeći ili kreirajte novi" />
      <br />
      <div className="flex h-full w-full flex-wrap gap-4">
        <NewCard />
        {!isPendingMyEvents &&
          myEvents &&
          myEvents.map((event) => (
            <Card className="flex h-[300px] w-[280px] flex-col" key={event.id}>
              <CardHeader className="h-1/2">
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="mt-4 flex h-1/2">
                <div className="mb-4 flex flex-col items-start space-y-1 pb-4 last:mb-0 last:pb-0">
                  <p className="text-sm font-medium leading-none ">
                    Voditelj: {event.lecturers.find((l) => l.type === 0)?.firstName}
                  </p>
                  <CardDescription>
                    {event.type} - {event.location.name}
                  </CardDescription>
                  <div className="flex gap-2">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-red-500" />
                    <p className="text-sm text-muted-foreground">{event.status}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="mt-auto w-full" onClick={() => router.push(`/edit-event?id=${event.id}`)}>
                  <FileEdit className="mr-2 h-4 w-4" /> Izmjeni obrazac
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default YourForms
