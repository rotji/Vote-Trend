import { Router } from 'express';
import * as topicController from '../controllers/topicController';

const router = Router();

router.get('/', topicController.getAllTopics);
router.post('/', topicController.createTopic);
router.get('/:id', topicController.getTopicById);

export default router;
