const fs = require('fs');
const path = require('path');

const srcDir = './src';

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getFiles(path.join(dir, file), fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const allFiles = getFiles(srcDir);

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;

  // Merge lucide-react imports
  const lucideRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];?/g;
  let match;
  const allIcons = new Set();
  let firstMatchIndex = -1;
  let firstMatchLength = 0;
  
  while ((match = lucideRegex.exec(content)) !== null) {
      if (firstMatchIndex === -1) {
          firstMatchIndex = match.index;
          firstMatchLength = match[0].length;
      }
      const icons = match[1].split(',').map(i => i.trim()).filter(i => i);
      icons.forEach(i => allIcons.add(i));
  }
  
  if (allIcons.size > 0 && firstMatchIndex !== -1) {
      // Remove all lucide imports
      content = content.replace(lucideRegex, '');
      
      // Insert merged import at the top (where the first one was)
      // Actually just put it after the last import or at the top
      content = `import { ${Array.from(allIcons).join(', ')} } from 'lucide-react';\n` + content.trimStart();
  }
  
  // Fix pdfReportService.ts TS2571
  if (file.includes('pdfReportService.ts')) {
      content = content.replace(/error\.message \|\|/g, "(error as any).message ||");
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
  }
});
console.log('Clean imports script completed');
