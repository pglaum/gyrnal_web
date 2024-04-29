import { z, } from "zod"


export const TemplateSchema = z.object({
    id: z.string().nullish(),
    userid: z.string().nullable().default(null),
    title: z.string().default(''),
    movements: z.array(z.string()).default([]),
})

export type Template = z.infer<typeof TemplateSchema>
