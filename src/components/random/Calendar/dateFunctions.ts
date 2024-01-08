export const rowHeight = 56
export const fiveMinHeight = rowHeight / 6
export const rowOffsetHeight = 28
export const rowOffsetPosition = 2

export const DATES_OF_FESTIVAL = [
  new Date(Date.UTC(2024, 3, 22)),
  new Date(Date.UTC(2024, 3, 23)),
  new Date(Date.UTC(2024, 3, 24)),
  new Date(Date.UTC(2024, 3, 25)),
  new Date(Date.UTC(2024, 3, 26)),
  new Date(Date.UTC(2024, 3, 27)),
  new Date(Date.UTC(2024, 3, 28)),
] as const

export const daysCroatian = ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota']

export const getDayFirstLetterCroatian = (date: Date) => {
  const dayIndex = date.getUTCDay()
  return daysCroatian[dayIndex][0].toUpperCase()
}

export const getDayNumber = (date: Date) => {
  return date.getUTCDate()
}

export const getDayFirstThreeLettersCroatian = (date: Date) => {
  const dayIndex = date.getUTCDay()
  return daysCroatian[dayIndex].slice(0, 3)
}

export const getNextDay = (date: Date) => {
  const nextDay = new Date(date)
  nextDay.setUTCDate(date.getUTCDate() + 1)

  if (DATES_OF_FESTIVAL[DATES_OF_FESTIVAL.length - 1].getTime() <= nextDay.getTime()) {
    return
  }

  return nextDay
}

export const getPreviousDay = (date: Date) => {
  const previousDay = new Date(date)
  previousDay.setUTCDate(date.getUTCDate() - 1)

  if (DATES_OF_FESTIVAL[0].getTime() > previousDay.getTime()) {
    return
  }

  return previousDay
}

export const returnOrdinalNumberOfDate = (date: Date) => {
  date.setUTCHours(0, 0, 0, 0)
  return DATES_OF_FESTIVAL.findIndex((d) => d.getTime() === date.getTime()) + 1
}

export const returnStartRowIndexOfDate = (date: Date) => {
  // TODO: izbrisi + 2 ako matej doda Z
  const hours = date.getUTCHours() - 10 + 2
  const minutes = date.getUTCMinutes()
  return (hours * 60 + minutes) / 5 + 2
}

export const formatTimeCroatian = (dateStart: Date, dateEnd: Date) => {
  if (!(dateStart instanceof Date)) {
    dateStart = new Date(dateStart)
  }

  const hoursStart = dateStart.getHours().toString().padStart(2, '0')
  const minutesStart = dateStart.getMinutes().toString().padStart(2, '0')

  const hoursEnd = dateEnd.getHours().toString().padStart(2, '0')
  const minutesEnd = dateEnd.getMinutes().toString().padStart(2, '0')

  // Format as "HH:mm-HH:mm"
  return `${hoursStart}:${minutesStart}-${hoursEnd}:${minutesEnd}`
}

export const getRowSpanDependingOnLocationId = (locationId: number) => {
  if (locationId === 2 || locationId === 4) {
    return 6 // 30 min
  }

  if (locationId === 3) {
    return 9 // 45 min
  }

  return 12 // 60 min
}

export const getEndTime = (date: Date, locationId: number) => {
  const hours = date.getHours()
  const minutes = date.getMinutes()

  if (locationId === 2 || locationId === 4) {
    return new Date(date.setMinutes(minutes + 30))
  }

  if (locationId === 3) {
    return new Date(date.setMinutes(minutes + 45))
  }

  return new Date(date.setHours(hours + 1))
}

export const getStepHeightFromLocationId = (px: number, locationId: number) => {
  if (locationId === 2 || locationId === 4) {
    return px * 6
  }

  if (locationId === 3) {
    return px * 9
  }

  return px * 12
}
