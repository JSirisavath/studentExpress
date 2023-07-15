let express = require('express');
// All delegated requests from our studentServices.js file (Axios converting our data request to JSON String ) comes to our express server to request to the db
// importing our index.js db file for data to become available to use
let db = require('../models');

// Database student model
let Student = db.Student;

// matches request to functions
let router = express.Router();

// get students and find all and then return them
router.get('/students', function (req, res, next) {
  Student.findAll({
    order: [
      'present', // Organize by present
      'starID', // Organize by star id
      db.Sequelize.fn('lower', db.Sequelize.col('name')), // Then organize by case-insensitive names
    ],
  })
    .then((students) => {
      // Convert them to JSON and return this promise
      return res.json(students);
    })
    .catch((err) => {
      // Server problem if server can't grab all the students from db
      next(err);
    });
});

// Create student row
router.post('/students', function (req, res, next) {
  // Parse data into JS object
  Student.create(req.body)
    .then((data) => {
      // 201 is a successful return response
      return res.status(201).send('Successfully Created');
    })
    .catch((err) => {
      // handle user error, like missing starID or name
      if (err instanceof db.Sequelize.ValidationError) {
        // respond with request error code, with error message
        let messages = err.errors.map((e) => e.message);
        return res.status(400).json(messages);
      }

      // Else, another error such as server errors
      // Let next give to this error handling case app.use(function (err, req, res, next) {
      //server error notification using stack error trace
      //   console.log(err.stack);
      //   res.status(500).send('Server Error');
      // });
      return next(err);
    });
});

// Edit a Student
// The syntax "/:id refers to a somewhat wildcard to any id you want the server to target. Example, I want to edit a student row with id 2,then using /:id, it will handle the requests and finding that student with id 2, rather instead without using this wildcard, we would be requesting each students' individual root path such as students/id/2,students/id/3, etc...  "
router.patch('/students/:id', function (req, res, next) {
  // If request it to /students/100
  // StudentID will select 100
  // params extract the id value
  let studentID = req.params.id;

  // Express server parsing raw client server string updated data to Javascript object and sends it to our db
  let updatedStudents = req.body;
  console.log(updatedStudents); // Body parsed in console

  // Sequelize Database method to update the selected student using the parsed data from express server and modifying that specific student row with that student id then responds back with an ok message after updating student row
  Student.update(updatedStudents, { where: { id: studentID } })
    .then(() => {
      let numberOfRowsModified = rowsModified[0]; // Number of rows changed

      // If 1 row is modified,
      // Send an ok message when done
      numberOfRowsModified == 1
        ? res.send('Student Row Successfully Update')
        : res.status(404).json(['Student and their id is not found!']);

      // if (numberOfRowsModified == 1) {
      //   res.send('Row Updated');
      // } else {
      //   res.status(404).json(['Student ID not found!']);
      // }

      // Modified Constraints cases
      // Modifying students with no name?
    })
    .catch((err) => {
      //If validation error, bad requests like no name or starID
      if (err instanceof db.Sequelize.ValidationError) {
        // respond with request error code, with error message
        let messages = err.errors.map((e) => e.message);
        return res.status(400).json(messages);
      }
      return next(err); // If error is server, pass it to error handling for status request 500
    });
});

// Delete Students
router.delete('/students/:id', function (req, res, next) {
  let studentID = req.params.id;

  Student.destroy({ where: { id: studentID } })
    .then((rowDeleted) => {
      rowDeleted == 1
        ? res.send('Student Row Deleted')
        : res.status(404).json('Student Not Found');
    })
    .catch((err) => {
      next(err); // Unexpected errors catching
    });
});

// Export our router for other files
module.exports = router;
