import { z } from "zod";

export const usersSchema = z.object({
  nickname: z.string().min(3, "NickName не должен быть короче 3 символов"),
  email: z.string().email("Укажите корректный email"),
  password: z.string().min(5, "Пароль не должен быть короче 5 символов"),
});
