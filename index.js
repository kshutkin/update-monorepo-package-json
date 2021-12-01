const getPkg = require('./lib/get-pkg');
const updatePkg = require('./lib/update-pkg');

async function prepare(pluginConfig, context) {
    // Load package.json
    const pkg = await getPkg(pluginConfig, context);

    // update package.json
    await updatePkg(pluginConfig, context, pkg);
  }

module.exports = { prepare };