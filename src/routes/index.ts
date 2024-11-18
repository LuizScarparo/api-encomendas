import { Router } from "express";

import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { deliveriesRoutes } from "./deliveries-routes";
import { deliveryLogsRoutes } from "./delivery-logs-routes";

const routes = Router()
routes.use("/api/users", usersRoutes)
routes.use("/api/sessions", sessionsRoutes)
routes.use("/api/deliveries", deliveriesRoutes)
routes.use("/api/delivery-logs", deliveryLogsRoutes)

export { routes }