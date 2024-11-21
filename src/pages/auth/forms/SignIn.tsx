import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/firebase';
import './SignIn.scss';


type FormValues = {
  email: string;
  password: string;
};

const SignInForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/');
    } catch (err) {
      console.error(err);
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

        <button type="submit" className="signInForm__button">
          Sign In
        </button>

        <Link to="/sign-up">Don't have an account?</Link>
      </form>
    </div>
  );
};

export default SignInForm;
