import { FormField } from "@/components/shared/FormField";
import { Button } from "@/components/ui/button";
import { signUpFormSchema } from "@/lib/validation";
import { ApiError } from "@/services/apiError";
import { signUp, type SignUpCredentials } from "@/services/auth/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      universityId: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleOnSubmit(data: z.infer<typeof signUpFormSchema>) {
    try {
      const payload: SignUpCredentials = {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        universityId: data.universityId,
      };

      await signUp(payload);
      toast.success("Account created successfully!", {
        description: "You can now log in to access the library.",
      });
      navigate("/auth/login");
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.getUserMessage());
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  return (
    <>
      <p className="mb-3 text-sm text-gray-400">
        Please complete all fields to gain access to the library
      </p>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          id="name"
          label="Name"
          placeholder="John"
          register={register}
          error={errors.name}
        />

        <FormField
          id="lastName"
          label="Lastname"
          placeholder="Doe"
          register={register}
          error={errors.lastName}
        />

        <FormField
          id="email"
          label="Email"
          placeholder="johndoe@example.com"
          type="email"
          register={register}
          error={errors.email}
        />

        <FormField
          id="universityId"
          label="University ID"
          placeholder="2024-0001"
          register={register}
          error={errors.universityId}
        />

        <FormField
          id="password"
          label="Password"
          placeholder="••••••••"
          type="password"
          register={register}
          error={errors.password}
        />

        <FormField
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          type="password"
          register={register}
          error={errors.confirmPassword}
        />

        <Button type="submit" className="form-btn">
          Sign Up
        </Button>
      </form>

      <div className="mt-6 w-full text-center">
        <p className="text-sm text-gray-400">
          Have an account already?{" "}
          <Link
            to={"/auth/login"}
            className="text-primary hover:text-primary/90 cursor-pointer font-bold"
          >
            Log In
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUp;
