'use client'

import { useRouter } from 'next/navigation'
import { Dispatch, Fragment, ReactNode, SetStateAction } from 'react'

import { cn } from '@/lib/utils'

const SidebarSection = ({
  sectionLabel,
  pageLabels,
  pageIcons,
  pageRoutes,
  currentPage,
  setCurrentPage,
}: {
  sectionLabel?: string
  pageLabels: string[]
  pageIcons: ReactNode[]
  pageRoutes: string[]
  currentPage: string
  setCurrentPage: Dispatch<SetStateAction<string>>
  // setDrawerIsOpen: any
}) => {
  const router = useRouter()

  const handleNavigation = (path: string, clickedPage: string) => {
    router.push(path)
    setCurrentPage(clickedPage)
  }

  return (
    <div className="flex flex-col">
      {sectionLabel && <div className="p-2 font-bold text-[15px]">{sectionLabel}</div>}
      {pageLabels &&
        pageLabels.map((label, i) => {
          return (
            <Fragment key={i}>
              <button
                className={cn(
                  'p-2 py-3 duration-100',
                  currentPage === pageLabels[i] ? 'rounded-lg bg-background' : 'hover:scale-[1.02]'
                )}
                onClick={() => {
                  handleNavigation(pageRoutes[i], pageLabels[i])
                }}
                disabled={currentPage === pageLabels[i]}
              >
                <div className="flex flex-row gap-2 items-center">
                  {pageIcons[i] === 'none' ? null : <>{pageIcons[i]}</>}
                  <p className=" font-bold text-lg">{label}</p>
                </div>
              </button>
            </Fragment>
          )
        })}
    </div>
  )
}

export default SidebarSection
