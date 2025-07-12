import Question from '../models/Question.js';
import Answer from '../models/Answer.js';

// POST /api/questions
export const createQuestion = async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    const question = await Question.create({
      title,
      description,
      tags,
      author: req.user._id,
    });
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/questions
export const getAllQuestions = async (req, res) => {
  const { tag, search, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (tag) filter.tags = tag;
  if (search) filter.title = { $regex: search, $options: 'i' };

  try {
    const questions = await Question.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('author', 'username avatar');

    const total = await Question.countDocuments(filter);

    res.json({ questions, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/questions/:id
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('author', 'username avatar')
      .populate({
        path: 'acceptedAnswer',
        populate: { path: 'author', select: 'username avatar' },
      });

    if (!question) return res.status(404).json({ message: 'Question not found' });

    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/questions/:id
export const updateQuestion = async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Not found' });

    if (!question.author.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    question.title = title || question.title;
    question.description = description || question.description;
    question.tags = tags || question.tags;
    await question.save();

    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/questions/:id
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Not found' });

    if (!question.author.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await question.deleteOne();
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/questions/:id/vote
export const voteQuestion = async (req, res) => {
  const { value } = req.body;
  const userId = req.user._id;

  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Not found' });

    const voteIndex = question.votes.findIndex((v) => v.userId.equals(userId));
    if (voteIndex !== -1) {
      if (question.votes[voteIndex].value === value) {
        question.votes.splice(voteIndex, 1); // undo vote
      } else {
        question.votes[voteIndex].value = value; // switch vote
      }
    } else {
      question.votes.push({ userId, value });
    }

    await question.save();
    res.json({ votes: question.votes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/questions/:id/accept/:answerId
export const acceptAnswer = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Not found' });

    if (!question.author.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const answer = await Answer.findById(req.params.answerId);
    if (!answer || !answer.question.equals(question._id)) {
      return res.status(404).json({ message: 'Invalid answer' });
    }

    question.acceptedAnswer = answer._id;
    await question.save();

    res.json({ message: 'Answer accepted', acceptedAnswer: answer._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
