// 5 Create a more complex HTTP server using Node's HTTP module

// In a file named 5-http.js, create a small HTTP server using the http module:
// It should be assigned to the variable app and this one must be exported
// HTTP server should listen on port 1245
// It should return plain text
// When the URL path is /, it should display Hello Holberton School! in the page body
// When the URL path is /students, it should display This is the list of our students
// followed by the same content as the file 3-read_file_async.js (with and without the database)
// the name of the database must be passed as argument of the file
// CSV file can contain empty lines (at the end) - and they are not a valid student!

const http = require('http');
const countStudents = require('./3-read_file_async');

const port = 1245;

const app = http
  .createServer(async (req, res) => {
    if (req.url === '/') {
      res.end('Hello Holberton School!');
    } else if (req.url === '/students') {
      res.write('This is the list of our students\n');

      await countStudents(process.argv[2])
        .then((data) => {
          const fields = Object.keys(data);

          const total = fields.reduce(
            (acc, curr) => acc + data[curr].numStudents,
            0,
          );

          res.write(`Number of students: ${total}\n`);

          for (let i = 0; i < fields.length; i += 1) {
            res.write(
              `Number of students in ${fields[i]}: ${
                data[fields[i]].numStudents
              }. `,
            );
            res.write(`List: ${data[fields[i]].names.join(', ')}`);

            if (i < fields.length - 1) {
              res.write('\n');
            }
          }
        })
        .catch((err) => {
          res.write(err.message);
        })
        .finally(() => {
          res.end();
        });
    }
  }).listen(port);

module.exports = app;
