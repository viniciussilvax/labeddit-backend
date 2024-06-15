import { z } from "zod"

export interface SignupInputDTO {
    nickname: string,
    email: string,
    password: string
}

export interface SignupOutputDTO {
    token: string,
    nickname: string
}

export const SignupSchema = z.object({
    nickname: z.string().min(2),
    email: z.string().email(),
    password: z.string()
}).transform(data => data as SignupInputDTO)
