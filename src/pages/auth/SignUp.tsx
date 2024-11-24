import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { authenticate } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { FirebaseError } from 'firebase/app';
import type { SignUpFormInputs } from '../../types/auth';
import './SignUp.scss';
import Button from '../../components/core/Button';

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (data: SignUpFormInputs) => {
    const { email, password, passwordConfirmation } = data;

    if (password !== passwordConfirmation) {
      setError('Passwords do not match!');
      return;
    }

    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
      dispatch(authenticate());
      navigate('/'); 
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already in use. Please try another.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email. Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setError('Weak password. Password must be at least 6 characters.');
          break;
        default:
          setError('An error occurred. Please try again later.');
        }
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="signUpForm">
      <form className="signUpForm__container" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="signUpForm__title">Sign Up</h2>
        <label className="signUpForm__label">Email</label>
        <input
          type="email"
          className={`signUpForm__input ${errors.email ? 'signUpForm__input--error' : ''}`}
          placeholder="Enter your email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email',
            },
          })}
        />
        {errors.email && <p className="errorMessage">{errors.email.message}</p>}

        <label className="signUpForm__label">Password</label>
        <input
          type="password"
          className={`signUpForm__input ${errors.password ? 'signUpForm__input--error' : ''}`}
          placeholder="Enter your password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        {errors.password && <p className="errorMessage">{errors.password.message}</p>}

        <label className="signUpForm__label">Confirm Password</label>
        <input
          type="password"
          className={`signUpForm__input ${
            errors.passwordConfirmation ? 'signUpForm__input--error' : ''
          }`}
          placeholder="Confirm your password"
          {...register('passwordConfirmation', {
            required: 'Password confirmation is required',
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          })}
        />
        {errors.passwordConfirmation && (
          <p className="errorMessage">{errors.passwordConfirmation.message}</p>
        )}
        {error && <p className="errorMessage">{error}</p>}

        <Button type='submit'>Sign Up</Button>

        <Link to="/sign-in">Sign in</Link>
      </form>
    </div>
  );
};

export default SignUpForm;