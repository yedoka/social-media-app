import backend from './data.json'

const signIn = (email: string, password: string) => {
  const { auth, user } = backend;

  if (auth.email === email && auth.password === password) {
    return Promise.resolve({
      auth: { access: auth.access },
      user: user.currentUser, 
    });
  } else {
    return Promise.reject({ message: auth.error });
  }
};

const signUp = () => {
  return Promise.resolve({ message: 'User successfully created!' });
};

export default {
  signIn,
  signUp,
};
