import "dotenv/config"
import express, { NextFunction, Request, Response } from 'express'
import notesRoutes from './routes/notesRoute'
import userRoute from './routes/usersRoute'
import morgan from 'morgan'
import createHttpError, {isHttpError} from "http-errors"
import session from "express-session"
import env from './utils/validateEnv'
import MongoStore from "connect-mongo"
import { requiresAuth } from "./middleware/auth"

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_URL
    })

}))

app.use('/api/users', userRoute)
app.use('/api/notes', requiresAuth , notesRoutes)

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