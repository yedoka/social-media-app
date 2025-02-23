import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().nonempty("Email is required").email("Email format is not valid"),
  password: z.string().nonempty("Password cannot be empty"),
});

export const signUpSchema = z
  .object({
    email: z.string().nonempty("Email is required").email("Email format is not valid"),
    password: z.string().min(4, "Password must contain at least 4 characters").nonempty("Password cannot be empty"),
    passwordConfirmation: z.string(),
    displayName: z.string().nonempty("Username is required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

export const EditFormSchema = z
  .object({
    username: z.string().nonempty("Username is required"),
    imageUrl: z.string().nonempty("Image URL is required"),
  })