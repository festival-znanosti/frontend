'use client'

import { useRouter } from 'next/navigation'
import { Fragment, ReactNode } from 'react'

import { cn } from '@/lib/utils'

const SidebarSection = ({
  sectionLabel,
  pageLabels,
  pageIcons,
  pageRoutes,
  currentPage,
}: {
  sectionLabel?: string
  pageLabels: string[]
  pageIcons: ReactNode[]
  pageRoutes: string[]
  currentPage: string
}) => {
  const router = useRouter()

  const handleNavigation = (path: string, _clickedPage: string) => {
    router.push(path)
  }

  return (
    <div className="flex flex-col">
      {sectionLabel && <div className="p-2 text-[15px] font-bold">{sectionLabel}</div>}
      {pageLabels &&
        pageLabels.map((label, i) => {
          return (
            <Fragment key={i}>
              <button
                className={cn(
                  'p-2 py-3 duration-100',
                  currentPage === pageRoutes[i] ? 'rounded-lg bg-background' : 'hover:scale-[1.02]'
                )}
                onClick={() => {
                  handleNavigation(pageRoutes[i], pageLabels[i])
                }}
                disabled={currentPage === pageLabels[i]}
              >
                <div className="flex flex-row items-center gap-2">
                  {pageIcons[i] === 'none' ? null : <>{pageIcons[i]}</>}
                  <p className=" text-lg font-bold">{label}</p>
                </div>
              </button>
            </Fragment>
          )
        })}
    </div>
  )
}

export default SidebarSection
