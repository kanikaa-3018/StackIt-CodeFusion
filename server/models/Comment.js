import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  parentType: { type: String, enum: ['Question', 'Answer'], required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model('Comment', CommentSchema);
