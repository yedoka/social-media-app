import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "@/store/slices/auth";
import Button from "@/components/ui/button/Button";
import type { SignUpFormInputs } from "@/types/auth";
import { signUp } from "@/services/api/auth";
import { AuthValidationRules } from "@/utils/AuthValidationRules";
import Input from "@/components/ui/input/Input";
import SignInLink from "@/constants/SignInLink";

const SignUpForm = () => {
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: SignUpFormInputs) => {
    const { email, password, passwordConfirmation, displayName } = data;

    if (password !== passwordConfirmation) {
      setPasswordMatchError(true);
      return;
    }

    try {
      await signUp({ email, password, displayName });
      dispatch(logIn());
      navigate("/auth/sign-in");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="flex flex-col w-80 shadow-md rounded-md p-8 bg-accent-bg mx-auto border border-dark-border" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl mb-4 font-semibold">Register</h2>

      <label className="text-xs mb-1 font-semibold">Display Name</label>
      <Input
        type="text"
        className="mb-4 py-2"
        placeholder="Enter your display name"
        {...register("displayName", AuthValidationRules.displayName)}
      />
      {errors.displayName && <p className="text-red-500">{errors.displayName.message}</p>}

      <label className="text-xs mb-1 font-semibold">Email</label>
      <Input
        type="email"
        className="mb-4 py-2"
        placeholder="Enter your email"
        {...register("email", AuthValidationRules.email)}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <label className="text-xs mb-1 font-semibold">Password</label>
      <Input
        type="password"
        className="mb-4 py-2"
        placeholder="Enter your password"
        {...register("password", AuthValidationRules.password)}
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <label className="text-xs mb-1 font-semibold">Confirm Password</label>
      <Input
        type="password"
        className="mb-4 py-2"
        placeholder="Confirm your password"
        {...register("passwordConfirmation", AuthValidationRules.password)}
      />
      {passwordMatchError && <p className="text-red-500">Passwords should match!</p>}

      <Button type="submit">Create Account</Button>

      <SignInLink className="text-xs underline mt-4 ">
        Already have an account?
      </SignInLink>
    </form>
  );
};

export default SignUpForm;
