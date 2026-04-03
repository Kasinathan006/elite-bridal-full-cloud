const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'apps/mobile/app');

function repairFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    let initialLength = content.length;
    // Fix ''#9E8A92'' -> '#9E8A92'
    content = content.replace(/''#([0-9A-Fa-f]{6})''/g, "'#$1'");
    // Fix "'#9E8A92'" -> '#9E8A92'
    content = content.replace(/"'#([0-9A-Fa-f]{6})'"/g, "'#$1'");

    if (content.length !== initialLength) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Repaired: " + filePath);
    }
}

function traverseDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            repairFile(fullPath);
        }
    });
}

traverseDir(targetDir);
console.log("Syntax repair script execution completed.");
