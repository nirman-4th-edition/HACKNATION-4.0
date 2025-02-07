import express, { NextFunction, Request, Response } from 'express';
import { getUser, login, register, registerHr } from '../controllers/auth';

var router = express.Router();

router.post('/register', register);

router.post('/registerHr', registerHr);

router.post('/login', login);

router.get('/user', getUser);

export default router;