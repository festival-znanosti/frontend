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

export interface ChangePasswordBody {
  accountId: number
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}
export interface MessageResponse {
  message: string
}

export type SelfResponse = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: number
}

export type Location = {
  id: number
  name: string
  parentLocationId: number | null
  parentLocationName: string | null
}

export type AllLocationsResponse = Array<Location>

export type TimeSlot = {
  id: number
  start: string
}

export type AvailableTimeSlotsResponse = Array<TimeSlot>

export type Lecturer = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  type: 0 | 1
  resume: string
}

export type ParticipantAge = {
  id: number
  age: string
  label: string
}

export type Event = {
  id: number
  title: string
  status: number
  type: number
  visitorsCount: number
  equipment: string
  summary: string
  submitterEmail: string
  location: Location
  lecturers: Array<Lecturer>
  participantsAges: Array<ParticipantAge>
  timeSlots: Array<TimeSlot>
}

export type MyEventsResponse = Array<Event>
