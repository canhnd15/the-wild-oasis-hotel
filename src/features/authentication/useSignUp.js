import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const navigate = useNavigate();

  const { mutate: signUpWithEmailPwd, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUp({ fullName, email, password }),
    onSuccess: (data) => {
      toast.success("Account is created. Please go to email to confirm.");
      navigate("/login");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, signUpWithEmailPwd };
}
