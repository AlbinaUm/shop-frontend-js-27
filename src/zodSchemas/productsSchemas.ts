import {z} from "zod";

export const productSchema = z.object({
    title: z.string()
        .min(1, 'Title is required')
        .regex(/^[A-Za-z0-9\s]*$/, 'Title must contain only English letters'),
    description: z.string().min(5, 'Description is required. The minimum symbols must be 5'),
    price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)) && +val > 0, {
        message: "Expected number MORE THAN 0, received a string"
    }),
    image: z.instanceof(File).nullable(),
});