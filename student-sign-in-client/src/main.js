import { createApp } from 'vue';
import App from './App.vue';

import StudentService from './services/StudentService';

let app = createApp(App);

// Our 2 methods we created inside student services both where we use axios to request data do our given task to axios and then axios sends a request to our server, and then our server will send a response back
// Get all students and add students
// Global properties allows us to use this student_api property as an object to other files
app.config.globalProperties.$student_api = StudentService;

app.mount('#app');
