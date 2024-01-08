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

export const formatTimeCroatian = (date: Date) => {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }

  const hoursStart = date.getHours().toString().padStart(2, '0')
  const minutesStart = date.getMinutes().toString().padStart(2, '0')

  const hoursEnd = (date.getHours() + 1).toString().padStart(2, '0')
  const minutesEnd = date.getMinutes().toString().padStart(2, '0')

  // Format as "HH:mm-HH:mm"
  return `${hoursStart}:${minutesStart}-${hoursEnd}:${minutesEnd}`
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
