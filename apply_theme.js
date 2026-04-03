const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'apps/mobile/app');

// The exact tokens requested by user
const COLORS = {
    primary: '#B5477A', // Buttons, active tabs, verified, tags, FAB, badges
    accent: '#6B2D50',  // Headings, creator badge, selected bottom nav
    gold: '#C9956A',    // Premium, stars, crown, 1st connection
    bg: '#FDF0F5',      // App bg, surfaces
    surface: '#FDF0F5',
    border: '#E8DDE2',
    muted: '#9E8A92',
    dark: '#2C1E24',    // Body text
};

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Apply exact visual mappings based on user request (Primary, Accent, Gold, Bg)
    // 1. Backgrounds
    content = content.replace(/backgroundColor:\s*['"]#(FFFFFF|1A1A1A|F5F0F2|FDFCFC|FAFAFA)['"]/g, `backgroundColor: '${COLORS.bg}'`);

    // 2. Borders
    content = content.replace(/borderColor:\s*['"]#(333|F8BBD9|E8DDE2)['"]/g, `borderColor: '${COLORS.border}'`);
    content = content.replace(/border(Bottom|Top)Color:\s*['"]#(222|F8BBD9|E8DDE2)['"]/g, `border$1Color: '${COLORS.border}'`);

    // 3. Text & Headings (Burgundy for headings/dark text)
    content = content.replace(/color:\s*['"]#(1A0510|FFFFFF|FAFAFA|2C1E24|1A1A1A)['"]/g, `color: '${COLORS.accent}'`);
    content = content.replace(/color:\s*['"]#(5A4850)['"]/g, `color: '${COLORS.dark}'`); // keeping body dark if needed

    // 4. Primary Accents (Rose Pink #B5477A)
    content = content.replace(/['"]#(C2185B|D4AF37)['"]/g, (match, p1) => {
        // If it was the old gold/pink, replace with primary. BUT wait, Star/Crown needs Gold.
        return `'${COLORS.primary}'`;
    });

    // 5. Muted Text (Icons/Text)
    content = content.replace(/rgba\((255,255,255|26,5,16),\s*(0\.\d+)\)/g, (match, p1, p2) => {
        return `'${COLORS.muted}'`;
    });

    // We specifically need Gold for <Star> and <Crown>
    content = content.replace(/<Star([^>]*?)color=['"]#(B5477A|C2185B|D4AF37)['"]/g, `<Star$1color="${COLORS.gold}"`);
    content = content.replace(/<Crown([^>]*?)color=['"]#(B5477A|C2185B|D4AF37)['"]/g, `<Crown$1color="${COLORS.gold}"`);
    content = content.replace(/<Award([^>]*?)color=['"]#(B5477A|C2185B|D4AF37)['"]/g, `<Award$1color="${COLORS.gold}"`); // for premium

    // Fix status bar
    content = content.replace(/barStyle=['"](light|dark)-content['"]/g, `barStyle="dark-content"`);

    fs.writeFileSync(filePath, content, 'utf8');
}

function traverseDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            processFile(fullPath);
        }
    });
}

traverseDir(targetDir);
console.log("Colors successfully mapped across the mobile app repository.");
