const path = require('path');

// -path.dirname returns
//  the directory of a path
// module.exports = path.dirname(process.mainModule.filename);
module.exports = path.dirname(require.main.filename);
// -process is a global variable
// -process.mainModule refers to the main module that started our application
//  (i.e. the module we created in /index.js)
