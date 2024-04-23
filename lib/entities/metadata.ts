import { z, } from "zod"

export const MetadataSchema = z.object({
    key: z.string(),
    value: z.string(),
})

export type Metadata = z.infer<typeof MetadataSchema>
