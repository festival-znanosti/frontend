const BASE_URL = 'https://festivalznanostiapi20231221212245.azurewebsites.net' as const

// Auth
export const AUTH_BASE_URL = `${BASE_URL}/Auth` as const

export const REGISTER_ROUTE = () => `${AUTH_BASE_URL}/Register` as const
export const LOGIN_ROUTE = () => `${AUTH_BASE_URL}/Login` as const

// Account
export const ACCOUNT_BASE_URL = `${BASE_URL}/Account` as const

export const SELF_ROUTE = () => `${ACCOUNT_BASE_URL}/Details` as const
export const CHANGE_PASSWORD_ROUTE = (id: number) => `${ACCOUNT_BASE_URL}/ChangePassword/${id}` as const
export const LOGOUT_ROUTE = () => `${AUTH_BASE_URL}/Logout` as const

// Location
const LOCATION_BASE_URL = `${BASE_URL}/api/Location` as const

export const GET_ALL_PARENT_LOCATIONS_ROUTE = () => `${LOCATION_BASE_URL}/ParentLocations` as const
export const GET_ALL_CHILD_LOCATIONS_ROUTE = (parentId: number) =>
  `${LOCATION_BASE_URL}/ChildLocations?parentLocationId=${parentId}` as const
export const CREATE_PARENT_LOCATION_ROUTE = (locationName: string) =>
  `${LOCATION_BASE_URL}/Parent/Create?locationName=${locationName}` as const
export const CREATE_CHILD_LOCATION_ROUTE = (locationName: string, parentLocationId: number) =>
  `${LOCATION_BASE_URL}/Child/Create?locationName=${locationName}&parentId=${parentLocationId}` as const
export const GET_LOCATION_DETAILS_ROUTE = (locationId: number) =>
  `${LOCATION_BASE_URL}/Details?locationId=${locationId}` as const

//  Time slots
const TIME_SLOTS_BASE_URL = `${BASE_URL}/TimeSlots` as const
export const GET_AVAILABLE_TIME_SLOTS_ROUTE = (locationId: number) =>
  `${TIME_SLOTS_BASE_URL}/GetAvailableTimeSlots?locationId=${locationId}` as const
