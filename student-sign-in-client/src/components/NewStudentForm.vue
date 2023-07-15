<template>
  <div>
    <!-- Template/HTML here -->
    <!-- Copied from original student sing in html version -->
    <div class="alert alert-danger" v-if="errors.length > 0">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </div>

    <div class="card add-student m-2 p-2">
      <h4 class="card-title">Add new student</h4>

      <div class="form-group">
        <label for="name">Name</label>
        <!-- V-model allows global access to modified or edited data when changed or not AND trim get rid of empty white spaces -->
        <!-- TODO v-model newStudentName -->
        <input id="name" class="form-control" v-model.trim="newStudentName" />
      </div>
      <div class="form-group">
        <label for="starID">Star ID</label>
        <!-- TODO v-model newStarID -->
        <input id="starID" class="form-control" v-model.trim="newStarID" />
      </div>
      <!-- TODO v-on:click event handler -->
      <button class="btn btn-primary" v-on:click="addStudent">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  // create component
  name: 'NewStudentForm',
  emits: ['Student-added'], // Documents events this component emits

  data() {
    return {
      newStudentName: '',
      newStarID: '',
      errors: [],
    };
  },

  methods: {
    addStudent() {
      this.errors = []; // clear errors array

      if (!this.newStudentName) {
        this.errors.push('Student name required');
      }

      if (!this.newStarID) {
        this.errors.push('Student starID required');
      }

      // If there is a student name and star id
      if (this.errors.length == 0) {
        let student = {
          name: this.newStudentName,
          starID: this.newStarID,
          present: false,
        };

        // Emit message to parent with new student
        // Emitted message or payload
        this.$emit('Student-added', student);

        // Reset fields
        this.newStudentName = '';
        this.newStarID = '';
      }
    },
  },
};
</script>

<style scoped></style>
