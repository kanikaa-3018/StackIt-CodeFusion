const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String, index: true }],
  votes: [{ userId: mongoose.Schema.Types.ObjectId, value: Number }],
  acceptedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },
  answersCount: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Question', QuestionSchema);
