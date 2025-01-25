import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { signIn } from '@/services/api/auth';
import { auth } from '@/services/api/config';
import { logIn } from '@/store/slices/auth';
import Button from '@/components/ui/button/Button';
import type { SignInFormInputs } from '@/types/auth';
import Input from '@/components/ui/input/Input';
import SignUpLink from '@/constants/SignUpLink';

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
      if (err) {
        setError("Invalid credentials.");    
      } else {
        setError("Unexpected error occurred.")
      }
    }
  };

  return (
    <form className ="flex flex-col w-72 shadow-md rounded-md p-8 bg-accent-bg border border-dark-border" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <label className="text-xs font-semibold mb-1">Email</label>
      <Input
        type="email"
        className='mb-4 py-2'
        placeholder="Enter your email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && (
        <span className="text-red-500">{errors.email.message}</span>
      )}

      <label className ="text-xs font-semibold mb-1">Password</label>
      <Input
        type="password"
        className='mb-4 py-2'
        placeholder="Enter your password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && (
        <span className="text-red-500">{errors.password.message}</span>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">Log In</Button>

      <SignUpLink className="text-xs underline mt-4">
        Don&apos;t have an account?
      </SignUpLink>
    </form>
  );
};

export default SignInForm;
