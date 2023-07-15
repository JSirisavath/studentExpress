<template>
  <div>
    <!-- Template/HTML here -->
    <div class="card student-list m-2 p-2">
      <h4 class="card-title">Student List</h4>
      <div class="edit-table-toggle form-check">
        <input
          id="edit-table"
          type="checkbox"
          class="form-check-input"
          v-model="editTable"
        />
        <label for="edit-table" class="form-check-label">Edit Table</label>
      </div>
      <div id="student-table">
        <table class="table">
          <tr>
            <th>Name</th>
            <th>StarID</th>
            <th>Present?</th>
            <!-- V-show is used to show a certain element if it is true  -->
            <th v-show="editTable">Delete</th>
          </tr>

          <!-- TODO create table rows 
                   Each row will have a checkbox, bound to the app's data 
                   When the checkbox is checked/unchecked, the student will be signed in/out -->

          <!-- You can also bind css properties to data as well through V-bind:class -->

          <!-- Need to add v-on:student-arrived-or-left="arrivedOrLeft" because since "Student-Row" component is being used in students table component and technically not in the app parent, student row will automatically default to this students table as an parent.And there is not way of listening to student row in this file. So we need to bind student arrived emitted message with arrived or left method to send to the app component. -->
          <student-row
            v-for="student in students"
            v-bind:key="student.starID"
            v-bind:student="student"
            v-on:student-arrived-or-left="arrivedOrLeft"
            v-on:Delete-Student="deleteStudent"
            v-bind:edit="editTable"
          >
            <!-- Don't need this because student row component, but left it here for reference -->
            <!-- <td>{{ student.name }}</td>
            <td>{{ student.starID }}</td>
            <td> -->
            <!-- Changed from v-model to v-bind because v-model is 2 way data bind, meaning we can change props inside a child component, and that is not ideal. So we changed it to a 1 way bind.  -->

            <!-- Added a event target to listen to 'arrivedOrLeft' function if student checkbox is checked or not -->
            <!-- <input
                type="checkbox"
                v-bind:checked="student.present"
                v-on:change="arrivedOrLeft(student, $event.target.checked)"
              />
            </td> -->
          </student-row>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import StudentRow from './StudentRow.vue';
export default {
  // create component
  name: 'NewStudentsTable',
  components: {
    StudentRow,
  },
  // Messages to send
  emits: ['student-arrived-or-left', 'Delete-Student'],
  props: {
    students: Array,
  },
  data() {
    return {
      editTable: false,
    };
  },
  methods: {
    arrivedOrLeft(student, present) {
      // Parent is responsible to render if student left or not, but needs that information emitted from this child
      // present is from the argument above to see if that payload's student arrived or not (boolean value)
      this.$emit('student-arrived-or-left', student, present);
    },
    // Passing delete student to the parent component
    deleteStudent(student) {
      this.$emit('Delete-Student', student);
    },
  },
};
</script>

<style scoped>
/* Style for student list */
#student-table {
  max-height: 400px;
  overflow: scroll;
}

/* Hide the app till everything loads up first, the app wont load till everything loads first*/
/* [v-cloak] {
  display: none;
} */
</style>
