import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['ToDo', 'InProgress', 'Completed'], default: 'ToDo' }
});

export default mongoose.model('Todo', taskSchema);