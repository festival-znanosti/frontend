export interface RegisterBody {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export interface LoginBody {
  email: string
  password: string
}

export interface RegisterResponse {
  message: string
}

export interface LoginResponse {
  message: string
  token: string
}

export type SelfResponse = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: number
}

type Location = {
  id: number
  name: string
  parentLocationId: number | null
  parentLocationName: string | null
}

export type AllLocationsResponse = Array<Location>

export interface CreateLocationResponse {
  message: string
}
