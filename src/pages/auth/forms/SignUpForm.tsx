import React, { useState, FormEvent } from 'react';
import authService from '../../../services/auth'; 
import type { Credentials } from '../../../types/Credentials';
import './SignUpForm.scss';

const SignUpForm: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); 

    if (password !== passwordConfirmation) {
      setError("Passwords do not match!");
      return;
    }

    const credentials: Credentials = { email, password, passwordConfirmation }; 

    try {
      const response = await authService.signUp(credentials); 
      setMessage(response.message); 
      setError(null); 
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

        <button type="submit" className="signUpForm__button">
          Sign Up
        </button>

        {/* Display success or error messages */}
        {message && <p className="signUpForm__success">{message}</p>}
        {error && <p className="signUpForm__error">{error}</p>}
      </form>
    </div>
  );
};

export default SignUpForm;
