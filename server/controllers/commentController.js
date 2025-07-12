import Comment from '../models/Comment.js';
import Notification from '../models/Notification.js';

export const addComment = async (req, res) => {
  try {
    const { content, parentType, parentId, mentions = [] } = req.body;

    const comment = await Comment.create({
      content,
      author: req.user._id,
      parentType,
      parentId,
      mentions
    });


    for (const userId of mentions) {
      await Notification.create({
        user: userId,
        type: 'mention',
        message: `${req.user.username} mentioned you in a comment.`,
        link: `/questions/${parentId}` 
      });
    }

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

export const getCommentsByParent = async (req, res) => {
  try {
    const { parentType, parentId } = req.params;

    const comments = await Comment.find({ parentType, parentId })
      .populate('author', 'username avatar')
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    if (!comment.author.equals(req.user._id)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await comment.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
