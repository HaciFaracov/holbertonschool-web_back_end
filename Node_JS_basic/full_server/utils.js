// Create a file full_server/utils.js, in the file create a function named
// readDatabase that accepts a file path

import countStudents from '../3-read_file_async';

// read the database asynchronously

const readDatabase = (path) => countStudents(path);

module.exports = readDatabase;
