import express from 'express';
import { companies, company, hr, hrs, student, students } from '../controllers/details';
import { isAdmin, isHrOrAdmin, isHrOrStudentOrAdmin, isStudent } from '../middlewares/authenticate';

var router = express.Router();

router.get('/students',isAdmin, students);

router.get('/student',isHrOrAdmin, student);

router.get('/companies', isAdmin, companies);

router.get('/company',isHrOrStudentOrAdmin, company);

router.get('/hrs',isAdmin, hrs);

router.get('/hr',isHrOrStudentOrAdmin, hr);

export default router;