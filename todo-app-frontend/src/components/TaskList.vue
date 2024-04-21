<template>
    <q-layout>
      <q-page-container>
        <div>
          <q-page padding>
            <!-- Add Task Form -->
            <div class="q-pa-md">
              <q-input filled v-model="newTask.title" label="Task Title" />
              <q-input type="textarea" filled v-model="newTask.description" label="Task Description" />
              <q-btn @click="addTask" label="Add Task" color="primary" />
            </div>
  
            <!-- Task List -->
            <div v-for="task in tasks" :key="task._id" class="q-mb-md">
              <q-card>
                <q-card-section>
                  <q-input filled v-model="task.title" />
                  <q-input type="textarea" filled v-model="task.description" />
                  <div>Status: {{ task.status }}</div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="Update" @click="() => updateTask(task)" color="primary" />
                  <q-btn flat label="Delete" @click="() => deleteTask(task._id)" color="negative" />
                </q-card-actions>
              </q-card>
            </div>
          </q-page>
        </div>
      </q-page-container>
    </q-layout>
  </template>
  
  <script>
  import io from 'socket.io-client';
  
  export default {
    data() {
      return {
        socket: null,
        tasks: [],
        newTask: {
          title: '',
          description: ''
        }
      };
    },
    methods: {
      connectSocket() {
        this.socket = io('http://localhost:3000');
        this.socket.on('tasks', (tasks) => {
          this.tasks = tasks;
        });
      },
      addTask() {
        this.socket.emit('addTask', this.newTask);
        this.newTask = { title: '', description: '' }; // Reset new task input after sending
      },
      updateTask(task) {
        this.socket.emit('updateTask', task);
      },
      deleteTask(id) {
        this.socket.emit('deleteTask', id);
      },
      fetchTasks() {
        this.socket.emit('fetchTasks');
      }
    },
    mounted() {
      this.connectSocket();
      this.fetchTasks(); // Fetch tasks upon component mount
    }
  }
  </script>