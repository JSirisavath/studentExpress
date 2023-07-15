<template>
  <!-- Template/HTML here -->
  <div v-if="student.name">
    <!-- Arrived -->
    <div class="alert alert-info" v-if="student.present">
      Welcome, {{ student.name }}!
    </div>

    <!-- Left -->
    <div class="alert alert-success" v-else>
      Goodbye, {{ student.name }}, see you later!
    </div>
  </div>
</template>

<script>
export default {
  // create component
  name: 'NewStudentMessage',
  props: {
    student: Object,
  },
};
</script>

<style scoped></style>
