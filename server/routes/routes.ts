import { Router } from 'express'
const router: Router = Router()

import getJsonDatabase from './utils/jsonDatabase'
import { hashPassword, comparePasswords } from './utils/bcryptUtils'

import { logout } from './controllers/logout';
import { loginUser } from './controllers/loginUser';
import { registerUser } from './controllers/registerUser';

import { dashboardRoute } from './views/dashboard';
import { authMiddleware } from './middlewares/authMiddleware'


import { Request, Response } from 'express';
import fs = require('fs');
import bcrypt = require('bcrypt');
import uuid = require('uuid');
import jwt = require('jsonwebtoken');
import { JwtPayload } from 'jsonwebtoken'

interface User {
    id: string
    name: string
    email: string
    password: string
}

interface JwtClaims {
    _id: string
}

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/dashboard', authMiddleware, dashboardRoute)

router.post('/logout', authMiddleware, logout)

export default router