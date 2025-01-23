import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1,{
    message: "Please Enter Username",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 6 characters long",
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
