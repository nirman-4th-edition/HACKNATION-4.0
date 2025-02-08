import express from 'express';
import { isHr, isHrOrAdmin, isHrOrStudentOrAdmin, isStudent } from '../middlewares/authenticate';
import { addFeedback, deleteFeedback, getFeedback, getFeedbacks, updateFeedback } from '../controllers/feedback';

var router = express.Router();

router.post('/addFeedback', isHrOrAdmin, addFeedback);

router.delete('/deleteFeedback', isHrOrAdmin, deleteFeedback);

router.post('/updateFeedback', isHrOrAdmin, updateFeedback);

router.get('/feedbacks',isStudent, getFeedbacks);

router.get('/feedback',isHrOrStudentOrAdmin, getFeedback);


export default router;