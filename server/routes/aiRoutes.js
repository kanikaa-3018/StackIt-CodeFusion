const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.get('/recommend/:question_id', aiController.getRecommendations);

router.post('/tags', aiController.suggestTags);

router.post('/summarize', aiController.summarizeAnswers);

router.post('/rephrase', aiController.rephraseQuestion);

module.exports = router;
