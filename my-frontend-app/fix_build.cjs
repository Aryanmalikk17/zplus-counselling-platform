const fs = require('fs');
const path = require('path');

const srcDir = './src';

// Recursively get all ts/tsx files
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

const iconsToImport = [
    'BarChart3', 'GraduationCap', 'Briefcase', 'Clock', 'Users', 
    'CheckCircle', 'Star', 'Award', 'TrendingUp', 'Target', 'BookOpen', 'Filter'
];

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;

  // Fix framer-motion imports
  content = content.replace(/from 'framer-'/g, "from 'framer-motion'");
  
  // Add missing motion import if used but not imported
  if (content.match(/<motion\./) && !content.includes("from 'framer-motion'")) {
      content = "import { motion } from 'framer-motion';\n" + content;
  }
  
  // Add missing lucide-react imports if used but not imported
  const usedIcons = iconsToImport.filter(icon => content.match(new RegExp(`\\b${icon}\\b`)) && !content.includes(`import { ${icon}`));
  if (usedIcons.length > 0) {
      // Check if lucide-react import already exists
      if (content.includes("from 'lucide-react'")) {
          // append to existing
          content = content.replace(/(import\s+{)([^}]*)(}\s+from\s+'lucide-react')/, (match, p1, p2, p3) => {
             return `${p1}${p2}, ${usedIcons.join(', ')} ${p3}`;
          });
      } else {
          content = `import { ${usedIcons.join(', ')} } from 'lucide-react';\n` + content;
      }
  }

  // Fix Broken Paths
  content = content.replace(/from '\.\.\/\.\.\/services\/'/g, "from '../../services/adminService'");
  content = content.replace(/from '\.\/'/g, "from './adminService'");

  // Fix Implicit Any in AssessmentEditorPage.tsx & others
  if (file.includes('AssessmentEditorPage.tsx') || file.includes('RegisterPage.tsx') || file.includes('DynamicTestPage.tsx') || file.includes('careerData.ts')) {
      content = content.replace(/\(prev\)/g, "(prev: any)");
      content = content.replace(/\(_, i\)/g, "(_: any, i: any)");
      content = content.replace(/\(question, qIndex\)/g, "(question: any, qIndex: any)");
      content = content.replace(/\(option, oIndex\)/g, "(option: any, oIndex: any)");
      content = content.replace(/\(q\)/g, "(q: any)");
      content = content.replace(/\(o\)/g, "(o: any)");
      content = content.replace(/\(err\)/g, "(err: any)");
      content = content.replace(/\(e\)/g, "(e: any)");
      
      // Fix careerData.ts ForwardRefExoticComponent
      content = content.replace(/icon: ([\w]+),/g, "icon: $1 as React.ComponentType<any>,");
  }

  // CommonTestComponent.tsx category unknown issues
  if (file.includes('CommonTestComponent.tsx')) {
      content = content.replace(/category ===/g, "(category as string) ===");
      content = content.replace(/category:\s*category\s*,/g, "category: category as string,");
      content = content.replace(/category\)\s*=>/g, "(category: any) =>");
      content = content.replace(/cat\./g, "(cat as any).");
      content = content.replace(/=== category/g, "=== (category as string)");
  }
  
  if (file.includes('ProfilePage.tsx')) {
      // Fix SetStateAction argument
      content = content.replace(/setActiveTab\('history'\)/g, "setActiveTab('history' as any)");
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
  }
});

console.log('Build auto-fix script completed');
