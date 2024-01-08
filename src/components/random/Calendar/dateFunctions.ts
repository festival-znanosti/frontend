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
  return DATES_OF_FESTIVAL.findIndex((d) => d.getTime() === date.getTime()) + 1
}
