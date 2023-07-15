<template>
  <div id="app" v-cloak>
    <NewStudentForm v-on:Student-added="newStudentAdded"></NewStudentForm>
    <!-- Bin students array to table to give to child component -->
    <NewStudentsTable
      v-bind:students="students"
      v-on:student-arrived-or-left="studentArrivedOrLeft"
      v-on:Delete-Student="studentDelete"
    ></NewStudentsTable>

    <NewStudentMessage v-bind:student="mostRecentStudents"></NewStudentMessage>
  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue';
import NewStudentMessage from './components/NewStudentMessage.vue';
import NewStudentsTable from './components/NewStudentsTable.vue';

export default {
  name: 'App',
  components: {
    NewStudentForm,
    NewStudentMessage,
    NewStudentsTable,
  },
  data() {
    return {
      students: [],
      mostRecentStudents: {},
    };
  },

  // mounted method

  // When the app fires up to start, the first thing is load up all students displayed currently
  mounted() {
    // load all students - make request to api

    this.updateStudents();
  },

  // Old code using vue properties inside methods will kept for reference
  methods: {
    updateStudents() {
      this.$student_api
        .getAllStudents()
        .then((students) => {
          // Our API Response back from the api call from our Axios request will be directed here to render to students array
          this.students = students;
        })
        .catch(() => {
          alert('Unable to fetch students list');
        });
    },
    newStudentAdded(student) {
      // this.students.push(student);
      // this.students.sort(function (s1, s2) {
      //   return s1.name.toLowerCase() < s2.name.toLowerCase() ? -1 : 1;
      // });

      // Using our student_api from main.js object to add student
      this.$student_api
        .addStudent(student)
        .then(() => {
          // Update our students table again with the new table of students
          this.updateStudents();
        })
        .catch((err) => {
          let message = err.response.data.join('\n');
          alert('Error Adding Student\n' + message);
        });
    },
    studentArrivedOrLeft(student, present) {
      // Find student in array of students
      // Update present attribute
      // Using find method - this array method takes a function and we create a current index (s) with rule-sets on what to find/match in the array of students, if found found and if any, return true
      // let updateStudent = this.students.find(function (s) {
      //   if (s.name === student.name && s.starID === student.starID) {
      //     // this student has been found
      //     return true;
      //   }
      // });
      // If student is found, then update the current present student to new present value
      // if (updateStudent) {
      //   updateStudent.present = present;
      //   // Give most recent student also updated student
      //   this.mostRecentStudents = updateStudent;
      // }

      student.present = present; // Update present value
      // student_api calls to student services
      // Then returns a promise after axios received an response back of updated successfully and calls updateStudents() to rerender with updated students table
      this.$student_api
        .updateStudents(student)
        .then(() => {
          this.mostRecentStudents = student;

          this.updateStudents();
        })
        .catch(() => {
          alert('Unable to update student');
        });
    },
    studentDelete(student) {
      // Filter returns new array of all students where the function returns true(present)
      // this.students = this.students.filter(function (s) {
      //   // Return all the students besides the given student argument that is being deleted
      //   if (s != student) {
      //     return true;
      //   }
      // });
      // // Clear most recent student message after deleting
      // this.mostRecentStudents = {};

      // With student api
      this.$student_api
        .deleteStudent(student.id)
        .then(() => {
          this.updateStudents();

          // Clear most recent student message after deleting
          this.mostRecentStudents = {};
        })
        .catch(() => {
          alert('Unable to delete student');
        });
    },
  },
};
</script>

<style>
/* Bootstrap 4 to our app */
@import 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css';

body {
  background-color: mediumslateblue;
}
[v-cloak] {
  display: none;
}
</style>
