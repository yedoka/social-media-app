import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { getToken, signIn } from "@/services/api/auth";
import { logIn } from "@/store/slices/auth";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import { signInSchema } from "@/utils/validation";

type FormValues = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const { register, handleSubmit, formState: { errors }} = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
    mode: "onSubmit"
  });

  const [error, setError] = useState<string>("");
  const [cookies, setCookie] = useCookies(["authToken"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    signInMutation.mutate(data);
  };
  
  const signInMutation = useMutation({
    mutationFn: (data: FormValues) => signIn(data.email, data.password),
    onSuccess: async () => {
      const token = await getToken();
      if (token) {
        setCookie("authToken", token, { path: "/", maxAge: 3600 });
        dispatch(logIn());
        navigate("/");
      }
    },
    onError: (error: Error) => {
      setError(error.message || 'Invalid credentials');
    }
  })
  
  useEffect(() => {
    if (cookies.authToken) {
      navigate("/");
    }
  }, [cookies.authToken, navigate]);
  
  return (
    <div className="w-96 shadow-md rounded-md p-6 bg-accent-bg border border-dark-border">
      <div className="pb-6 text-neutral-300">
        <h2 className="text-2xl font-semibold mb-2">Login</h2>
        <p className="text-xs">Enter your email below to login to your account</p>
      </div>
      <form
        noValidate
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-semibold">
          Email
          </label>
          <Input
            id="email"
            type="email"
            className="py-2"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email?.message}</p>}
        </div>

        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-semibold">
          Password
          </label>
          <Input
            id="password"
            type="password"
            className="py-2"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password?.message}</p>}
        </div>

        <Button type="submit" disabled={signInMutation.isPending}>{signInMutation.isPending ? 'Logging In...' : 'Log In'}</Button>
        {error && (
          <p className="text-red-500 text-xs">{error}</p>
        )}
      </form>
      <p className="text-xs mt-4 text-center">Don&apos;t have an account? <Link to="/auth/sign-up" className="underline">Sign up</Link></p>
    </div>
  );
};

export default SignInForm;