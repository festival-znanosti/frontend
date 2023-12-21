'use client'

import { FilePlus2, Home, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

import SidebarSection from './SidebarSection'

import Logo from '@/components/random/Logo'
import { ThemeToggle } from '@/components/ui/ThemeToggler'
interface SidebarSectionProps {
  sectionLabel?: string
  pageLabels: string[]
  pageIcons: ReactNode[]
  pageRoutes: string[]
}

const SidebarItemsAdmin: SidebarSectionProps[] = [
  {
    pageLabels: ['Moji obrazci'],
    pageIcons: [<Home key={1} />],
    pageRoutes: ['/my-forms'],
  },
  {
    sectionLabel: 'Obrazci',
    pageLabels: ['Dodaj obrazac'],
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
    <aside className="relative left-0 top-0 flex h-full w-[320px] flex-col border-r-[1px] bg-zinc-200 dark:bg-gray-800">
      <div className="px-10 py-10">
        <a href="/">
          <div className="flex items-center">
            <Logo size="100" />
            <p className="ml-auto text-4xl font-bold text-zinc-900 dark:text-zinc-100">Zagreb</p>
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
  )
}

export default Sidebar
