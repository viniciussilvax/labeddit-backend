import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../../errors/BaseError";
import { ZodError } from "zod";
import { SignupSchema } from "../../dto/user/signup.dto";
import { LoginSchema } from "../../dto/user/login.dto";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    
    public signup = async (req: Request, res: Response) => {
        try {
            const input = SignupSchema.parse({
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password
            })

        const output = await this.userBusiness.signup(input)

        res.status(201).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            }
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public login = async (req:Request, res: Response) => {
        try {
            const input = LoginSchema.parse({
                email: req.body.email,
                password: req.body.password
            })

            const output = await this.userBusiness.login(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            }
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
        
       
    }

}
