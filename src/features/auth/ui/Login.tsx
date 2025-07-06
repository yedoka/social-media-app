import { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/features/auth/lib/validation";
import {
  Button,
  Field,
  Heading,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { User, Lock, Eye, EyeClosed } from "lucide-react";
import { useLogin } from "../api";

interface FormValues {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: logIn, isPending } = useLogin();
  const [cookies] = useCookies(["authToken"]);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    logIn(data);
  };

  useEffect(() => {
    if (cookies.authToken) {
      navigate("/");
    }
  }, [cookies.authToken, navigate]);

  return (
    <Stack gap={8}>
      <Stack gap={4}>
        <Heading size="lg">Login</Heading>
        <Text fontSize="sm" color="gray.300">
          Enter your email below to login to your account
        </Text>
      </Stack>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="6">
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <InputGroup startElement={<User size={16} />}>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
            </InputGroup>
          </Field.Root>

          <Field.Root>
            <Field.Label>Password</Field.Label>
            <InputGroup
              startElement={<Lock size={16} />}
              endElement={
                showPassword ? (
                  <EyeClosed
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    size={16}
                  />
                ) : (
                  <Eye
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    size={16}
                  />
                )
              }
            >
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
              />
            </InputGroup>
          </Field.Root>
          <Button type="submit" disabled={isPending} w="full">
            {isPending ? "Logging In..." : "Log In"}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
