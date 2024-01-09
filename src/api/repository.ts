import { getJson, postJson, putJson } from './api'
import * as I from './interface'
import * as R from './routes'

import { EventFormSchemaType } from '@/app/(required-auth)/new-form/page'

// Auth
export const register = (body: I.RegisterBody) => postJson<I.MessageResponse>(R.REGISTER_ROUTE(), body)
export const login = (body: I.LoginBody) => postJson<I.MessageResponse>(R.LOGIN_ROUTE(), body)
export const getAccountDetails = () => getJson<I.SelfResponse>(R.SELF_ROUTE())
export const changePassword = (body: I.ChangePasswordBody, id: number) =>
  putJson<I.MessageResponse>(R.CHANGE_PASSWORD_ROUTE(id), body)
export const logout = () => postJson<I.MessageResponse>(R.LOGOUT_ROUTE(), {})

// Locations
export const getAllParentLocations = () => getJson<I.AllLocationsResponse>(R.GET_ALL_PARENT_LOCATIONS_ROUTE())
export const getAllChildLocations = (parentId: number) =>
  getJson<I.AllLocationsResponse>(R.GET_ALL_CHILD_LOCATIONS_ROUTE(parentId))
export const createParentLocation = (locationName: string) =>
  postJson<I.MessageResponse>(R.CREATE_PARENT_LOCATION_ROUTE(locationName), {})
export const createChildLocation = (locationName: string, parentLocationId: number) =>
  postJson<I.MessageResponse>(R.CREATE_CHILD_LOCATION_ROUTE(locationName, parentLocationId), {})
export const getLocationDetails = (locationId: number) => getJson<I.Location>(R.GET_LOCATION_DETAILS_ROUTE(locationId))

// Time slots
export const getAvailableTimeSlots = (locationId: number) =>
  getJson<I.AvailableTimeSlotsResponse>(R.GET_AVAILABLE_TIME_SLOTS_ROUTE(locationId))

// Events
export const createEvent = (body: EventFormSchemaType) => postJson<I.MessageResponse>(R.CREATE_EVENT_ROUTE(), body)
export const getMyEvents = (submitterId: number) => getJson<I.MyEventsResponse>(R.GET_MY_EVENTS_ROUTE(submitterId))
