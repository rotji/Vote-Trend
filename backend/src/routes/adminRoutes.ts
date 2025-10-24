import { Router } from 'express';
import * as adminController from '../controllers/adminController';

const router = Router();

router.get('/polls/pending', adminController.getPendingPolls);
router.post('/polls/:id/approve', adminController.approvePoll);
router.post('/polls/:id/reject', adminController.rejectPoll);

export default router;
