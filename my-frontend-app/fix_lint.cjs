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

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;

  // Fix known unused imports
  const unusedImports = [
    'Clock', 'TrendingUp', 'TrendingDown', 'Star', 'Users', 'RadialBarChart',
    'RadialBar', 'Pause', 'Briefcase', 'CheckCircle', 'Bell', 'Award', 'Target',
    'Lightbulb', 'Filter', 'BookOpen', 'GraduationCap', 'Microscope', 'BarChart3',
    'Palette', 'Trophy', 'adminService', 'motion'
  ];

  // A simple regex to remove unused imports from destructured import blocks
  unusedImports.forEach(imp => {
    // Matches: ` imp,` or `, imp` or `imp` inside `{}` or similar
    // This is a naive replacement but works for most cases
    const regex1 = new RegExp(`\\b${imp}\\s*,?\\s*`, 'g');
    
    // We only want to replace it inside import statements
    content = content.replace(/^import\s+.*?;/gm, (match) => {
        let newMatch = match.replace(regex1, '');
        // Clean up empty braces or trailing commas
        newMatch = newMatch.replace(/\{\s*,\s*/g, '{ ').replace(/,\s*\}/g, ' }').replace(/\{\s*\}/g, '');
        if (newMatch.includes('import ') && !newMatch.includes('{') && !newMatch.includes('from')) {
            return ''; // removed entirely
        }
        if (newMatch.match(/import\s+from/)) return ''; // empty import
        return newMatch;
    });
  });

  // Fix explicit any
  content = content.replace(/: any/g, ': unknown');
  content = content.replace(/<any>/g, '<unknown>');
  content = content.replace(/as any/g, 'as unknown');

  // Fix specific file issues
  if (file.includes('TestHistoryComponent.tsx')) {
    content = content.replace(/const \[selectedTest, setSelectedTest\] = useState<UserTestHistory \| null>\(null\);/g, '');
    content = content.replace(/let filtered = history;/g, 'const filtered = history;');
    content = content.replace(/\/\/ eslint-disable-next-line react-hooks\/exhaustive-deps\n/g, '');
  }
  
  if (file.includes('TestStatsDashboard.tsx') || file.includes('ProfilePage.tsx')) {
      content = content.replace(/\(category: unknown, index: number\)/g, '(category: unknown)');
      content = content.replace(/\(category: any, index: number\)/g, '(category: unknown)');
  }
  
  if (file.includes('CommonTestComponent.tsx')) {
      content = content.replace(/let questionPoints = /g, 'const questionPoints = ');
  }
  
  if (file.includes('AuthContext.tsx')) {
      // no-useless-catch
      content = content.replace(/try {\n\s+await signOut\(auth\);\n\s+} catch \(error\) {\n\s+throw error;\n\s+}/g, 'await signOut(auth);');
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
  }
});
console.log('Lint auto-fix script completed');
