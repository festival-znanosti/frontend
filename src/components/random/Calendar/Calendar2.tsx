import { ChevronLeft, ChevronRight } from 'lucide-react'
import { RefObject, useEffect, useState } from 'react'
import Draggable, { DraggableEvent } from 'react-draggable'
import { DraggableData } from 'react-draggable'

import useElementSize from '@/lib/useElementSize'
import { useMediaQuery } from '@/lib/useMediaQuery'
import { cn } from '@/lib/utils'

interface CalendarRef extends RefObject<HTMLOListElement> {
  current: HTMLOListElement | null
}

export default function Calendar() {
  const isWeekCalendar = useMediaQuery('(min-width: 1024px)')

  const rowHeight = 56
  const fiveMinHeight = rowHeight / 6
  const rowOffsetHeight = 28
  const rowOffsetPosition = 2

  const { width: calendarWidth, elementRef: calendarRef } = useElementSize() as {
    height: number
    width: number
    elementRef: CalendarRef
  }
  const roundNumber = (num: number) => {
    return parseFloat(num.toFixed(1))
  }

  const calendarColumnWidth = isWeekCalendar ? roundNumber((calendarWidth - 32) / 7) : roundNumber(calendarWidth)

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    currentColumn: 1,
    currentRow: rowOffsetPosition,
    startTime: new Date(Date.UTC(2024, 3, 22, 10, 0, 0)),
  })

  function calculateTime(currentRow: number, currentColumn: number): Date {
    return new Date(
      Date.UTC(2024, 3, 22 + currentColumn - 1, 10 + Math.floor((currentRow - 2) / 12), ((currentRow - 2) % 12) * 5, 0)
    )
  }

  const handleDragStop = (_e: DraggableEvent, data: DraggableData) => {
    const { x, y } = data

    const currentColumn = Math.round(roundNumber(x) / roundNumber(calendarColumnWidth)) + 1
    const currentRow = Math.floor(roundNumber(y) / roundNumber(fiveMinHeight)) + rowOffsetPosition

    const startTime = calculateTime(currentRow, currentColumn)
    setPosition({ x, y, currentColumn, currentRow, startTime })
  }

  useEffect(() => {
    const handleResize = () => {
      const newX = !isWeekCalendar ? 0 : (position.currentColumn - 1) * roundNumber(calendarColumnWidth)
      setPosition((positionBefore) => {
        return { ...positionBefore, x: newX }
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [calendarWidth])

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
          // onClick={addNewEvent}
          className="ml-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Dodaj termin
        </button>
      </div>
      <div className="isolate flex flex-auto flex-col overflow-auto bg-white">
        <div className="flex  flex-none flex-col overflow-clip">
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
              <div className="col-end-1 w-[55px]" />
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
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: `repeat(20, minmax(${rowHeight}px, 1fr))` }}
              >
                <div className="row-end-1 h-7" />
                <div>
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
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 lg:grid lg:grid-cols-7">
                <div className="col-start-1 row-span-full" />
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
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 lg:grid-cols-7 lg:pr-8"
                style={{ gridTemplateRows: `${rowOffsetHeight}px repeat(120, minmax(0, 1fr)) auto` }}
                ref={calendarRef}
              >
                <Draggable
                  axis={isWeekCalendar ? 'both' : 'y'}
                  grid={isWeekCalendar ? [roundNumber(calendarColumnWidth), roundNumber(fiveMinHeight)] : undefined}
                  position={position}
                  onStop={handleDragStop}
                  bounds={{
                    left: 0,
                    right: 5 * roundNumber(calendarColumnWidth),
                    top: 0,
                    bottom: 18 * rowHeight,
                  }}
                >
                  <li
                    className={cn('relative z-10 col-start-1 mt-px flex active:z-20')}
                    style={{ gridRow: '2 / span 12' }}
                  >
                    <div className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100">
                      <p className="order-1 font-semibold text-blue-700">Breakfast</p>
                      <p className="text-blue-500 group-hover:text-blue-700">
                        <time dateTime="2022-01-12T06:00">{position.startTime.toUTCString()}</time>
                      </p>
                    </div>
                  </li>
                </Draggable>

                <li className="relative z-10 mt-px flex lg:col-start-3" style={{ gridRow: '14 / span 30' }}>
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
                  >
                    <p className="order-1 font-semibold text-pink-700">Flight to Paris</p>
                    <p className="text-pink-500 group-hover:text-pink-700">
                      <time dateTime="2022-01-12T07:30">7:30 AM</time>
                    </p>
                  </a>
                </li>
                <li className="relative mt-px flex lg:col-start-6" style={{ gridRow: '110 / span 12' }}>
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200"
                  >
                    <p className="order-1 font-semibold text-gray-700">Meeting with design team at Disney</p>
                    <p className="text-gray-500 group-hover:text-gray-700">
                      <time dateTime="2022-01-15T10:00">10:00 AM</time>
                    </p>
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
