import express from 'express';
import {
    getRecommendations,
    suggestTags,
    summarizeAnswers,
    rephraseQuestion
} from '../controllers/aiController.js';

const router = express.Router();

router.get('/recommend/:question_id', getRecommendations);
router.post('/tags', suggestTags);
router.post('/summarize', summarizeAnswers);
router.post('/rephrase', rephraseQuestion);

export default router;
