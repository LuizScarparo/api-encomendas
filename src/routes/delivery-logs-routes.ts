import { Router } from "express";
import { DeliveryLogsController } from "../controllers/delivery-logs-controller";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "../middlewares/verify-user-authorization";

const deliveryLogsRoutes = Router()
const deliveyLogsController = new DeliveryLogsController()

deliveryLogsRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(["salesperson"]), deliveyLogsController.create)
deliveryLogsRoutes.get("/:delivery_id/show", ensureAuthenticated, verifyUserAuthorization(["salesperson", "customer"]), deliveyLogsController.show)

export { deliveryLogsRoutes }