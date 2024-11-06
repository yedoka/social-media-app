import React, { useState, FormEvent } from 'react';
import authService from '../../../services/auth';
import './SignInForm.scss';

const SignInForm: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); 

    try {
      const response = await authService.signIn(email, password); 
      console.log('Access Token:', response.access); 
      setError(null); 
    } catch (err) {
      setError((err as { message: string }).message); 
    }
  };

  return (
    <div className="signInForm">
      <form className="signInForm__container" onSubmit={handleSubmit}>
        <h2 className="signInForm__title">Sign In</h2>

        <label className="signInForm__label">Email</label>
        <input
          type="email"
          name="email"
          className="signInForm__input"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="signInForm__label">Password</label>
        <input
          type="password"
          name="password"
          className="signInForm__input"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="signInForm__button">
          Sign In
        </button>

        {error && <p className="signInForm__error">{error}</p>}
      </form>
    </div>
  );
};

export default SignInForm;
