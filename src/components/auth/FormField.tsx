// components/FormField.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UseFormRegister, FieldError } from "react-hook-form";

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
};

export const FormField = ({
  id,
  label,
  type = "text",
  register,
  error,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} id={id} {...register(id)} />
      {error?.message && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
};
