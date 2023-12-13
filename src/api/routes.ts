const BASE_URL = 'https://4ivliy722g3exbyg.myfritz.net:7282' as const

// Auth
export const AUTH_BASE_URL = `${BASE_URL}/Auth` as const

export const REGISTER_ROUTE = () => `${AUTH_BASE_URL}/Register` as const
export const LOGIN_ROUTE = () => `${AUTH_BASE_URL}/Login` as const
export const LOGOUT_ROUTE = () => `${AUTH_BASE_URL}/Logout` as const
export const SELF_ROUTE = () => `${BASE_URL}/Account/Details` as const

// Events
// export const EVENTS_BASE_URL = `${BASE_URL}/Events` as const

// export const CREATE_EVENT_ROUTE = () => `${EVENTS_BASE_URL}/Create` as const
// export const DELETE_EVENT_ROUTE = (eventID: number) => `${EVENTS_BASE_URL}/DeleteEvent/${eventID}` as const
// export const GET_ALL_EVENTS_ROUTE = () => `${EVENTS_BASE_URL}/GetAllEvents` as const
// export const GET_SUBMITTERS_EVENTS_ROUTE = () => `${EVENTS_BASE_URL}/GetSubmittersEvents` as const
// export const UPDATE_EVENT_ROUTE = (eventID: number) => `${EVENTS_BASE_URL}/UpdateEvent/${eventID}` as const

// // Festival year
// export const FESTIVAL_YEAR_BASE_URL = `${BASE_URL}/FestivalYear` as const

// export const GET_FESTIVAL_YEAR_ROUTE = () => `${FESTIVAL_YEAR_BASE_URL}/FestivalYear` as const
// export const GET_ALL_FESTIVAL_YEARS_ROUTE = () => `${FESTIVAL_YEAR_BASE_URL}/FestivalYears` as const
// export const CREATE_FESTIVAL_YEAR_ROUTE = () => `${FESTIVAL_YEAR_BASE_URL}/Create` as const

// // Files
// export const FILES_BASE_URL = `${BASE_URL}/Files` as const

// export const EVENT_SUMMARY_ROUTE = () => `${FILES_BASE_URL}/EventSummary` as const
// export const FESTIVAL_TABLE_ROUTE = () => `${FILES_BASE_URL}/FestivalTable` as const

// // Location
// export const LOCATION_BASE_URL = `${BASE_URL}/api/Location` as const

// export const GET_PARENT_LOCATIONS_ROUTE = () => `${LOCATION_BASE_URL}/ParentLocations` as const
// export const GET_CHILD_LOCATIONS_ROUTE = (parentLocationID: number) =>
//   `${LOCATION_BASE_URL}/ChildLocations?${parentLocationID}` as const
// export const CREATE_PARENT_LOCATION_ROUTE = () => `${LOCATION_BASE_URL}/Parent/Create` as const
// export const CREATE_CHILD_LOCATION_ROUTE = () => `${LOCATION_BASE_URL}/Child/Create` as const
// export const MERGE_LOCATION_ROUTE = (newLocationID: number) => `${LOCATION_BASE_URL}/Merge?${newLocationID}` as const
// export const CHANGE_LOCATION_ROUTE = (locationID: number) => `${LOCATION_BASE_URL}/${locationID}` as const

// // Time slots

// export const TIME_SLOTS_BASE_URL = `${BASE_URL}/TimeSlots`
// export const GET_AVAILABLE_TIME_SLOTS_ROUTE = () => `${TIME_SLOTS_BASE_URL}/GetAvailableTimeSlots`
// export const CHANGE_TIME_SLOT_ROUTE = (timeSlotID: number) => `${TIME_SLOTS_BASE_URL}/${timeSlotID}`
