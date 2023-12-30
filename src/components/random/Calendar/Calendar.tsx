import { ChevronLeft, ChevronRight } from 'lucide-react'
import { RefObject, useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import { DraggableData, DraggableEventHandler } from 'react-draggable'

import useElementSize from '@/lib/useElementSize'
import { useMediaQuery } from '@/lib/useMediaQuery'

interface ColumnWidthRefType extends RefObject<HTMLDivElement> {
  current: HTMLDivElement | null
}

interface RowHeightRefType extends RefObject<HTMLDivElement> {
  current: HTMLDivElement | null
}

export default function Calendar() {
  // const [selectedDate, setSelectedDate] = useState(new Date())

  const { width: columnWidth, elementRef: columnWidthRef } = useElementSize() as {
    width: number
    elementRef: ColumnWidthRefType
  }

  const { height: rowHeight, elementRef: rowHeightRef } = useElementSize() as {
    height: number
    elementRef: RowHeightRefType
  }
  const isWeekCalendar = useMediaQuery('(min-width: 1024px)')

  const [draggablePosition, setDraggablePosition] = useState({ x: 0, y: 0 })

  const handleDragStop: DraggableEventHandler = (_e, data: DraggableData) => {
    // x and y coordinates
    const nearestX = Math.round(data.x / columnWidth) * columnWidth
    const nearestY = Math.round(data.y / (rowHeight / 6)) * (rowHeight / 6)
    setDraggablePosition({ x: nearestX, y: nearestY })

    // Calculate time and date from nearestX and nearestY
    const baseDate = new Date(2024, 3, 22) // April 22, 2024 (month is 0-indexed)
    const daysToAdd = nearestX / columnWidth
    const minutesToAdd = (nearestY / (rowHeight / 6)) * 5

    const newDate = new Date(baseDate)
    newDate.setDate(baseDate.getDate() + daysToAdd)
    newDate.setHours(10, minutesToAdd)

    // Now newDate holds the calculated date and time
    console.log(`Calculated Date and Time: ${newDate}`)
  }

  useEffect(() => {
    const handleResize = () => {
      if (isWeekCalendar) {
        const newX = Math.round(draggablePosition.x / columnWidth) * columnWidth
        const newY = Math.round(draggablePosition.y / (rowHeight / 6)) * (rowHeight / 6)
        setDraggablePosition({ x: newX, y: newY })
      } else {
        const newX = 0
        const newY = Math.round(draggablePosition.y / (rowHeight / 6)) * (rowHeight / 6)
        setDraggablePosition({ x: newX, y: newY })
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [columnWidth, rowHeight, draggablePosition])

  return (
    <div className="flex h-auto w-full flex-col">
      {/** Buttons above calendar */}
      <div className="flex flex-none items-center justify-end border-b border-gray-200 px-6 py-4">
        <div className="relative flex items-center rounded-md bg-white shadow-sm">
          <button
            type="button"
            className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
          >
            <span className="sr-only">Dan prije</span>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="block h-9  border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative "
          >
            Danas
          </button>
          <button
            type="button"
            className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
          >
            <span className="sr-only">Dan poslije</span>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          className="ml-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Dodaj događaj
        </button>
      </div>
      <div className="isolate flex flex-auto flex-col overflow-auto bg-white">
        <div className="flex  flex-none flex-col ">
          <div className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 ">
            {/* Calendar labels small screen */}
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 lg:hidden">
              <button type="button" className="flex flex-col items-center pb-3 pt-2">
                P <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">22</span>
              </button>
              <button type="button" className="flex flex-col items-center pb-3 pt-2">
                U <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">23</span>
              </button>
              <button type="button" className="flex flex-col items-center pb-3 pt-2">
                S
                <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                  24
                </span>
              </button>
              <button type="button" className="flex flex-col items-center pb-3 pt-2">
                Č <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">25</span>
              </button>
              <button type="button" className="flex flex-col items-center pb-3 pt-2">
                P <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">26</span>
              </button>
              <button type="button" className="flex flex-col items-center pb-3 pt-2">
                S <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">27</span>
              </button>
              <button type="button" className="flex flex-col items-center pb-3 pt-2">
                N <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">28</span>
              </button>
            </div>

            {/* Calendar labels large screen */}
            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border border-r border-gray-100 text-sm leading-6 text-gray-500 lg:grid">
              <div className="col-end-1 w-14" />
              <div className="flex items-center justify-center py-3">
                <span>
                  Pon <span className="items-center justify-center font-semibold text-gray-900">22</span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span className="flex items-baseline">
                  Uto
                  <span className="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                    23
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span className="flex items-baseline">
                  Sri
                  <span className="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                    24
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Čet <span className="items-center justify-center font-semibold text-gray-900">25</span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Pet <span className="items-center justify-center font-semibold text-gray-900">26</span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Sub <span className="items-center justify-center font-semibold text-gray-900">27</span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Ned <span className="items-center justify-center font-semibold text-gray-900">28</span>
                </span>
              </div>
              <div className="col-start-8 w-8" />
            </div>
          </div>

          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className=" grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: 'repeat(20, minmax(3.5rem, 1fr))' }}
              >
                <div className="row-end-1 h-7" />
                <div ref={rowHeightRef}>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    13:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    14:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    15:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    16:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    17:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    18:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    19:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    20:00
                  </div>
                </div>
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-1 grid-rows-1 divide-x divide-gray-100 lg:grid lg:grid-cols-7">
                <div className="col-start-1 row-span-full" ref={columnWidthRef} />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="col-start-8 row-span-full w-8" />
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 row-end-2 grid h-full w-full grid-cols-1 lg:grid-cols-7 "
                style={{ gridTemplateRows: '1.75rem repeat(120, minmax(0, 1fr)) auto' }}
              >
                <Draggable
                  axis={isWeekCalendar ? 'both' : 'y'}
                  grid={isWeekCalendar ? [columnWidth, rowHeight / 6] : undefined}
                  position={draggablePosition}
                  onStop={handleDragStop}
                  bounds={{
                    left: 0,
                    right: 6 * columnWidth,
                    top: 0,
                    bottom: 18 * (rowHeight + 1), // + 1 because of border
                  }}
                >
                  <li className="relative flex " style={{ gridRow: '2 / span 12' }}>
                    <div className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100">
                      <p className="order-1 font-semibold text-blue-700">TMNT prva forma</p>
                      <p className="text-blue-500 group-hover:text-blue-700">6:00 AM</p>
                    </div>
                  </li>
                </Draggable>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
