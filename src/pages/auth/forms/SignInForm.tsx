import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logIn } from '../../../store/slices/profileSlice';
import { useCookies } from 'react-cookie';
import authService from '../../../services/auth'; 
import './SignInForm.scss';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [, setCookie] = useCookies(['accessToken']);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await authService.signIn(email, password);
      
      const { auth, user } = response;

      setCookie('accessToken', auth.access, {
        path: '/', 
        maxAge: 3600 * 24, 
        secure: true, 
        sameSite: 'strict', 
      });
  
      dispatch(logIn({
        token: auth.access,
        userDetails: {
          email: user.email,
          name: user.name,
          surname: user.surname,
          profileImg: user.profileImg,
          username: user.username,
        },
      }));
  
      setError(null);
      navigate('/'); 
    } catch (err) {
      const errorMessage = (err as { message: string }).message;
      setError(errorMessage);
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
        {error && <p className="signInForm__error">{error}</p>}

        <button type="submit" className="signInForm__button">
          Sign In
        </button>

        <Link to='/sign-up'>Don't have an account?</Link>
      </form>
    </div>
  );
};

export default SignInForm;
