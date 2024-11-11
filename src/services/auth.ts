import backend from './data.json'

const signIn = (email: string, password: string) => {
  // mock data as it would be request to backend
  const {auth} = backend
  if(auth.email === email && auth.password === password) {
    return Promise.resolve({access: auth.access})
  } else {
    return Promise.reject({message: auth.error})
  }
}

const signUp = () => {
  // request to backend
  return Promise.resolve({message: 'User successfully created!'})
}

export default {
  signIn,
  signUp
}