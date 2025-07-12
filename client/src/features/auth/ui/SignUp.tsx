import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/features/auth/lib/validation";
import {
  Button,
  Field,
  Heading,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Lock, Mail, User } from "lucide-react";

import { useAuthStore } from "../model/useAuthStore";

interface FormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
}

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      name: "",
    },
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
  });
  const { register: signUp, isPending } = useAuthStore();

  const onSubmit = async (data: FormValues) => {
    signUp(data);
  };

  return (
    <Stack gap={8}>
      <Stack gap={4}>
        <Heading size="lg">Register</Heading>
        <Text color="gray.300">Get started with your free account</Text>
      </Stack>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={6}>
          <Field.Root invalid={!!errors.name}>
            <Field.Label>Username</Field.Label>
            <InputGroup startElement={<User size={16} />}>
              <Input
                id="name"
                type="text"
                placeholder="Enter your username"
                {...register("name")}
              />
            </InputGroup>
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
            <InputGroup startElement={<Mail size={16} />}>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
            </InputGroup>
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <InputGroup startElement={<Lock size={16} />}>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
            </InputGroup>
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.passwordConfirmation}>
            <Field.Label>Confirm Password</Field.Label>
            <InputGroup startElement={<Lock size={16} />}>
              <Input
                id="passwordConfirmation"
                type="password"
                placeholder="Confirm your password"
                {...register("passwordConfirmation")}
              />
            </InputGroup>
            <Field.ErrorText>
              {errors.passwordConfirmation?.message}
            </Field.ErrorText>
          </Field.Root>

          <Button type="submit" disabled={isPending}>
            Create Account
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
