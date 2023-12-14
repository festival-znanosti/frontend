'use client'

import { FileEdit, Home, Settings } from 'lucide-react'
import { ReactNode, useState } from 'react'

import SidebarSection from './SidebarSection'

import Logo from '@/components/random/Logo'
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
    pageRoutes: ['/dashboard'],
  },
  {
    sectionLabel: 'Obrazci',
    pageLabels: ['Dodaj obrazac'],
    pageIcons: [<FileEdit key={1} />],
    pageRoutes: ['/dashboard/new-form'],
  },
  {
    sectionLabel: 'Profil',
    pageLabels: ['Postavke'],
    pageIcons: [<Settings key={1} />],
    pageRoutes: ['/dashboard/settings'],
  },
]

const Sidebar = () => {
  const [currentPage, setCurrentPage] = useState('Moji obrazci')

  return (
    <aside className="h-screen w-[320px] relative top-0 left-0 flex flex-col border-r-[1px] bg-zinc-200 dark:bg-gray-800">
      <div className="px-6 py-10">
        <a href="/">
          <div className="flex items-center gap-4">
            <Logo size="100" />
            <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">Zagreb</p>
          </div>
        </a>
      </div>
      <div className="flex flex-col gap-5 px-3 py-10 ">
        {SidebarItemsAdmin.map((section, index) => (
          <SidebarSection
            key={index}
            sectionLabel={section.sectionLabel}
            pageLabels={section.pageLabels}
            pageIcons={section.pageIcons}
            pageRoutes={section.pageRoutes}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
