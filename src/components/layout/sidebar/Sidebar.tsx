'use client'

import { FilePlus2, Home, Menu, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

import SidebarSection from './SidebarSection'

import Logo from '@/components/random/Logo'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/ui/ThemeToggler'

interface SidebarSectionProps {
  sectionLabel?: string
  pageLabels: string[]
  pageIcons: ReactNode[]
  pageRoutes: string[]
}

const SidebarItemsAdmin: SidebarSectionProps[] = [
  {
    pageLabels: ['Moji događaji'],
    pageIcons: [<Home key={1} />],
    pageRoutes: ['/my-forms'],
  },
  {
    sectionLabel: 'Obrazci',
    pageLabels: ['Dodaj događaj'],
    pageIcons: [<FilePlus2 key={1} />],
    pageRoutes: ['/new-form'],
  },
  {
    sectionLabel: 'Profil',
    pageLabels: ['Postavke'],
    pageIcons: [<Settings key={1} />],
    pageRoutes: ['/settings'],
  },
]

const Sidebar = () => {
  const [currentPage, setCurrentPage] = useState('my-forms')

  const pathname = usePathname()

  useEffect(() => {
    setCurrentPage(pathname)
  }, [pathname])

  return (
    <>
      <aside className="hidden h-full w-[220px] flex-col border-r-[1px] bg-zinc-200 dark:bg-gray-800  sm:flex">
        <div className="px-10 py-10">
          <a href="/">
            <div className="flex items-center justify-center">
              <Logo size="100" />
            </div>
          </a>
        </div>
        <div className="flex flex-1 flex-col gap-5 px-3 py-10">
          {SidebarItemsAdmin.map((section, index) => (
            <SidebarSection
              key={index}
              sectionLabel={section.sectionLabel}
              pageLabels={section.pageLabels}
              pageIcons={section.pageIcons}
              pageRoutes={section.pageRoutes}
              currentPage={currentPage}
            />
          ))}
        </div>
        <div className="mb-8 px-5">
          <ThemeToggle />
        </div>
      </aside>

      <header className="visible absolute left-0 top-0 z-50 flex min-h-[80px] w-full items-center justify-between rounded-b-md bg-zinc-200 px-6 dark:bg-gray-800 sm:hidden">
        <Logo size="60" />
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" className="h-14">
              <Menu size={40} />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-full bg-zinc-200 dark:bg-gray-800 sm:hidden">
            <SheetHeader>
              <SheetTitle>
                <Logo size={80} />
              </SheetTitle>
              <SheetDescription />
            </SheetHeader>
            <div className="flex flex-1 flex-col gap-5 py-10">
              {SidebarItemsAdmin.map((section, index) => (
                <SidebarSection
                  key={index}
                  sectionLabel={section.sectionLabel}
                  pageLabels={section.pageLabels}
                  pageIcons={section.pageIcons}
                  pageRoutes={section.pageRoutes}
                  currentPage={currentPage}
                />
              ))}
            </div>
            <ThemeToggle />
          </SheetContent>
        </Sheet>
      </header>
    </>
  )
}

export default Sidebar
