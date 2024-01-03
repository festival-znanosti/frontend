import { getJson, postJson } from './api'
import * as I from './interface'
import * as R from './routes'

export const register = (body: I.RegisterBody) => postJson<I.RegisterResponse>(R.REGISTER_ROUTE(), body)
export const login = (body: I.LoginBody) => postJson<I.LoginResponse>(R.LOGIN_ROUTE(), body)

// nije istestirano
export const logout = () => getJson(R.LOGOUT_ROUTE())
export const auth = () => getJson<I.SelfResponse>(R.SELF_ROUTE(), {})

export const getAllParentLocations = () => getJson<I.GetAllParentLocationsResponse>(R.GET_ALL_PARENT_LOCATIONS_ROUTE())
