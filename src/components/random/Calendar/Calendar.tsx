import { time } from 'console'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { RefObject, useEffect, useState } from 'react'
import Draggable, { DraggableEvent } from 'react-draggable'
import { DraggableData } from 'react-draggable'

import {
  DATES_OF_FESTIVAL,
  fiveMinHeight,
  formatTimeCroatian,
  getDayFirstLetterCroatian,
  getDayFirstThreeLettersCroatian,
  getDayNumber,
  getEndTime,
  getNextDay,
  getPreviousDay,
  getRowSpanDependingOnLocationId,
  getStepHeightFromLocationId,
  returnOrdinalNumberOfDate,
  returnStartRowIndexOfDate,
  rowHeight,
  rowOffsetHeight,
  rowOffsetPosition,
} from './dateFunctions'
import { useAvailableTimeSlots } from './hooks'
import { useWizardContext } from '../Wizard/Wizard.context'

import { EventFormSchemaType } from '@/app/(required-auth)/new-form/page'
import { Button } from '@/components/ui/button'
import useElementSize from '@/lib/useElementSize'
import { useMediaQuery } from '@/lib/useMediaQuery'
import { cn } from '@/lib/utils'

interface CalendarRef extends RefObject<HTMLOListElement> {
  current: HTMLOListElement | null
}

type TimeSlotType = {
  id: number
  x: number
  y: number
  currentColumn: number
  currentRow: number
  start: Date
  end: Date
  rowSpan: number
}

