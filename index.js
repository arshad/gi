#! /usr/bin/env node

var program = require('commander');
var fs = require('fs');
var request = require('request');

// Get version from package.json.
var version = require('./package.json').version;

program
  .command('install [type]')
  .description('Use this command to install a .gitignore file.')
  .action(function(type, options) {

    // Show error message if type is not specified.
    if (!type) {
      console.log('Error: type missing');
      program.help();
    }

    var url = 'https://raw.githubusercontent.com/github/gitignore/master/' + type + '.gitignore';

    var options = {
      url: url,
      headers: {
        'User-Agent': 'request'
      }
    }

    // Make the request.
    request(options, function (error, response, body) {
      // Handle error.
      if (response.statusCode == 404) {
        return console.log('File not found. Remember that type is case sensitive.');
      }

      if (!error && response.statusCode == 200) {
        fs.writeFile('.gitignore', body, 'utf8', function (err) {
           if (err) return console.log(err);

           // Show a success message.
           console.log('Successfully added .gitignore for ' + type + '.');
        });
      }
    });
  });

program.parse(process.argv);

if (!program.args.length) program.help();

// var url = 'https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore';

// var options = {
//   url: url,
//   headers: {
//     'User-Agent': 'request'
//   }
// }

// // Make the request.
// request(options, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body);
//   }
// });
