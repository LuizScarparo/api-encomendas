import express from "express"
import "express-async-errors"

import { errorHandling } from "./middlewares/error-handler"
import { routes } from "./routes"
import { connectRabbitMQ } from "./configs/rabbitmq"
import { consumeMessages } from "./controllers/message-consumer"

const app = express()

app.use(express.json())

app.use(routes)

app.use(errorHandling)

connectRabbitMQ().then(() => {
    consumeMessages('deliveryQueue');
});


export { app }