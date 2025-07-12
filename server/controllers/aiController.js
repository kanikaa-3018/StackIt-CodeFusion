// aiController.js
import axios from 'axios';

const FASTAPI_BASE_URL = 'http://localhost:8000';

export async function getRecommendations(req, res) {
    const { question_id } = req.params;

    try {
        const response = await axios.get(`${FASTAPI_BASE_URL}/recommend/${question_id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching recommendations:', error.message);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
}

export async function suggestTags(req, res) {
    const { text } = req.body;

    try {
        const response = await axios.post(`${FASTAPI_BASE_URL}/tags`, { text });
        res.json(response.data);
    } catch (error) {
        console.error('Error suggesting tags:', error.message);
        res.status(500).json({ error: 'Failed to suggest tags' });
    }
}

export async function summarizeAnswers(req, res) {
    const { answers } = req.body;

    try {
        const response = await axios.post(`${FASTAPI_BASE_URL}/summarize`, { answers });
        res.json(response.data);
    } catch (error) {
        console.error('Error summarizing answers:', error.message);
        res.status(500).json({ error: 'Failed to summarize answers' });
    }
}

export async function rephraseQuestion(req, res) {
    const { title, description } = req.body;

    try {
        const response = await axios.post(`${FASTAPI_BASE_URL}/rephrase`, { title, description });
        res.json(response.data);
    } catch (error) {
        console.error('Error rephrasing question:', error.message);
        res.status(500).json({ error: 'Failed to rephrase question' });
    }
}
