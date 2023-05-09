import express from 'express';
import { signup, login, isAuth } from '../controllers/auth.mjs';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/private', isAuth);

export default router;