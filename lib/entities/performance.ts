import { z, } from "zod"

export const PerformanceLoadSchema = z.object({
    weight: z.number().default(0),
    unit: z.string().default('lbs'),
    bodyweight: z.boolean().default(false),
})

export type PerformanceLoad = z.infer<typeof PerformanceLoadSchema>

export const PerformanceSchema = z.object({
    load: PerformanceLoadSchema.default(PerformanceLoadSchema.parse({})),
    reps: z.number().default(0),
    fails: z.number().default(0),
    notes: z.string().default(''),
})

export type Performance = z.infer<typeof PerformanceSchema>
