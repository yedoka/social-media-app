import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { authenticate } from '../../store/slices/auth';
import { useDispatch } from 'react-redux';
import { FirebaseError } from 'firebase/app';
import type { SignInFormInputs } from '../../types/auth';
import Button from '../../components/core/Button';
import './SignIn.scss';
import { useCookies } from 'react-cookie';

const SignInForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormInputs>();
  const [error, setError] = useState<string>("");
  const [, setCookie] = useCookies(['authToken']);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      const idToken = await auth.currentUser?.getIdToken();
      if (idToken) {
        setCookie('authToken', idToken, { path: '/', maxAge: 3600 })
        dispatch(authenticate());
        navigate('/');
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/invalid-credential') {
          setError('Email or password is incorrect');
          console.log(err.code);
          
        } else {
          setError('Error');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="signInForm">
      <form className="signInForm__container" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="signInForm__title">Sign In</h2>

        <label className="signInForm__label">Email</label>
        <input
          type="email"
          className={`signInForm__input ${errors.email ? 'signInForm__input--error' : ''}`}
          placeholder="Enter your email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <span className="signInForm__error">{errors.email.message}</span>}

        <label className="signInForm__label">Password</label>
        <input
          type="password"
          className={`signInForm__input ${errors.password ? 'signInForm__input--error' : ''}`}
          placeholder="Enter your password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <span className="signInForm__error">{errors.password.message}</span>}
        {error && <p className="signInForm__error">{error}</p>}
        <Button type='submit'>Sign In</Button>

        <Link to="/sign-up" className='signInForm__container__link'>Don't have an account?</Link>
      </form>
    </div>
  );
};

export default SignInForm;
