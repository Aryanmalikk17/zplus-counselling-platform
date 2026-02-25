import { BookOpen, GraduationCap, Target, Microscope, BarChart3, Palette, Trophy } from 'lucide-react';
import { TestConfig } from '../types/testTypes';

// Primary Education Test Configuration
export const primaryTestConfig: TestConfig = {
    id: 'primary-education',
    name: 'Primary Education Assessment',
    description: 'Basic educational skills assessment for elementary level students',
    duration: '30 minutes',
    instructions: [
        'Read each question carefully before answering',
        'Choose the best answer from the given options',
        'Take your time to think through each question',
        'If you don\'t know an answer, make your best guess',
        'Complete all questions to get accurate results'
    ],
    categories: ['mathematics', 'language', 'science basics', 'general knowledge'],
    questions: [
        {
            id: 'pe1',
            type: 'multiple-choice',
            category: 'mathematics',
            question: 'What is 15 + 23?',
            options: [
                { id: 'a', text: '35' },
                { id: 'b', text: '38' },
                { id: 'c', text: '41' },
                { id: 'd', text: '33' }
            ]
        },
        {
            id: 'pe2',
            type: 'multiple-choice',
            category: 'language',
            question: 'Which word is spelled correctly?',
            options: [
                { id: 'a', text: 'Recieve' },
                { id: 'b', text: 'Receive' },
                { id: 'c', text: 'Recive' },
                { id: 'd', text: 'Receeve' }
            ]
        },
        {
            id: 'pe3',
            type: 'multiple-choice',
            category: 'science basics',
            question: 'How many legs does a spider have?',
            options: [
                { id: 'a', text: '6' },
                { id: 'b', text: '8' },
                { id: 'c', text: '10' },
                { id: 'd', text: '4' }
            ]
        }
    ]
};

// Secondary Education Test Configuration
export const secondaryTestConfig: TestConfig = {
    id: 'secondary-education',
    name: 'Secondary Education Assessment',
    description: 'Comprehensive assessment for middle and high school level knowledge',
    duration: '45 minutes',
    instructions: [
        'Answer questions across multiple subjects',
        'Apply critical thinking and analytical skills',
        'Show your working for mathematical problems',
        'Read passages carefully for comprehension questions',
        'Manage your time effectively across all sections'
    ],
    categories: ['advanced mathematics', 'literature', 'sciences', 'social studies'],
    questions: [
        {
            id: 'se1',
            type: 'multiple-choice',
            category: 'advanced mathematics',
            question: 'If x + 5 = 12, what is the value of x?',
            options: [
                { id: 'a', text: '7' },
                { id: 'b', text: '17' },
                { id: 'c', text: '5' },
                { id: 'd', text: '12' }
            ]
        },
        {
            id: 'se2',
            type: 'multiple-choice',
            category: 'sciences',
            question: 'What is the chemical symbol for gold?',
            options: [
                { id: 'a', text: 'Go' },
                { id: 'b', text: 'Gd' },
                { id: 'c', text: 'Au' },
                { id: 'd', text: 'Ag' }
            ]
        }
    ]
};

// Higher Education Test Configuration
export const higherTestConfig: TestConfig = {
    id: 'higher-education',
    name: 'Higher Education Readiness',
    description: 'Assessment of college and university level academic preparedness',
    duration: '60 minutes',
    instructions: [
        'Demonstrate advanced critical thinking skills',
        'Analyze complex problems and scenarios',
        'Show depth of knowledge in chosen subjects',
        'Apply theoretical concepts to practical situations',
        'Present well-reasoned arguments and solutions'
    ],
    categories: ['critical thinking', 'research skills', 'academic writing', 'problem solving'],
    questions: [
        {
            id: 'he1',
            type: 'text-input',
            category: 'critical thinking',
            question: 'Analyze the statement: "Technology has made communication easier but relationships more difficult." Provide arguments for both sides.',
            description: 'Write a balanced analysis considering multiple perspectives.'
        },
        {
            id: 'he2',
            type: 'multiple-choice',
            category: 'research skills',
            question: 'Which is the most reliable source for academic research?',
            options: [
                { id: 'a', text: 'Wikipedia articles' },
                { id: 'b', text: 'Peer-reviewed journals' },
                { id: 'c', text: 'Blog posts' },
                { id: 'd', text: 'Social media posts' }
            ]
        }
    ]
};

