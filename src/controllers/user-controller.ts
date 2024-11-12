import { Request, Response } from "express"
import { prisma } from "../database/prisma"
import { hash } from "bcrypt"
import { z } from "zod"
import { AppError } from "../middlewares/utils/AppError"

class UsersController {
    async create(request: Request, response: Response) {
        //valida as informações que vem do body da requisição antes de dar a resposta
        const bodySchema  = z.object({
            name: z.string().trim().min(3),
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { name, email, password } = bodySchema.parse(request.body)

        const userWithSameEmail = await prisma.user.findFirst({where: { email } })
        
        if(userWithSameEmail) {
            throw new AppError("User with same email already exists")
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        const { password: _, ...userWithoutPassword } = user

        return response.status(201).json(userWithoutPassword)
    }
}

export { UsersController }