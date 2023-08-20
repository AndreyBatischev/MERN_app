import express from 'express'
import {signUp, login, getAuthenticatedUser, logout} from '../controllers/userController'
const router = express.Router()

router.get("/", getAuthenticatedUser)
router.post('/signup', signUp)
router.post('/login', login)
router.post('/logout', logout)

export default router