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

export const bookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(100, { message: "Title must be less than 100 characters" }),

  description: z
    .string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(1000, { message: "Description must be less than 1000 characters" }),

  author: z
    .string()
    .trim()
    .min(2, { message: "Author name must be at least 2 characters" })
    .max(100, { message: "Author name must be less than 100 characters" }),

  categories: z
    .string()
    .trim()
    .min(2, { message: "Category must be at least 2 characters" })
    .max(100, { message: "Category must be less than 100 characters" }),

  totalCopies: z.union([z.string(), z.number()]),

  coverFile: z
    .instanceof(FileList, { message: "Please upload a cover image" })
    .refine((fileList) => fileList.length > 0 && fileList[0] !== undefined, {
      message: "Please upload a cover image",
    })
    .refine(
      (fileList) => {
        const file = fileList[0];
        return file && file.size <= 5000000; // 5MB
      },
      {
        message: "Cover image must be less than 5MB",
      },
    )
    .refine(
      (fileList) => {
        const file = fileList[0];
        return (
          file &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            file.type,
          )
        );
      },
      { message: "Cover must be a JPEG, PNG, or WebP image" },
    ),

  summary: z
    .string()
    .trim()
    .min(10, { message: "Summary must be at least 10 characters" })
    .max(2000, { message: "Summary must be less than 2000 characters" }),
});
