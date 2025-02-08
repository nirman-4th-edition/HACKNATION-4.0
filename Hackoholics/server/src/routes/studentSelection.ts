import express from 'express';
import { isHr, isHrOrAdmin, isStudentOrAdmin } from '../middlewares/authenticate';
import { addSelectedStudent, addShortlistStudent, getSelectedStudents, getShortlistedStudents, removeSelectedStudent, removeShortlistStudent, students, updateCompletedStudent, updateSelectedStudent, updateShortlistStudent } from '../controllers/studentSelection';
import { getStudentSelections } from '../controllers/details';


var router = express.Router();

router.get('/getSelectedStudents', isHrOrAdmin, getSelectedStudents);
router.get('/getShortlistedStudents', isHrOrAdmin, getShortlistedStudents);
router.get('/companies', isStudentOrAdmin, getStudentSelections);
router.get('/students', isHr, students);

router.post('/addSelectedStudents', isHrOrAdmin, addSelectedStudent);
router.post('/addShortlistedStudents', isHrOrAdmin, addShortlistStudent);

router.put('/updateShortlistedStudents', isHrOrAdmin, updateShortlistStudent);
router.put('/updateCompletedStudents', isHrOrAdmin, updateCompletedStudent);    
router.put('/updateSelectedStudents', isHrOrAdmin, updateSelectedStudent);

router.delete('/removeSelectedStudents', isHrOrAdmin, removeSelectedStudent);
router.delete('/removeShortlistedStudents', isHrOrAdmin, removeShortlistStudent);

export default router;