const axios = require('axios');

const FASTAPI_BASE_URL = 'http://localhost:8000';

exports.getRecommendations = async (req, res) => {
    const { question_id } = req.params;

    try {
        const response = await axios.get(`${FASTAPI_BASE_URL}/recommend/${question_id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching recommendations:', error.message);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
};

exports.suggestTags = async (req, res) => {
    const { text } = req.body;

    try {
        const response = await axios.post(`${FASTAPI_BASE_URL}/tags`, { text });
        res.json(response.data);
    } catch (error) {
        console.error('Error suggesting tags:', error.message);
        res.status(500).json({ error: 'Failed to suggest tags' });
    }
};

exports.summarizeAnswers = async (req, res) => {
    const { answers } = req.body;

    try {
        const response = await axios.post(`${FASTAPI_BASE_URL}/summarize`, { answers });
        res.json(response.data);
    } catch (error) {
        console.error('Error summarizing answers:', error.message);
        res.status(500).json({ error: 'Failed to summarize answers' });
    }
};

exports.rephraseQuestion = async (req, res) => {
    const { title, description } = req.body;

    try {
        const response = await axios.post(`${FASTAPI_BASE_URL}/rephrase`, { title, description });
        res.json(response.data);
    } catch (error) {
        console.error('Error rephrasing question:', error.message);
        res.status(500).json({ error: 'Failed to rephrase question' });
    }
};
