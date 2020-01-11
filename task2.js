const csv = require('csvtojson');
const { pipeline } = require('stream');
const fs = require('fs');

import path from 'path'
const csvFile = path.join(__dirname, '/csv/node_mentoring_t1_2_input_example.csv');
const textFile = path.join(__dirname, '/csv/node_mentoring_t1_2_input_example.txt');

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
