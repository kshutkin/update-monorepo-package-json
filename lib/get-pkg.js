const path = require('path');
const readPkg = require('read-pkg');
const getError = require('./get-error');

module.exports = async ({pkgRoot}, {cwd}) => {

  const pkg = await readPkg({cwd: pkgRoot ? path.resolve(cwd, String(pkgRoot)) : cwd});

  if (!pkg.name) {
    throw getError('ENOPKGNAME');
  }

  if (!pkg.name.startsWith('@')) {
    throw getError('ENOPKGSCOPE');
  }

  return pkg;
};
