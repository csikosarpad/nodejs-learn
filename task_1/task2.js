const csv = require('csvtojson');
const { pipeline } = require('stream');
const fs = require('fs');

const csvFile = __dirname + '/csv/node_mentoring_t1_2_input_example.csv';
const textFile = __dirname + '/csv/node_mentoring_t1_2_input_example.txt';

pipeline(
  csv()
    .fromFile(csvFile)
    .subscribe(),
  fs.createWriteStream(textFile),
  (err) => {
    if (err) {
      console.error('File line write failed.', err);
    } else {
      console.log('File line write succeeded.');
    }
  }
);
