import { Request, Response } from "express"
import { prisma } from "../database/prisma"
import { z } from "zod"

class DeliveryStatusController {
    async update(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const bodySchema = z.object({
            status: z.enum(["processing", "sent", "delivered"])
        })

        const { id } = paramsSchema.parse(request.params)
        const { status } = bodySchema.parse(request.body)

        await prisma.delivery.update({
            data: {
                status,
            },
            where: {
                id,
            }
        })

        await prisma.deliveryLog.create({
            data: {
                deliveryId: id,
                description: status,
            }
        })

        return response.json()
    }
}

export { DeliveryStatusController }