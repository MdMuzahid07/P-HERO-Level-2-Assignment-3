import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import httpStatus from 'http-status'
import NotFound from './app/middlewares/notFound'
const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1', UserRoutes)

// test route
app.get('/', (req: Request, res: Response) => {
  res.send('Server running')
});

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(NotFound);

export default app
