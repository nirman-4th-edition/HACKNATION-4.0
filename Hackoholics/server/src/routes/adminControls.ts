import express, { NextFunction, Request, Response } from 'express';
import { addHr, deleteHr, addStudent, deleteStudent, addAdmin, deleteAdmin, addCompany, deleteCompany } from '../controllers/adminControls';
import { isAdmin } from '../middlewares/authenticate';

var router = express.Router();

router.post('/addhr', isAdmin, addHr);
router.delete('/deletehr', isAdmin, deleteHr);
router.post('/addstudent', isAdmin, addStudent);
router.delete('/deletestudent', isAdmin, deleteStudent);
router.post('/addadmin', isAdmin, addAdmin);
router.delete('/deleteadmin', isAdmin, deleteAdmin);
router.post('/addcompany', isAdmin, addCompany);
// this api call will be made only after confirming the deletion of all HRs associated with the company from the client side
router.delete('/deletecompany', isAdmin, deleteCompany);

export default router;