import backend from './data.json'
import type { Credentials } from '../types/Credentials'

const signIn = (username: string, password: string) => {
  // mock data as it would be request to backend
  const {auth} = backend
  if(auth.username === username && auth.password === password) {
    return Promise.resolve({access: auth.access})
  } else {
    return Promise.reject({message: auth.error})
  }
}

const signUp = (credentials: Credentials) => {
  // request to backend
  return Promise.resolve({message: 'User successfully created!'})
}

export default {
  signIn,
  signUp
}