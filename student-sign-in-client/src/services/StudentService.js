import axios from 'axios';

let baseURL = '/api/students'; // maybe change to students

// Axios basically make our http requests from the client side to our express server. In addition, it also handles our express server response as well. Axios usually includes new or updated data to the body of the HTTp request
export default {
  getAllStudents() {
    return axios.get(baseURL).then((response) => {
      return response.data;
    });
  },

  // This is a request to the server where Axio will handle our request order to add student to JSON server
  addStudent(student) {
    // Add the student using the base url and also the student object to JSON and will be sent as part of the request to our server
    return axios.post(baseURL, student).then((response) => {
      return response.data;
    });
  },

  updateStudents(student) {
    // Create Url from /api/students/1
    // Axios receives response from server and returns a promise of the data back
    return axios.patch(`${baseURL}/${student.id}`, student).then((response) => {
      response.data;
    });
  },

  deleteStudent(id) {
    // Tell server to delete a student row
    return axios.delete(`${baseURL}/${id}`).then((response) => {
      return response.data;
    });
  },
};
