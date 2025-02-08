import express from 'express';
import { joinContest, getContests, getContest, createContest, updateContest, deleteContest, getContestParticipants, getContestResults } from '../controllers/contestController';
import { isStudent } from '../middlewares/authenticate';


var router = express.Router();

router.get('/', getContests);
router.get('/:id/participants', getContestParticipants);
router.get('/:id/results', getContestResults);
router.get('/:id', getContest);
router.post('/join', isStudent,  joinContest);
router.post('/create', createContest);
router.put('/update', updateContest);
router.delete('/delete', deleteContest);
    
export default router;