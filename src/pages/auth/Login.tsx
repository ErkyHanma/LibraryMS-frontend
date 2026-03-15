import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { loginFormSchema } from "@/lib/validation";
import { Link, useNavigate } from "react-router";
import { FormField } from "@/components/shared/FormField";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleOnSubmit({
    email,
    password,
  }: z.infer<typeof loginFormSchema>) {
    try {
      const result = await login({ email, password });

      if (result.user.role.toUpperCase() === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.log(err instanceof Error ? err.message : "Login failed");
      }
    }
  }

  return (
    <>
      <p className="mb-3 text-sm text-gray-400">
        Please sign in to access your library account
      </p>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          id="email"
          label="Email"
          type="email"
          register={register}
          error={errors.email}
          placeholder="johndoe@example.com"
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          register={register}
          error={errors.password}
          placeholder="••••••••"
        />

        <Button type="submit" className="form-btn">
          Log In
        </Button>
      </form>

      <div className="mt-6 w-full text-center">
        <p className="text-sm text-gray-400">
          Doesn't have an account yet?{" "}
          <Link
            to={"/auth/signup"}
            className="text-primary hover:text-primary/90 cursor-pointer font-bold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
};
export default Login;
