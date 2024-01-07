import { getJson, postJson } from './api'
import * as I from './interface'
import * as R from './routes'

// Auth
export const register = (body: I.RegisterBody) => postJson<I.MessageResponse>(R.REGISTER_ROUTE(), body)
export const login = (body: I.LoginBody) => postJson<I.MessageResponse>(R.LOGIN_ROUTE(), body)
export const getAccountDetails = () => getJson<I.SelfResponse>(R.SELF_ROUTE())
export const changePassword = (body: I.ChangePasswordBody, id: number) =>
  postJson<I.MessageResponse>(R.CHANGE_PASSWORD_ROUTE(id), body)
export const logout = () => postJson<I.MessageResponse>(R.LOGOUT_ROUTE(), {})

// Locations
export const getAllParentLocations = () => getJson<I.AllLocationsResponse>(R.GET_ALL_PARENT_LOCATIONS_ROUTE())
export const getAllChildLocations = (parentId: number) =>
  getJson<I.AllLocationsResponse>(R.GET_ALL_CHILD_LOCATIONS_ROUTE(parentId))
export const createParentLocation = (locationName: string) =>
  postJson<I.CreateLocationResponse>(R.CREATE_PARENT_LOCATION_ROUTE(locationName), {})
export const createChildLocation = (locationName: string, parentLocationId: number) =>
  postJson<I.CreateLocationResponse>(R.CREATE_CHILD_LOCATION_ROUTE(locationName, parentLocationId), {})
