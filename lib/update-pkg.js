const path = require('path');
const readPkg = require('read-pkg');
const { writeFile } = require('fs/promises');

module.exports = async ({pkgRoot, prefix, suffix}, {cwd}, pkg) => {
  const workingDir = pkgRoot ? path.resolve(cwd, String(pkgRoot)) : cwd;

  if (!('dependencies' in pkg)) {
    // skip step
    return;
  }

  const scope = path.dirname(pkg.name);
  
  for (const key in pkg.dependencies) {
    if (key.startsWith(scope + '/')) {
      const dir = path.join(workingDir, '..', path.basename(key));
      const anotherPkg = await readPkg({cwd: dir});
      pkg.dependencies[key] = `${prefix ? prefix : ''}${anotherPkg.version}${suffix ? suffix : ''}`;
    }
  }

  await writeFile(path.join(workingDir, 'package.json'), JSON.stringify(pkg, null, 2));
};
