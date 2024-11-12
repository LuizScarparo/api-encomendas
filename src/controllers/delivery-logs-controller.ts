import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "../database/prisma"
import { AppError } from "../middlewares/utils/AppError"

class DeliveryLogsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string()
        })

        const { delivery_id, description } = bodySchema.parse(request.body)

        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id }
        })

        if(!delivery) {
            throw new AppError("Este pedido nao foi encontrado", 404)
        }

        if(delivery.status === "delivered") {
            throw new AppError("this order already been delivered")
        }

        if(delivery.status === "processing") {
            throw new AppError("change status to sent")
        }

        await prisma.deliveryLog.create({
            data: {
                deliveryId: delivery_id,
                description,
            }
        })

        return response.status(201).json()
    }

    async show (request: Request, response: Response) {
        const paramsSchema = z.object({
            delivery_id: z.string().uuid(),
        })

        const { delivery_id } = paramsSchema.parse(request.params)

        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id },
            include: {
                deliveryLogs: { select: { description: true } }
            }
        })

        if(request.user?.role === "customer" && request.user.id !== delivery?.userId) {
            throw new AppError("user cannot see others deliveruies", 401)
        }

        return response.status(201).json(delivery)


    }
}

export { DeliveryLogsController }