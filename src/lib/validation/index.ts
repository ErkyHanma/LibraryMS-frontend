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
      .min(3, { message: "Name must be at least 3 characters" })
      .max(100, { message: "Name must be less than 100 characters" }),

    lastName: z
      .string()
      .min(3, { message: "Lastname must be at least 3 characters" })
      .max(100, { message: "Lastname must be less than 100 characters" }),

    email: z
      .email({ message: "Invalid email format" })
      .min(5, { message: "Email must be at least 5 characters" })
      .max(50, { message: "Email must be less than 50 characters" }),

    universityId: z
      .string()
      .min(3, { message: "University ID must be at least 3 characters" })
      .max(100, { message: "University ID must be less than 100 characters" }),

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

  totalCopies: z.union([
    z.string().min(1, "Total copies must be at least 1"),
    z.number().min(1, "Total copies must be at least 1"),
  ]),

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

  pages: z.union([
    z.string().min(1, "Pages must be at least 1"),
    z.number().min(1, "Pages must be at least 1"),
  ]),

  publishDate: z.string().min(1, "Publish Date is required"),

  summary: z
    .string()
    .trim()
    .min(10, { message: "Summary must be at least 10 characters" })
    .max(2000, { message: "Summary must be less than 2000 characters" }),
});

export const createBookSchema = bookSchema;

// Edit schema
export const editBookSchema = bookSchema.extend({
  coverFile: z
    .instanceof(FileList)
    .refine(
      (fileList) => {
        if (fileList.length > 0 && fileList[0]) {
          return fileList[0].size <= 5000000;
        }
        return true;
      },
      { message: "Cover image must be less than 5MB" },
    )
    .refine(
      (fileList) => {
        if (fileList.length > 0 && fileList[0]) {
          return [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp",
          ].includes(fileList[0].type);
        }
        return true;
      },
      { message: "Cover must be a JPEG, PNG, or WebP image" },
    )
    .optional(),
});
