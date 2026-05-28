import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Название города должно быть не короче 3 символов"),
  description: z.string().min(5, "Описание должно быть не короче 5 символов"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Некорректная дата",
  }),
  city: z.string().min(2, "Укажите место проведения"),
  image: z.url("Укажите корректный URL картинки"),
});
