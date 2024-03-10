import { z } from "zod";

/**
 * Hedgehog interface shared between server and client
 */

export const hedgehogSchema = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number(),
  sex: z.enum(["male", "female"]),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  })
});

export type Hedgehog = z.infer<typeof hedgehogSchema>;
