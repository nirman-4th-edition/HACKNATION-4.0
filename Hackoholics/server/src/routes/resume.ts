import express from 'express';
import {isStudent } from '../middlewares/authenticate';
import { generatePdf, getResume, saveResume } from '../controllers/resume';


var router = express.Router();

router.post('/download',isStudent, generatePdf);

router.put('/save', isStudent, saveResume);

router.get('/get', isStudent, getResume);

export default router;