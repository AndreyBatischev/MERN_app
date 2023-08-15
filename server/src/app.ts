import "dotenv/config"
import express, { NextFunction, Request, Response } from 'express'
import notesRoutes from './routes/notesRoute'
import morgan from 'morgan'
import createHttpError, {isHttpError} from "http-errors"

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/notes', notesRoutes)

app.use((req, res, next) => {
    next(createHttpError(404,'Page not found'))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = 'Somefing went wrong'
    let statusCode = 500
    if(isHttpError(error)){
        statusCode = error.status
        errorMessage = error.message
    }
    res.status(statusCode).json({error: errorMessage})
})

export default app