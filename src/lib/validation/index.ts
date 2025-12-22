import z from "zod";

export const loginFormSchema = z.object({
  email: z
    .email({ message: "Invalid email format" })
    .min(5, { message: "Email must be at least 5 characters" })
    .max(50, { message: "Email must be less than 50 characters" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must be less than 20 characters" }),
});

export const signUpFormSchema = z
  .object({
    name: z
      .string()
      .min(5, { message: "Name must be at least 2 characters" })
      .max(50, { message: "Name must be less than 50 characters" }),

    lastName: z
      .string()
      .min(5, { message: "Last name must be at least 2 characters" })
      .max(50, { message: "Last name must be less than 50 characters" }),

    email: z
      .email({ message: "Invalid email format" })
      .min(5, { message: "Email must be at least 5 characters" })
      .max(50, { message: "Email must be less than 50 characters" }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(20, { message: "Password must be less than 20 characters" }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
