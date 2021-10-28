const path = require('path');

// ==============================================

const root_path = () => {
  // -path.dirname returns
  //  the directory of a path
  // module.exports = path.dirname(process.mainModule.filename);
  // -process is a global variable
  // -process.mainModule refers to the main module that started our application
  //  (i.e. the module we created in /index.js)
  return path.dirname(require.main.filename);
};

// ==============================================

const public_path = () => {
  return path.join(root_path(), 'public');
};

// ==============================================

module.exports = public_path;
