import { z } from "zod";

export const ObjectZod = z.array(
    z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        price: z.number(),
        img: z.string().optional(),
    })
);