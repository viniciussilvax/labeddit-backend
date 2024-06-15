import { z } from "zod"

export interface CreatePostInputDTO {
    content: string,
    token: string
}

export interface CreatePostOutputDTO {
    content: string
}

export const CreatePostSchema = z.object({
    content: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as CreatePostInputDTO)
