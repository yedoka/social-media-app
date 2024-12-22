import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FirebaseError } from 'firebase/app';
import { useCookies } from 'react-cookie';
import { signIn } from '@/services/api/auth';
import { auth } from '@/services/api/config';
import { logIn } from '@/store/slices/auth';
import Button from '@/components/ui/Button';
import type { SignInFormInputs } from '@/types/auth';
import './SignInForm.scss';

const SignInForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormInputs>();
  const [error, setError] = useState<string>("");
  const [, setCookie] = useCookies(['authToken']);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    try {
      await signIn(data.email, data.password);
      const idToken = await auth.currentUser?.getIdToken();
      if (idToken) {
        setCookie('authToken', idToken, { path: '/', maxAge: 3600 })
        dispatch(logIn());
        navigate('/');
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/invalid-credential') {
          setError('Email or password is incorrect');          
        } else {
          setError('Error');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <form className="signInForm__container" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="signInForm__title">Sign In</h2>

      <label className="signInForm__label">Email</label>
      <input
        type="email"
        className={`signInForm__input ${
          errors.email ? "signInForm__input--error" : ""
        }`}
        placeholder="Enter your email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && (
        <span className="signInForm__error">{errors.email.message}</span>
      )}

      <label className="signInForm__label">Password</label>
      <input
        type="password"
        className={`signInForm__input ${
          errors.password ? "signInForm__input--error" : ""
        }`}
        placeholder="Enter your password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && (
        <span className="signInForm__error">{errors.password.message}</span>
      )}
      {error && <p className="signInForm__error">{error}</p>}
      <Button type="submit">Sign In</Button>

      <Link to="/sign-up" className="signInForm__container__link">
        Don&apos;t have an account?
      </Link>
    </form>
  );
};

export default SignInForm;
