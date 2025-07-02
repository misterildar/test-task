import { z } from 'zod';

export const ProductSchema = z.object({
	id: z.number(),
	title: z.string(),
	price: z.number(),
	image_url: z.string(),
	description: z.string(),
});

export type ProductFromSchema = z.infer<typeof ProductSchema>;
