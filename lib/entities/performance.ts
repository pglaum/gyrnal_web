import { z, } from "zod"

export const PerformanceLoadSchema = z.object({
    weight: z.number().default(0),
    unit: z.string().default(''),
    bodyweight: z.boolean().default(false),
})

export type PeformanceLoad = z.infer<typeof PerformanceLoadSchema>

export const PerformanceSchema = z.object({
    load: PerformanceLoadSchema,
    reps: z.number().default(0),
    fails: z.number().default(0),
    notes: z.array(z.string()),
})

export type Peformance = z.infer<typeof PerformanceSchema>
