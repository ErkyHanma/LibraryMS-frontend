import { api } from "../axiosInstance";

export type SignUpCredentials = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  universityId: string;
};

export async function signUp(credentials: SignUpCredentials) {
  const res = await api.post("/auth/sign-up", credentials);
  return res.data;
}
