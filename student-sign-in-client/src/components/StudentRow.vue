<template>
  <tr
    v-bind:class="{
      present: student.present,
      absent: !student.present,
    }"
  >
    <td>{{ student.name }}</td>
    <td>{{ student.starID }}</td>
    <td>
      <!-- Changed from v-model to v-bind because v-model is 2 way data bind, meaning we can change props inside a child component, and that is not ideal. So we changed it to a 1 way bind.  -->

      <!-- Added a event target to listen to 'arrivedOrLeft' function if student checkbox is checked or not -->
      <input
        type="checkbox"
        v-bind:checked="student.present"
        v-on:change="arrivedOrLeft(student, $event.target.checked)"
      />
    </td>

    <td v-show="edit">
      <img v-on:click="deleteStudent" src="@/assets/deleteIcon.png" />
    </td>
  </tr>
</template>

<script>
export default {
  name: 'StudentRow',
  props: {
    student: Object,
    edit: Boolean,
  },

  methods: {
    arrivedOrLeft(student, present) {
      this.$emit('student-arrived-or-left', student, present);
    },
    deleteStudent() {
      // confirm is the display to choose ok or cancel
      if (confirm(`Delete ${this.student.name}?`)) {
        this.$emit('Delete-Student', this.student);
      }
    },
  },
};
</script>

<style scoped>
th,
tr {
  width: 33%;
}

.present {
  color: black;
  font-style: italic;

  background-color: coral;
}

.absent {
  color: darkslategray;
  font-weight: bold;
  background-color: aliceblue;
}

img {
  height: 25px;
}
</style>
