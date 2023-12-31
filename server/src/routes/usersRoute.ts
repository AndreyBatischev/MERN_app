import express from 'express'
import {signUp, login, getAuthenticatedUser, logout} from '../controllers/userController'
import { requiresAuth } from '../middleware/auth'
const router = express.Router()

router.get("/", requiresAuth , getAuthenticatedUser)
router.post('/signup', signUp)
router.post('/login', login)
router.post('/logout', logout)

export default router