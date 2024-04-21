<template>
  <q-layout>
    <q-page-container>
      <task-list/>
    </q-page-container>
  </q-layout>
</template>

<script>
import TaskList from './components/TaskList';

export default {
  name: 'App',
  components: {
    TaskList
  }
}
</script>