const generateDateRange = (startDate: Date, endDate: Date): Array<Date> => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const dates = []
  const currentDate = startDate

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

const start = new Date(2024, 3, 22) // Start date (22.4.2024)
const end = new Date(2024, 3, 28) // End date (28.4.2024)

export const festivalZnanostiDates = generateDateRange(start, end)

// export const fullDates = festivalZnanostiDates.map((date) => {
//   return date.toLocaleString('hr-hr', {
//     timeZone: 'Europe/Zagreb',
//     year: 'numeric',
//     month: 'numeric',
//     day: 'numeric',
//   })
// })

export const dates = festivalZnanostiDates.map((date) => {
  const dayNames = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned']
  const dayShort = dayNames[date.getDay()].charAt(0)
  const day = dayNames[date.getDay()]
  const dayNum = date.getDate()
  return { date, dateNumber: dayNum, dayLong: day, dayShort }
})
