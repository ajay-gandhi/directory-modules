# directory-modules

> Use a directory of files as modules for your app

## Usage

First install with `npm`:

```bash
$ npm install directory-modules
```

Then use the sync or async method:

```js
var DM = require('directory-modules');

// Async method
DM.get_modules(__dirname + '/subdir', function (modules) {
  // `modules` is a list of files in subdir/, already require()'d
  // If require fails for some reason, the error is caught
});

// If not callback is provided, a promise is returned
DM
  .get_modules(__dirname + '/subdir')
  .then(function (modules) {
    // Do things with `modules`
  });

// Sync method
var modules = DM.get_modules_sync(__dirname + '/subdir');
```

## Why

If you're writing an app with an API exposed to other developers, you'll expect
others to write some sort of modules or extensions for your project. Instead of
having some sort of array of installed modules, this package helps you use a
subdirectory as that array.

`directory-modules` goes through the subdirectory you provide and attempts to
`require()` each file or directory it encounters. If an error occurs,
`directory-modules` will let you know in the console, but **doesn't throw an
error**. Once you have the returned list of modules, you can use them as you
choose.
