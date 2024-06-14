import express, { Application, Request, Response } from 'express'

import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.routes'
const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1', UserRoutes)

// test route
app.get('/', function (req: Request, res: Response) {
  res.send('Server running')
})

// global error handler
// make an global error handler and call here

export default app
