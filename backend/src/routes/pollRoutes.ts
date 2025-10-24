import { Router } from 'express';
import * as pollController from '../controllers/pollController';

const router = Router();

router.get('/', pollController.getAllPolls);
router.post('/', pollController.createPoll);
router.get('/:id', pollController.getPollById);
router.post('/:id/vote', pollController.voteOnPoll);

export default router;
