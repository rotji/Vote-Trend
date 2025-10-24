import { Router } from 'express';
import * as voteController from '../controllers/voteController';

const router = Router();

router.post('/', voteController.castVote);
router.get('/poll/:pollId', voteController.getVotesByPoll);

export default router;
