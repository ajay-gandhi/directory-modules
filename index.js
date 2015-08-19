'use strict';

// NPM modules
var Promise = require('es6-promise').Promise,
    fs      = require('fs-extra-promise');

/**
 * Retrieves modules asynchronously
 *
 * @param [string]   dir - The directory from which to read modules
 * @param [function] cb  - A callback function
 *
 * @returns If [cb] is provided, calls the callback function with the list
 *   of modules as a parameter. Otherwise, this function returns a Promise that
 *   is resolved with the list of modules.
 */
module.exports.get_modules = function (dir, cb) {
  if (dir.substr(-1, 1) !== '/') dir += '/';

  var p = new Promise(function (resolve, reject) {
    var modules = [];

    // Read modules
    fs
      .readdirAsync(dir)
      .then(function (filenames) {
        filenames.forEach(function (filename) {
          // Ignore module if it errors
          try {
            modules.push(require(dir + filename));
          } catch (e) {
            console.log('Ignoring module:', filename, 'due to errors');
          }
        });

        resolve(modules);
      })
      .catch(console.trace);
  });

  // Callback provided
  if (cb) p.then(cb);

  // No callback, return promise
  else return p;

}

/**
 * Retrieves modules synchronously. Don't catch errors so that user can see them
 *
 * @param [string]   dir - The directory from which to read modules
 *
 * @returns The list of modules, each `require`d.
 */
module.exports.get_modules_sync = function (dir) {
  if (dir.substr(-1, 1) !== '/') dir += '/';

  var modules = [];

  // Read modules
  var filenames = fs.readdirSync(dir);

  filenames.forEach(function (filename) {
    // Ignore module if it errors
    try {
      modules.push(require(dir + filename));
    } catch (e) {
      console.log('Ignoring module:', filename, 'due to errors');
    }
  });

  return modules;
}