// Science Stream Test Configuration
export const scienceTestConfig: TestConfig = {
    id: 'science-stream',
    name: 'Science Stream Assessment',
    description: 'Comprehensive evaluation of Physics, Chemistry, Biology, and Mathematics',
    duration: '50 minutes',
    instructions: [
        'Apply scientific principles and formulas',
        'Show calculations and reasoning clearly',
        'Understand concepts across all science subjects',
        'Demonstrate problem-solving in scientific contexts',
        'Use scientific terminology accurately'
    ],
    categories: ['physics', 'chemistry', 'biology', 'mathematics'],
    questions: [
        {
            id: 'sc1',
            type: 'multiple-choice',
            category: 'physics',
            question: 'What is the SI unit of force?',
            options: [
                { id: 'a', text: 'Joule' },
                { id: 'b', text: 'Newton' },
                { id: 'c', text: 'Watt' },
                { id: 'd', text: 'Pascal' }
            ]
        },
        {
            id: 'sc2',
            type: 'multiple-choice',
            category: 'chemistry',
            question: 'What is the molecular formula of water?',
            options: [
                { id: 'a', text: 'H2O2' },
                { id: 'b', text: 'HO2' },
                { id: 'c', text: 'H2O' },
                { id: 'd', text: 'H3O' }
            ]
        },
        {
            id: 'sc3',
            type: 'multiple-choice',
            category: 'biology',
            question: 'Which organelle is known as the powerhouse of the cell?',
            options: [
                { id: 'a', text: 'Nucleus' },
                { id: 'b', text: 'Mitochondria' },
                { id: 'c', text: 'Ribosome' },
                { id: 'd', text: 'Chloroplast' }
            ]
        }
    ]
};

// Commerce Stream Test Configuration
export const commerceTestConfig: TestConfig = {
    id: 'commerce-stream',
    name: 'Commerce Stream Assessment',
    description: 'Business, Economics, and Accounting knowledge evaluation',
    duration: '45 minutes',
    instructions: [
        'Apply business and economic principles',
        'Calculate financial problems accurately',
        'Understand market dynamics and business concepts',
        'Demonstrate knowledge of accounting principles',
        'Analyze business scenarios effectively'
    ],
    categories: ['accounting', 'economics', 'business studies', 'mathematics'],
    questions: [
        {
            id: 'co1',
            type: 'multiple-choice',
            category: 'accounting',
            question: 'In double-entry bookkeeping, every transaction affects:',
            options: [
                { id: 'a', text: 'One account only' },
                { id: 'b', text: 'At least two accounts' },
                { id: 'c', text: 'Three accounts' },
                { id: 'd', text: 'The cash account only' }
            ]
        },
        {
            id: 'co2',
            type: 'multiple-choice',
            category: 'economics',
            question: 'What happens to demand when the price of a product increases?',
            options: [
                { id: 'a', text: 'Demand increases' },
                { id: 'b', text: 'Demand decreases' },
                { id: 'c', text: 'Demand remains the same' },
                { id: 'd', text: 'Supply increases' }
            ]
        }
    ]
};

// Arts Stream Test Configuration
export const artsTestConfig: TestConfig = {
    id: 'arts-stream',
    name: 'Arts Stream Assessment',
    description: 'Humanities, Literature, History, and Social Sciences evaluation',
    duration: '50 minutes',
    instructions: [
        'Demonstrate understanding of humanities subjects',
        'Analyze literary works and historical events',
        'Show knowledge of social sciences and philosophy',
        'Write comprehensive and analytical responses',
        'Connect concepts across different humanities disciplines'
    ],
    categories: ['literature', 'history', 'political science', 'philosophy'],
    questions: [
        {
            id: 'ar1',
            type: 'multiple-choice',
            category: 'literature',
            question: 'Who wrote the novel "Pride and Prejudice"?',
            options: [
                { id: 'a', text: 'Charlotte Brontë' },
                { id: 'b', text: 'Jane Austen' },
                { id: 'c', text: 'Emily Dickinson' },
                { id: 'd', text: 'Virginia Woolf' }
            ]
        },
        {
            id: 'ar2',
            type: 'multiple-choice',
            category: 'history',
            question: 'In which year did India gain independence?',
            options: [
                { id: 'a', text: '1945' },
                { id: 'b', text: '1947' },
                { id: 'c', text: '1948' },
                { id: 'd', text: '1950' }
            ]
        }
    ]
};

