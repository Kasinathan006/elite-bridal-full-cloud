const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Find the project and workspace roots
const projectRoot = __dirname;
// Since we're in apps/mobile, workspace root is two levels up
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Manually map core libraries that sometimes fail to Resolve in monorepos
config.resolver.extraNodeModules = {
    'promise': path.resolve(workspaceRoot, 'node_modules/promise'),
};

// 4. Set hierarchical lookup to false to allow Metro to resolve hoisted packages correctly
config.resolver.disableHierarchicalLookup = false;

module.exports = config;
