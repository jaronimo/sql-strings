const fs = require('fs');
const path = require('path');

function convertToCamelCase(filename) {
  return filename.replace(/((-|_)[a-z0-9])/g, ($1) => {
    return $1.toUpperCase().replace($1[0], '');
  });
}

const queries = {};

(function() {
  fs.readdirSync(__dirname).forEach((file) => {
    const extension = path.extname(file).toLowerCase();
    const filename = path.basename(file, extension);

    if (extension === '.sql') {
      const queryName = convertToCamelCase(filename);

      queries[queryName] = fs.readFileSync(path.join(__dirname, file), 'utf8');
    }
  });
})();

module.exports = queries;
