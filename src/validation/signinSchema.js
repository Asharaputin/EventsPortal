import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email("Укажите корректный email"),
  password: z.string().min(5, "Пароль не должен быть короче 5 символов"),
});
