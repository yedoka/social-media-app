import React, { useState, FormEvent } from 'react';
import authService from '../../../services/auth'; 
import './SignUp.scss';
import { Link, useNavigate } from 'react-router-dom';

const SignUpForm: React.FC = () => {

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); 

    if (password !== passwordConfirmation) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await authService.signUp(); 
      setMessage(response.message); 
      setError(null); 
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); 
      } else {
        setError('An unknown error occurred'); 
      }
      setMessage(null); 
    }
  };

  return (
    <div className="signUpForm">
      <form className="signUpForm__container" onSubmit={handleSubmit}>
        <h2 className="signUpForm__title">Sign Up</h2>

        <label className='signUpForm__label'>Name</label>
        <input 
          type='text'
          name='Name'
          className='signUpForm__input'
          placeholder='Name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className='signUpForm__label'>Username</label>
        <input 
          type='text'
          name='Username'
          className='signUpForm__input'
          placeholder='Username'
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="signUpForm__label">Email</label>
        <input
          type="email"
          name="email"
          className="signUpForm__input"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="signUpForm__label">Password</label>
        <input
          type="password"
          name="password"
          className="signUpForm__input"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="signUpForm__label">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="signUpForm__input"
          placeholder="Confirm your password"
          required
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        {error && <p className='errorMessage'>{error}</p>}

        <button type="submit" className="signUpForm__button">
          Sign Up
        </button>
        {message && <p className='successMessage'>{message}</p>}
        <Link to='/sign-in'>Sign in</Link>
      </form>
    </div>
  );
};

export default SignUpForm;
