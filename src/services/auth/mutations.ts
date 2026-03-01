import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp, type SignUpCredentials } from "./api";
import { invalidateAccountRequestQueries } from "../admin/queryInvalidation";

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: SignUpCredentials) => {
      return await signUp(credentials);
    },
    onSuccess: () => {
      invalidateAccountRequestQueries(queryClient);
    },
  });
};
