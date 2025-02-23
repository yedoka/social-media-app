import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "@/store/slices/auth";
import Button from "@/components/ui/button/Button";
import { signUp } from "@/services/api/auth";
import Input from "@/components/ui/input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signUpSchema } from "@/utils/validation";

type FormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
  displayName: string;
};

const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      displayName: "",
    },
    resolver: zodResolver(signUpSchema),
    mode: 'onSubmit'
  });

  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: FormValues) => {
    signUpMutation.mutate(data);
  };

  const signUpMutation = useMutation({
    mutationFn: (data: FormValues) => signUp(data.email, data.password, data.displayName),
    onSuccess: async () => {
      dispatch(logIn());
      navigate("/auth/sign-in");
    },
    onError: (error: Error) => {
      setError(error.message || 'Error occurred')
    }

  }) 

  return (
    <div className="w-96 shadow-md rounded-md p-6 bg-accent-bg mx-auto border border-dark-border">
      <h2 className="text-xl font-semibold mb-6">Register</h2>
      <form noValidate
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-2">
          <label htmlFor="displayName" className="text-sm font-semibold">Display Name</label>
          <Input
            id="displayName"
            type="text"
            className="py-2"
            placeholder="Enter your display name"
            {...register("displayName")}
          />
          {errors.displayName && <p className="text-red-500 text-xs">{errors.displayName?.message}</p>}
          
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-semibold">Email</label>
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
          <label htmlFor="password" className="text-sm font-semibold">Password</label>
          <Input
            id="password"
            type="password"
            className="py-2"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password?.message}</p>}
        </div>

        <div className="grid gap-2">
          <label htmlFor="passwordConfirmation" className="text-sm font-semibold">Confirm Password</label>
          <Input
            id="passwordConfirmation"
            type="password"
            className="py-2"
            placeholder="Confirm your password"
            {...register("passwordConfirmation")}
          />
          {errors.passwordConfirmation && <p className="text-red-500 text-xs">{errors.passwordConfirmation?.message}</p>}
        </div>

        <Button type="submit">Create Account</Button>
        {error && (
          <p className="text-red-500 text-xs">{error}</p>
        )}
      </form>
      <p className="text-xs mt-4 text-center">Already have an account? <Link to="/auth/sign-in" className="underline">Log in</Link></p>
    </div>
  );
};

export default SignUpForm;