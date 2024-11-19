import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
  }, {timestamps: true});

const threadSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [messageSchema],
  }, {timestamps: true}
);
  

export default mongoose.models.Thread || mongoose.model('Thread', threadSchema)