// Sports Assessment Test Configuration
export const sportsTestConfig: TestConfig = {
    id: 'sports-assessment',
    name: 'Sports Knowledge & Fitness Assessment',
    description: 'Physical education, sports knowledge, and fitness awareness evaluation',
    duration: '35 minutes',
    instructions: [
        'Answer questions about various sports and games',
        'Demonstrate knowledge of fitness and health principles',
        'Show understanding of sports rules and regulations',
        'Apply knowledge of physical training and nutrition',
        'Consider both theoretical and practical aspects of sports'
    ],
    categories: ['sports knowledge', 'fitness principles', 'nutrition', 'sports psychology'],
    questions: [
        {
            id: 'sp1',
            type: 'multiple-choice',
            category: 'sports knowledge',
            question: 'How many players are there in a basketball team on the court?',
            options: [
                { id: 'a', text: '4' },
                { id: 'b', text: '5' },
                { id: 'c', text: '6' },
                { id: 'd', text: '7' }
            ]
        },
        {
            id: 'sp2',
            type: 'multiple-choice',
            category: 'fitness principles',
            question: 'Which is the best time to stretch muscles?',
            options: [
                { id: 'a', text: 'Before warming up' },
                { id: 'b', text: 'After warming up' },
                { id: 'c', text: 'Only after exercise' },
                { id: 'd', text: 'Anytime during exercise' }
            ]
        }
    ]
};

export const testDetails = [
    {
        id: 'primary' as const,
        name: 'Primary Education',
        description: 'Basic educational skills for elementary level students',
        icon: BookOpen,
        color: 'blue',
        duration: '30 min',
        questions: '3 subjects',
        areas: ['Mathematics', 'Language', 'Science Basics', 'General Knowledge'],
        type: 'Elementary level',
        level: 'Grades 1-5'
    },
    {
        id: 'secondary' as const,
        name: 'Secondary Education',
        description: 'Middle and high school level comprehensive assessment',
        icon: GraduationCap,
        color: 'green',
        duration: '45 min',
        questions: '4 subjects',
        areas: ['Advanced Math', 'Literature', 'Sciences', 'Social Studies'],
        type: 'Secondary level',
        level: 'Grades 6-12'
    },
    {
        id: 'higher' as const,
        name: 'Higher Education',
        description: 'College and university readiness assessment',
        icon: Target,
        color: 'purple',
        duration: '60 min',
        questions: '4 areas',
        areas: ['Critical Thinking', 'Research Skills', 'Academic Writing', 'Problem Solving'],
        type: 'University level',
        level: 'College+'
    },
    {
        id: 'science' as const,
        name: 'Science Stream',
        description: 'Physics, Chemistry, Biology, and Mathematics evaluation',
        icon: Microscope,
        color: 'red',
        duration: '50 min',
        questions: '4 subjects',
        areas: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
        type: 'Science specialization',
        level: 'Grade 11-12'
    },
    {
        id: 'commerce' as const,
        name: 'Commerce Stream',
        description: 'Business, Economics, and Accounting knowledge test',
        icon: BarChart3,
        color: 'yellow',
        duration: '45 min',
        questions: '4 subjects',
        areas: ['Accounting', 'Economics', 'Business Studies', 'Mathematics'],
        type: 'Commerce specialization',
        level: 'Grade 11-12'
    },
    {
        id: 'arts' as const,
        name: 'Arts Stream',
        description: 'Humanities, Literature, and Social Sciences assessment',
        icon: Palette,
        color: 'pink',
        duration: '50 min',
        questions: '4 subjects',
        areas: ['Literature', 'History', 'Political Science', 'Philosophy'],
        type: 'Arts specialization',
        level: 'Grade 11-12'
    },
    {
        id: 'sports' as const,
        name: 'Sports Assessment',
        description: 'Physical education and sports knowledge evaluation',
        icon: Trophy,
        color: 'orange',
        duration: '35 min',
        questions: '4 areas',
        areas: ['Sports Knowledge', 'Fitness Principles', 'Nutrition', 'Sports Psychology'],
        type: 'Physical education',
        level: 'All levels'
    }
];
