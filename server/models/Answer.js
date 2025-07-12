import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true }, // Rich text format
  votes: [{ userId: mongoose.Schema.Types.ObjectId, value: Number }],
  isAccepted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Answer', AnswerSchema);
