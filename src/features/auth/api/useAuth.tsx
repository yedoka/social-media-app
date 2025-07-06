import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

import { getToken, signIn, signUp } from "@/services/api/auth";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface LoginFormValues {
  email: string;
  password: string;
}
interface SignUpFormValues extends LoginFormValues {
  passwordConfirmation: string;
  displayName: string;
}

export const useLogin = () => {
  const [, setCookie] = useCookies(["authToken"]);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginFormValues) => signIn(data.email, data.password),
    onSuccess: async (response) => {
      if (response.success) {
        const token = await getToken();
        if (token) {
          setCookie("authToken", token, { path: "/", maxAge: 3600 });
          navigate("/");
        }
      } else {
        toast.error(response.message, {
          position: "top-center",
          theme: "dark",
        });
      }
    },
    onError: () => {
      toast.error("Something went wrong.", {
        position: "top-center",
        theme: "dark",
      });
    },
  });
};

export const useSignUp = () => {
  const [, setCookie] = useCookies(["authToken"]);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignUpFormValues) =>
      signUp(data.email, data.password, data.displayName),

    onSuccess: async (response) => {
      if (response.success) {
        const token = await getToken();
        if (token) {
          setCookie("authToken", token, { path: "/", maxAge: 3600 });
          navigate("/");
        }
      } else {
        toast.error(response.message, {
          position: "top-center",
          theme: "dark",
        });
      }
    },

    onError: () => {
      toast.error("Something went wrong.", {
        position: "top-center",
        theme: "dark",
      });
    },
  });
};
