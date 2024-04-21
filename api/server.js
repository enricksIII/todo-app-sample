import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io'; // Correct import statement
import http from 'http';
import cors from 'cors';
import Task from './models/Task.js'; // Ensure .js extension is used

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://enriquelacambraiii:5tnYTSpjfKA35LZs@cluster1.g3vhkd9.mongodb.net/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Make sure this matches your front-end URL or is '*' for open access
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('fetchTasks', async () => {
    const tasks = await Task.find();
    io.emit('tasks', tasks);
  });

  socket.on('addTask', async (taskData) => {
    const newTask = new Task(taskData);
    await newTask.save();
    io.emit('tasks', await Task.find());
  });

  socket.on('updateTask', async (taskData) => {
    await Task.findByIdAndUpdate(taskData._id, taskData);
    io.emit('tasks', await Task.find());
  });

  socket.on('deleteTask', async (id) => {
    await Task.findByIdAndDelete(id);
    io.emit('tasks', await Task.find());
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});