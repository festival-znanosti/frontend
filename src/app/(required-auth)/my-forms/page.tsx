import { FileEdit } from 'lucide-react'

import NewCard from '@/components/random/NewCard'
import PageTitle from '@/components/random/PageTitle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
]

const YourForms = () => {
  return (
    <div>
      <PageTitle title="Vaši obrazci" description="Izmjenite postojeći ili kreirajte novi" />
      <br />
      <div className="flex gap-4">
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              {notifications.map((notification, index) => (
                <div key={index} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-red-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none ">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <FileEdit className="mr-2 h-4 w-4" /> Izmjeni obrazac
            </Button>
          </CardFooter>
        </Card>
        <NewCard />
      </div>
    </div>
  )
}

export default YourForms
