import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "@/store/slices/auth";
import Button from "@/components/ui/button/Button";
import type { SignUpFormInputs } from "@/types/auth";
import { signUp } from "@/services/api/auth";
import { validationRules } from "@/utils/validationRules";
import "./SignUpForm.scss";

const SignUpForm = () => {
  const [ passwordMatchError, setPasswordMatchError ] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: SignUpFormInputs) => {
    const { email, password, passwordConfirmation, displayName } = data;
  
    if (password !== passwordConfirmation) {
      setPasswordMatchError(true);
    }
  
    try {
      await signUp({ email, password, displayName });
      dispatch(logIn());
      navigate("/");
    } catch (err) {
      console.error(err)
    }
  };
  
  return (
    <form className="signUpForm__container" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="signUpForm__title">Sign Up</h2>
      <label className="signUpForm__label">Display Name</label>
      <input
        type="text"
        className={`signUpForm__input ${
          errors.displayName ? "signUpForm__input--error" : ""
        }`}
        placeholder="Enter your display name"
        {...register("displayName", validationRules.displayName)}
      />
      {errors.displayName && (
        <p className="errorMessage">{errors.displayName.message}</p>
      )}

      <label className="signUpForm__label">Email</label>
      <input
        type="email"
        className={`signUpForm__input ${
          errors.email ? "signUpForm__input--error" : ""
        }`}
        placeholder="Enter your email"
        {...register("email", validationRules.email)}
      />
      {errors.email && <p className="errorMessage">{errors.email.message}</p>}

      <label className="signUpForm__label">Password</label>
      <input
        type="password"
        className={`signUpForm__input ${
          errors.password ? "signUpForm__input--error" : ""
        }`}
        placeholder="Enter your password"
        {...register("password", validationRules.password)}
      />
      {errors.password && (
        <p className="errorMessage">{errors.password.message}</p>
      )}

      <label className="signUpForm__label">Confirm Password</label>
      <input
        type="password"
        className={`signUpForm__input ${
          errors.passwordConfirmation ? "signUpForm__input--error" : ""
        }`}
        placeholder="Confirm your password"
        {...register("passwordConfirmation", validationRules.password)}
      />
      {passwordMatchError && <p className="errorMessage">Passwords should match!</p> }

      <Button type="submit">Sign Up</Button>
      <Link to="/sign-in">Sign in</Link>
    </form>
  );
};

export default SignUpForm;