export default function Calendar({ locationId }: { locationId: number }) {
  const isWeekCalendar = useMediaQuery('(min-width: 1024px)')

  const { width: calendarWidth, elementRef: calendarRef } = useElementSize() as {
    height: number
    width: number
    elementRef: CalendarRef
  }
  const roundNumber = (num: number) => {
    return parseFloat(num.toFixed(3))
  }

  const calendarColumnWidth = isWeekCalendar ? roundNumber((calendarWidth - 32) / 7) : roundNumber(calendarWidth)

  const [timeSlots, setTimeSlots] = useState<Array<TimeSlotType>>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.UTC(2024, 3, 22)))

  function calculateTime(currentRow: number, currentColumn: number): Date {
    return new Date(
      Date.UTC(2024, 3, 22 + currentColumn - 1, 10 + Math.floor((currentRow - 2) / 12), ((currentRow - 2) % 12) * 5, 0)
    )
  }

  const handleDragStop = (_e: DraggableEvent, data: DraggableData, id: number) => {
    const { x, y } = data

    const newColumn = Math.round(roundNumber(x) / roundNumber(calendarColumnWidth)) + 1
    const newRow = Math.round(roundNumber(y) / roundNumber(fiveMinHeight)) + rowOffsetPosition

    setTimeSlots((prev) => {
      return prev.map((timeSlot) => {
        if (timeSlot.id === id) {
          if (!isWeekCalendar) {
            return {
              ...timeSlot,
              y:
                Math.round(roundNumber(y) / getStepHeightFromLocationId(roundNumber(fiveMinHeight), locationId)) *
                getStepHeightFromLocationId(roundNumber(fiveMinHeight), locationId),
              currentRow: newRow,
              start: calculateTime(newRow, timeSlot.currentColumn),
              end: getEndTime(calculateTime(newRow, timeSlot.currentColumn), locationId),
            }
          }

          return {
            ...timeSlot,
            x,
            y,
            currentColumn: newColumn,
            currentRow: newRow,
            start: calculateTime(newRow, newColumn),
            end: getEndTime(calculateTime(newRow, newColumn), locationId),
          }
        }

        return timeSlot
      })
    })
  }

  useEffect(() => {
    const handleResize = () => {
      setTimeSlots((prev) => {
        return prev.map((timeSlot) => {
          const newX = !isWeekCalendar ? 0 : (timeSlot.currentColumn - 1) * roundNumber(calendarColumnWidth)
          return { ...timeSlot, x: newX }
        })
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [calendarWidth])

  const addTimeSlot = () => {
    setTimeSlots((prev) => [
      ...prev,
      {
        id: timeSlots.length + 1,
        x: 0,
        y: 0,
        currentColumn: 1,
        currentRow: rowOffsetPosition,
        start: new Date(Date.UTC(2024, 3, 22, 10, 0, 0)),
        end: getEndTime(new Date(Date.UTC(2024, 3, 22, 10, 0, 0)), locationId),
        rowSpan: getRowSpanDependingOnLocationId(locationId),
      },
    ])
  }

  const { availableTimeSlots, isPendingAvailableTimeSlots } = useAvailableTimeSlots(locationId)

  const { form } = useWizardContext<EventFormSchemaType>()

  useEffect(() => {
    const timeSlotsForForm = timeSlots.map((timeSlot) => {
      return {
        id:
          availableTimeSlots!.find(
            (availableTimeSlot) =>
              // TODO: fix kad matej doda Z
              new Date(
                Date.UTC(
                  // @ts-ignore
                  availableTimeSlot.start.slice(0, 4),
                  // @ts-ignore
                  availableTimeSlot.start.slice(5, 7) - 1,
                  availableTimeSlot.start.slice(8, 10),
                  availableTimeSlot.start.slice(11, 13),
                  availableTimeSlot.start.slice(14, 16),
                  availableTimeSlot.start.slice(17, 19)
                )
              ).getTime() === timeSlot.start.getTime()
          )?.id ?? timeSlot.id,
        start: timeSlot.start.toISOString(),
      }
    })
    form.setValue('timeSlots', timeSlotsForForm)
  }, [timeSlots])

  return (
    <div className="flex h-auto w-full flex-col">
      {/** Buttons above calendar */}
      <div className="flex flex-none items-center justify-end border-b border-gray-200 px-6 py-4">
        <div className="relative flex items-center rounded-md bg-white shadow-sm lg:hidden">
          <Button
            type="button"
            className="w-16 rounded-r-none pl-2 pr-6"
            onClick={() => {
              const previousDay = getPreviousDay(selectedDate)
              if (!previousDay) return
              setSelectedDate(previousDay)
            }}
          >
            <span className="sr-only">Dan prije</span>
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button
            type="button"
            className="w-16 rounded-l-none pl-6 pr-2"
            onClick={() => {
              const nextDay = getNextDay(selectedDate)
              if (!nextDay) return
              setSelectedDate(nextDay)
            }}
          >
            <span className="sr-only">Dan poslije</span>
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>

        <Button type="button" onClick={addTimeSlot} className="ml-4">
          Dodaj termin
        </Button>
      </div>
      <div className="isolate flex flex-auto flex-col overflow-auto bg-white">
        <div className="flex  flex-none flex-col overflow-clip">
          <div className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 ">
            {/* Calendar labels small screen */}
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 lg:hidden">
              {DATES_OF_FESTIVAL.map((date) => {
                return (
                  <div className="flex flex-col items-center pb-2 pt-3" key={date.getDay()}>
                    {getDayFirstLetterCroatian(date)}
                    <span
                      className={cn(
                        'mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900',
                        selectedDate.getTime() === date.getTime() && 'rounded-full bg-red-600 text-white'
                      )}
                    >
                      {getDayNumber(date)}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Calendar labels large screen */}
            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border border-r border-gray-100 text-sm leading-6 text-gray-500 lg:grid">
              <div className="col-end-1 w-[55px]" />
              {DATES_OF_FESTIVAL.map((date) => {
                return (
                  <div className="flex items-center justify-center py-3" key={date.getDate()}>
                    <span className="flex items-baseline">
                      {getDayFirstThreeLettersCroatian(date)}
                      <span
                        className={cn(
                          'ml-1.5 flex h-8 w-8 items-center justify-center rounded-full  font-semibold text-black'
                        )}
                      >
                        {getDayNumber(date)}
                      </span>
                    </span>
                  </div>
                )
              })}

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
                {!isPendingAvailableTimeSlots &&
                  availableTimeSlots!.map((timeSlot) => {
                    return (
                      <li
                        key={timeSlot.id}
                        className={cn(
                          'relative z-10 col-start-1 mt-px flex active:z-20',
                          'lg:col-start-' + returnOrdinalNumberOfDate(new Date(timeSlot.start)).toString(),
                          returnOrdinalNumberOfDate(new Date(timeSlot.start)) !==
                            returnOrdinalNumberOfDate(selectedDate) && 'hidden lg:flex'
                        )}
                        style={{ gridRow: `${returnStartRowIndexOfDate(new Date(timeSlot.start))} / span 12` }}
                      >
                        <div
                          className={cn(
                            'group absolute inset-1 flex items-center justify-center overflow-y-auto rounded-lg bg-green-100 p-2 text-xs leading-5 '
                          )}
                        >
                          {/* <p className="order-1 text-green-800">Slobodno</p> */}
                        </div>
                      </li>
                    )
                  })}

                {timeSlots.map((timeSlot) => {
                  return (
                    <Draggable
                      key={timeSlot.id}
                      axis={isWeekCalendar ? 'both' : 'y'}
                      grid={
                        isWeekCalendar
                          ? [
                              roundNumber(calendarColumnWidth),
                              getStepHeightFromLocationId(roundNumber(fiveMinHeight), locationId),
                            ]
                          : undefined
                      }
                      position={{ x: timeSlot.x, y: timeSlot.y }}
                      onStop={(e, data) => handleDragStop(e, data, timeSlot.id)}
                      bounds={{
                        left: 0,
                        right: 5 * roundNumber(calendarColumnWidth),
                        top: 0,
                        bottom: 18 * rowHeight,
                      }}
                    >
                      <li
                        className={cn(
                          'relative z-10 col-start-1 mt-px flex active:z-20',
                          timeSlot.currentColumn !== returnOrdinalNumberOfDate(selectedDate) && 'hidden lg:flex'
                        )}
                        style={{ gridRow: `2 / span ${timeSlot.rowSpan}` }}
                      >
                        <div
                          className={cn(
                            'group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100',
                            locationId === 2 && 'pb-0 pt-1',
                            locationId === 4 && 'pb-0 pt-1'
                          )}
                        >
                          <p className="order-1 font-semibold text-blue-700">{'Termin ' + timeSlot.id}</p>
                          <p className="text-blue-500 group-hover:text-blue-700">
                            <time dateTime={timeSlot.start.toISOString()}>
                              {formatTimeCroatian(timeSlot.start, timeSlot.end)}
                            </time>
                          </p>
                        </div>
                      </li>
                    </Draggable>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
