// When another file uses this file, module.exports is able to provide an object, function, or piece of data that other files can use when imported
// In this case, we are exporting a defined student "model" object and which will then create a table with students and rows inside a database
module.exports = (sequelize, DataTypes) => {
  // Defining our students sql data type
  // Basically a constructor, how a student will be defined and their basic properties of what a enrolled student would have, such as name, starID, or present or not
  let Student = sequelize.define('Student', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    starID: {
      type: DataTypes.STRING,
      allowNull: false,
      // Star id is unique
      unique: true,
    },

    present: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  // Sync (create) these structured data types as tables and rows and store them to db
  // Force is true will overwrite any old databases tables if any new or modified data types from above is changed, if not keep existing table.
  // This also returns a promise
  // Update 07-14-23, changed to false so the table won't drop every time we create a new running server
  Student.sync({ force: false }).then(() => {
    console.log('Synced student table');
  });

  // Return the Student
  return Student;
};
