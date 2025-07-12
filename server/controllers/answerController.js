import Answer from '../models/Answer.js';
import Question from '../models/Question.js';
import Notification from '../models/Notification.js';

// POST /api/answers/:questionId
export const postAnswer = async (req, res) => {
  const { content } = req.body;
  const userId = req.user._id;

  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    const answer = await Answer.create({
      content,
      author: userId,
      question: question._id
    });

    question.answersCount += 1;
    await question.save();

    if (!question.author.equals(userId)) {
      await Notification.create({
        user: question.author,
        type: 'new_answer',
        message: 'Someone answered your question.',
        link: `/questions/${question._id}#${answer._id}`
      });
    }

    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/answers/:questionId
export const getAnswersByQuestionId = async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.questionId })
      .sort({ createdAt: -1 })
      .populate('author', 'username avatar');

    res.json(answers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/answers/:answerId/vote
export const voteAnswer = async (req, res) => {
  const { value } = req.body; // value: 1 (upvote), -1 (downvote)
  const userId = req.user._id;

  try {
    const answer = await Answer.findById(req.params.answerId);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    const voteIndex = answer.votes.findIndex(v => v.userId.equals(userId));

    if (voteIndex !== -1) {
      if (answer.votes[voteIndex].value === value) {
        answer.votes.splice(voteIndex, 1); // undo vote
      } else {
        answer.votes[voteIndex].value = value; // switch vote
      }
    } else {
      answer.votes.push({ userId, value });
    }

    await answer.save();
    res.json({ votes: answer.votes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/answers/:answerId/accept
export const acceptAnswer = async (req, res) => {
  const answerId = req.params.answerId;
  const userId = req.user._id;

  try {
    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    const question = await Question.findById(answer.question);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    if (!question.author.equals(userId)) {
      return res.status(403).json({ message: 'Only question owner can accept an answer' });
    }

    question.acceptedAnswer = answer._id;
    await question.save();

    answer.isAccepted = true;
    await answer.save();

    res.json({ message: 'Answer accepted', acceptedAnswer: answer._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
