import express from "express"
import "express-async-errors"

import { errorHandling } from "./middlewares/error-handler"
import { routes } from "./routes"

const app = express()

app.use(express.json())

app.use(routes)

app.use(errorHandling)

export { app }