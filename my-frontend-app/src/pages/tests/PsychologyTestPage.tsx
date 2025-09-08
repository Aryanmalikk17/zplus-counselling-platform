import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Eye, 
  Target, 
  Activity, 
  Clock, 
  ArrowRight,
  ArrowLeft,
  Zap,
  Lightbulb,
  Users,
  Puzzle,
  Focus,
  HardDrive,
  Shield,
  FileText,
  MessageSquare,
  PenTool,
  Star
} from 'lucide-react';
import { TestConfig, TestResult } from '../../types/testTypes';
import CommonTestComponent from '../../components/tests/CommonTestComponent';
import TestResultDashboard from '../../components/results/TestResultDashboard';

const PsychologyTestPage: React.FC = () => {
  const [selectedTestType, setSelectedTestType] = useState<'iq' | 'memory' | 'attention' | 'cognitive-speed' | 'emotional-processing' | 'problem-solving' | 'tat' | 'wat' | 'srt' | 'sdt' | 'gpe' | null>(null);
  const [showTest, setShowTest] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // IQ Test Configuration
  const iqTestConfig: TestConfig = {
    id: 'iq-test',
    name: 'IQ Assessment',
    description: 'Comprehensive cognitive ability assessment measuring multiple intelligence factors',
    duration: '45 minutes',
    totalPoints: 50,
    passingScore: 70,
    instructions: [
      'Read each question carefully and select the best answer',
      'Work through problems systematically and logically',
      'Skip difficult questions and return to them later if needed',
      'Use scratch paper for calculations if necessary',
      'Focus on accuracy rather than speed for best results'
    ],
    categories: ['logical reasoning', 'pattern recognition', 'mathematical ability', 'spatial intelligence', 'verbal comprehension'],
    questions: [
      {
        id: 'iq1',
        type: 'multiple-choice',
        category: 'logical reasoning',
        question: 'If all roses are flowers and some flowers are red, which conclusion is valid?',
        correctAnswer: 'Some roses might be red',
        points: 10,
        options: [
          { id: 'a', text: 'All roses are red', isCorrect: false },
          { id: 'b', text: 'Some roses might be red', isCorrect: true },
          { id: 'c', text: 'No roses are red', isCorrect: false },
          { id: 'd', text: 'All red things are roses', isCorrect: false }
        ]
      },
      {
        id: 'iq2',
        type: 'multiple-choice',
        category: 'pattern recognition',
        question: 'What comes next in the sequence: 2, 6, 18, 54, ?',
        correctAnswer: '162',
        points: 10,
        options: [
          { id: 'a', text: '108', isCorrect: false },
          { id: 'b', text: '162', isCorrect: true },
          { id: 'c', text: '216', isCorrect: false },
          { id: 'd', text: '324', isCorrect: false }
        ]
      },
      {
        id: 'iq3',
        type: 'multiple-choice',
        category: 'mathematical ability',
        question: 'If 3x + 7 = 22, what is the value of x?',
        correctAnswer: '5',
        points: 10,
        options: [
          { id: 'a', text: '3', isCorrect: false },
          { id: 'b', text: '5', isCorrect: true },
          { id: 'c', text: '7', isCorrect: false },
          { id: 'd', text: '9', isCorrect: false }
        ]
      },
      {
        id: 'iq4',
        type: 'multiple-choice',
        category: 'spatial intelligence',
        question: 'How many cubes are needed to complete this 3x3x3 structure if 8 cubes are missing?',
        correctAnswer: '19',
        points: 10,
        options: [
          { id: 'a', text: '19', isCorrect: true },
          { id: 'b', text: '21', isCorrect: false },
          { id: 'c', text: '23', isCorrect: false },
          { id: 'd', text: '25', isCorrect: false }
        ]
      },
      {
        id: 'iq5',
        type: 'multiple-choice',
        category: 'verbal comprehension',
        question: 'Which word is most similar in meaning to "ubiquitous"?',
        correctAnswer: 'Everywhere',
        points: 10,
        options: [
          { id: 'a', text: 'Rare', isCorrect: false },
          { id: 'b', text: 'Everywhere', isCorrect: true },
          { id: 'c', text: 'Ancient', isCorrect: false },
          { id: 'd', text: 'Mysterious', isCorrect: false }
        ]
      }
    ]
  };

  // Memory Test Configuration
  const memoryTestConfig: TestConfig = {
    id: 'memory-test',
    name: 'Memory Assessment',
    description: 'Evaluate your short-term, long-term, and working memory capabilities',
    duration: '25 minutes',
    totalPoints: 40,
    passingScore: 65,
    instructions: [
      'Pay close attention to sequences and patterns shown',
      'Try to create mental associations to aid memory',
      'Use rehearsal strategies for number sequences',
      'Focus completely during presentation phases',
      'Take breaks between sections if feeling fatigued'
    ],
    categories: ['visual memory', 'verbal memory', 'working memory', 'sequential memory'],
    questions: [
      {
        id: 'mem1',
        type: 'multiple-choice',
        category: 'visual memory',
        question: 'You saw a sequence of colored shapes. Which was the third shape?',
        correctAnswer: 'Green Triangle',
        points: 10,
        options: [
          { id: 'a', text: 'Red Circle', isCorrect: false },
          { id: 'b', text: 'Blue Square', isCorrect: false },
          { id: 'c', text: 'Green Triangle', isCorrect: true },
          { id: 'd', text: 'Yellow Diamond', isCorrect: false }
        ]
      },
      {
        id: 'mem2',
        type: 'multiple-choice',
        category: 'verbal memory',
        question: 'From the word list presented, which word was NOT included?',
        correctAnswer: 'Valley',
        points: 10,
        options: [
          { id: 'a', text: 'Ocean', isCorrect: false },
          { id: 'b', text: 'Mountain', isCorrect: false },
          { id: 'c', text: 'Desert', isCorrect: false },
          { id: 'd', text: 'Valley', isCorrect: true }
        ]
      },
      {
        id: 'mem3',
        type: 'multiple-choice',
        category: 'working memory',
        question: 'Calculate: (7 × 3) + 8 - 5 = ?',
        correctAnswer: '24',
        points: 10,
        options: [
          { id: 'a', text: '24', isCorrect: true },
          { id: 'b', text: '26', isCorrect: false },
          { id: 'c', text: '28', isCorrect: false },
          { id: 'd', text: '30', isCorrect: false }
        ]
      },
      {
        id: 'mem4',
        type: 'multiple-choice',
        category: 'sequential memory',
        question: 'What was the correct order of the number sequence: 4, 7, 2, 9, 1?',
        correctAnswer: '4, 7, 2, 9, 1',
        points: 10,
        options: [
          { id: 'a', text: '4, 7, 2, 9, 1', isCorrect: true },
          { id: 'b', text: '4, 2, 7, 9, 1', isCorrect: false },
          { id: 'c', text: '7, 4, 2, 1, 9', isCorrect: false },
          { id: 'd', text: '2, 4, 7, 1, 9', isCorrect: false }
        ]
      }
    ]
  };

  // Attention Test Configuration
  const attentionTestConfig: TestConfig = {
    id: 'attention-test',
    name: 'Attention & Focus Assessment',
    description: 'Measure your concentration abilities and attention span across different tasks',
    duration: '20 minutes',
    totalPoints: 40,
    passingScore: 60,
    instructions: [
      'Maintain focus throughout each attention task',
      'Respond as quickly and accurately as possible',
      'Ignore distracting elements when instructed',
      'Keep your attention on the target stimuli',
      'Take short breaks between sections if needed'
    ],
    categories: ['sustained attention', 'selective attention', 'divided attention', 'attention switching'],
    questions: [
      {
        id: 'att1',
        type: 'multiple-choice',
        category: 'sustained attention',
        question: 'Count how many times the letter "A" appears in this sequence: BAACDAEAFAGH',
        correctAnswer: '6',
        points: 10,
        options: [
          { id: 'a', text: '4', isCorrect: false },
          { id: 'b', text: '5', isCorrect: false },
          { id: 'c', text: '6', isCorrect: true },
          { id: 'd', text: '7', isCorrect: false }
        ]
      },
      {
        id: 'att2',
        type: 'multiple-choice',
        category: 'selective attention',
        question: 'In a room with background noise, which strategy helps maintain focus?',
        correctAnswer: 'Focus on one conversation',
        points: 10,
        options: [
          { id: 'a', text: 'Listen to everything equally', isCorrect: false },
          { id: 'b', text: 'Focus on one conversation', isCorrect: true },
          { id: 'c', text: 'Switch attention frequently', isCorrect: false },
          { id: 'd', text: 'Avoid all sounds', isCorrect: false }
        ]
      },
      {
        id: 'att3',
        type: 'multiple-choice',
        category: 'divided attention',
        question: 'While driving and talking, your attention is:',
        correctAnswer: 'Rapidly switching between tasks',
        points: 10,
        options: [
          { id: 'a', text: 'Equally split between tasks', isCorrect: false },
          { id: 'b', text: 'Rapidly switching between tasks', isCorrect: true },
          { id: 'c', text: 'Focused only on driving', isCorrect: false },
          { id: 'd', text: 'Completely on conversation', isCorrect: false }
        ]
      },
      {
        id: 'att4',
        type: 'multiple-choice',
        category: 'attention switching',
        question: 'What helps when switching between different types of tasks?',
        correctAnswer: 'Mental reset between tasks',
        points: 10,
        options: [
          { id: 'a', text: 'Quick transitions', isCorrect: false },
          { id: 'b', text: 'Mental reset between tasks', isCorrect: true },
          { id: 'c', text: 'Overlapping task elements', isCorrect: false },
          { id: 'd', text: 'Multitasking approach', isCorrect: false }
        ]
      }
    ]
  };

  // Additional test configurations (simplified for brevity)
  const cognitiveSpeedTestConfig: TestConfig = {
    id: 'cognitive-speed-test',
    name: 'Cognitive Processing Speed',
    description: 'Assess how quickly you can process information and make decisions',
    duration: '15 minutes',
    instructions: ['Work as quickly as possible while maintaining accuracy', 'Complete simple tasks under time pressure'],
    categories: ['processing speed', 'reaction time'],
    questions: [
      {
        id: 'cs1',
        type: 'multiple-choice',
        category: 'processing speed',
        question: 'Quick math: 15 + 27 - 8 = ?',
        options: [
          { id: 'a', text: '32' },
          { id: 'b', text: '34' },
          { id: 'c', text: '36' },
          { id: 'd', text: '38' }
        ]
      }
    ]
  };

  const emotionalProcessingTestConfig: TestConfig = {
    id: 'emotional-processing-test',
    name: 'Emotional Processing',
    description: 'Evaluate how you perceive and process emotional information',
    duration: '18 minutes',
    instructions: ['Identify emotions in facial expressions', 'Consider emotional contexts in scenarios'],
    categories: ['emotion recognition', 'emotional reasoning'],
    questions: [
      {
        id: 'ep1',
        type: 'multiple-choice',
        category: 'emotion recognition',
        question: 'Which emotion is most likely shown by raised eyebrows and wide eyes?',
        options: [
          { id: 'a', text: 'Anger' },
          { id: 'b', text: 'Surprise' },
          { id: 'c', text: 'Sadness' },
          { id: 'd', text: 'Joy' }
        ]
      }
    ]
  };

  const problemSolvingTestConfig: TestConfig = {
    id: 'problem-solving-test',
    name: 'Problem Solving Skills',
    description: 'Assess your ability to analyze problems and develop effective solutions',
    duration: '30 minutes',
    instructions: ['Think through problems step by step', 'Consider multiple solution approaches'],
    categories: ['analytical thinking', 'creative problem solving'],
    questions: [
      {
        id: 'ps1',
        type: 'multiple-choice',
        category: 'analytical thinking',
        question: 'To solve a complex problem, what should you do first?',
        options: [
          { id: 'a', text: 'Try random solutions' },
          { id: 'b', text: 'Break it into smaller parts' },
          { id: 'c', text: 'Ask someone else' },
          { id: 'd', text: 'Give up if too hard' }
        ]
      }
    ]
  };

  // SSB Tests Configurations
  
  // TAT (Thematic Apperception Test) Configuration
  const tatTestConfig: TestConfig = {
    id: 'tat-test',
    name: 'TAT (Thematic Apperception Test)',
    description: 'Assess personality, motivation, and psychological needs through story interpretation',
    duration: '60 minutes',
    instructions: [
      'Look at each picture carefully for 30 seconds before writing',
      'Write a complete story including: What is happening? What led to this? What are the people thinking/feeling? What will happen next?',
      'Write in first person as much as possible',
      'Be creative and express your natural thoughts - there are no right or wrong answers',
      'Each story should be 150-200 words approximately',
      'You have 4 minutes per picture to write your story'
    ],
    categories: ['personality assessment', 'motivation analysis', 'emotional expression', 'creative thinking'],
    questions: [
      {
        id: 'tat_example',
        type: 'text-input',
        category: 'personality assessment',
        question: 'EXAMPLE: Look at this image and write a story about what you see.',
        description: 'Example Response: "I can see a young man looking thoughtfully out of a window. He appears to be contemplating his future career choices. Perhaps he has just finished his studies and is wondering about which path to take. He is thinking about his dreams and aspirations, weighing the pros and cons of different opportunities. His expression shows determination mixed with slight anxiety about the unknown. I believe he will make a well-thought decision and pursue his goals with dedication, eventually finding success in his chosen field."',
        image: '/images/tat/example-contemplation.jpg',
        timeLimit: 240
      },
      {
        id: 'tat1',
        type: 'text-input',
        category: 'personality assessment',
        question: 'Picture 1: Write a story about what you see in this image.',
        description: 'Include: What is happening? What led to this? What are they thinking/feeling? What happens next?',
        image: '/images/tat/picture1-family.jpg',
        timeLimit: 240
      },
      {
        id: 'tat2',
        type: 'text-input',
        category: 'motivation analysis',
        question: 'Picture 2: Describe the story behind this scene.',
        description: 'Focus on the motivations and goals of the people involved.',
        image: '/images/tat/picture2-workplace.jpg',
        timeLimit: 240
      },
      {
        id: 'tat3',
        type: 'text-input',
        category: 'emotional expression',
        question: 'Picture 3: Create a narrative for this situation.',
        description: 'Emphasize the emotions and relationships between characters.',
        image: '/images/tat/picture3-conflict.jpg',
        timeLimit: 240
      },
      {
        id: 'tat4',
        type: 'text-input',
        category: 'creative thinking',
        question: 'Picture 4: Tell the story of this scene.',
        description: 'Be creative and show your imaginative thinking.',
        image: '/images/tat/picture4-adventure.jpg',
        timeLimit: 240
      },
      {
        id: 'tat5',
        type: 'text-input',
        category: 'personality assessment',
        question: 'Picture 5: What story does this image tell you?',
        description: 'Express your interpretation of the situation and characters.',
        image: '/images/tat/picture5-achievement.jpg',
        timeLimit: 240
      }
    ]
  };

  // WAT (Word Association Test) Configuration
  const watTestConfig: TestConfig = {
    id: 'wat-test',
    name: 'WAT (Word Association Test)',
    description: 'Reveal subconscious thoughts and personality traits through word associations',
    duration: '15 minutes',
    instructions: [
      'You will see 60 words one by one for 15 seconds each',
      'Write the FIRST thought that comes to your mind as a sentence',
      'Be spontaneous and honest - do not overthink',
      'Write positive, constructive responses',
      'Example: FRIEND → "A friend is someone who stands by you in difficult times"',
      'Avoid negative or destructive thoughts'
    ],
    categories: ['subconscious thoughts', 'personality traits', 'emotional responses', 'cognitive patterns'],
    questions: [
      {
        id: 'wat_example',
        type: 'text-input',
        category: 'personality traits',
        question: 'EXAMPLE: COURAGE',
        description: 'Example Response: "Courage helps me face challenges and overcome my fears to achieve my goals."',
        timeLimit: 15
      },
      {
        id: 'wat1',
        type: 'text-input',
        category: 'personality traits',
        question: 'LEADERSHIP',
        description: 'Write the first thought or sentence that comes to mind.',
        timeLimit: 15
      },
      {
        id: 'wat2',
        type: 'text-input',
        category: 'emotional responses',
        question: 'FAILURE',
        description: 'Write the first thought or sentence that comes to mind.',
        timeLimit: 15
      },
      {
        id: 'wat3',
        type: 'text-input',
        category: 'cognitive patterns',
        question: 'CHALLENGE',
        description: 'Write the first thought or sentence that comes to mind.',
        timeLimit: 15
      },
      {
        id: 'wat4',
        type: 'text-input',
        category: 'subconscious thoughts',
        question: 'TEAMWORK',
        description: 'Write the first thought or sentence that comes to mind.',
        timeLimit: 15
      },
      {
        id: 'wat5',
        type: 'text-input',
        category: 'personality traits',
        question: 'RESPONSIBILITY',
        description: 'Write the first thought or sentence that comes to mind.',
        timeLimit: 15
      },
      {
        id: 'wat6',
        type: 'text-input',
        category: 'emotional responses',
        question: 'SUCCESS',
        description: 'Write the first thought or sentence that comes to mind.',
        timeLimit: 15
      },
      {
        id: 'wat7',
        type: 'text-input',
        category: 'cognitive patterns',
        question: 'DISCIPLINE',
        description: 'Write the first thought or sentence that comes to mind.',
        timeLimit: 15
      },
      {
        id: 'wat8',
        type: 'text-input',
        category: 'subconscious thoughts',
        question: 'FRIENDSHIP',
        description: 'Write the first thought or sentence that comes to mind.',
        timeLimit: 15
      },
      {
        id: 'wat9',
        type: 'text-input',
        category: 'personality traits',
        question: 'HONESTY',
        description: 'Write the first thought or sentence that comes to mind.',
        timeLimit: 15
      },
      {
        id: 'wat10',
        type: 'text-input',
        category: 'emotional responses',
        question: 'CONFIDENCE',
        description: 'Write the first thought or sentence that comes to mind.',
        timeLimit: 15
      },
      {
        id: 'wat11',
        type: 'text-input',
        category: 'cognitive patterns',
        question: 'DEDICATION',
        description: 'Write the first thought or sentence that comes to mind.',
        timeLimit: 15
      },
      {
        id: 'wat12',
        type: 'text-input',
        category: 'subconscious thoughts',
        question: 'PATRIOTISM',
        description: 'Write the first thought or sentence that comes to mind.',
        timeLimit: 15
      }
    ]
  };

  // SRT (Situation Reaction Test) Configuration
  const srtTestConfig: TestConfig = {
    id: 'srt-test',
    name: 'SRT (Situation Reaction Test)',
    description: 'Evaluate practical intelligence and decision-making in challenging situations',
    duration: '30 minutes',
    instructions: [
      'You will face 60 real-life situations requiring immediate response',
      'Write your spontaneous reaction in 30 seconds per situation',
      'Focus on practical and effective solutions',
      'Show leadership, initiative, and positive attitude',
      'Example: "You are late for an important meeting" → "I will inform immediately, apologize, and ensure it doesn\'t happen again"',
      'Be specific about actions you would take'
    ],
    categories: ['decision making', 'leadership qualities', 'problem solving', 'team management'],
    questions: [
      {
        id: 'srt_example',
        type: 'text-input',
        category: 'leadership qualities',
        question: 'EXAMPLE: You are the group leader and notice one team member is not contributing effectively to the project.',
        description: 'Example Response: "I will talk to the team member privately to understand any issues they might be facing, provide necessary support or guidance, and motivate them to contribute effectively while maintaining team harmony."',
        timeLimit: 30
      },
      {
        id: 'srt1',
        type: 'text-input',
        category: 'leadership qualities',
        question: 'You are leading a team project with a tight deadline, but one team member is consistently missing meetings and not contributing. What would you do?',
        description: 'Describe your specific actions and approach.',
        timeLimit: 30
      },
      {
        id: 'srt2',
        type: 'text-input',
        category: 'decision making',
        question: 'During a group discussion, you notice that a quieter team member has a brilliant idea but is being overlooked. How do you handle this?',
        description: 'Explain your strategy to ensure the idea is heard.',
        timeLimit: 30
      },
      {
        id: 'srt3',
        type: 'text-input',
        category: 'problem solving',
        question: 'You discover a significant error in a project just hours before the final presentation. What steps would you take?',
        description: 'Detail your problem-solving approach.',
        timeLimit: 30
      },
      {
        id: 'srt4',
        type: 'text-input',
        category: 'team management',
        question: 'Two team members are in conflict, affecting the entire group\'s productivity. How would you resolve this?',
        description: 'Describe your conflict resolution strategy.',
        timeLimit: 30
      },
      {
        id: 'srt5',
        type: 'text-input',
        category: 'decision making',
        question: 'You are asked to take charge of a project outside your area of expertise. How would you proceed?',
        description: 'Explain your approach to handling unfamiliar responsibilities.',
        timeLimit: 30
      },
      {
        id: 'srt6',
        type: 'text-input',
        category: 'leadership qualities',
        question: 'Your team is demoralized after a recent failure. How would you motivate them?',
        description: 'Describe your leadership approach to rebuild team confidence.',
        timeLimit: 30
      },
      {
        id: 'srt7',
        type: 'text-input',
        category: 'problem solving',
        question: 'You have limited resources but an ambitious target to achieve. What would be your strategy?',
        description: 'Detail how you would optimize resources to meet objectives.',
        timeLimit: 30
      },
      {
        id: 'srt8',
        type: 'text-input',
        category: 'team management',
        question: 'A senior team member is resistant to new methods you want to implement. How would you handle this?',
        description: 'Explain your approach to managing resistance to change.',
        timeLimit: 30
      },
      {
        id: 'srt9',
        type: 'text-input',
        category: 'decision making',
        question: 'You witness a colleague taking credit for someone else\'s work in a meeting. What would you do?',
        description: 'Describe how you would handle this ethical situation.',
        timeLimit: 30
      },
      {
        id: 'srt10',
        type: 'text-input',
        category: 'leadership qualities',
        question: 'Your team suggests an innovative idea that seems risky but potentially rewarding. How would you evaluate and proceed?',
        description: 'Explain your decision-making process for managing innovation and risk.',
        timeLimit: 30
      }
    ]
  };

  // SDT (Self Description Test) Configuration
  const sdtTestConfig: TestConfig = {
    id: 'sdt-test',
    name: 'SDT (Self Description Test)',
    description: 'Self-assessment of personality traits, values, and behavioral patterns',
    duration: '15 minutes',
    instructions: [
      'Write about yourself in simple, clear language',
      'Be honest and authentic in your responses',
      'Include both strengths and areas for improvement',
      'Provide specific examples where relevant',
      'Write as if you are introducing yourself to someone important',
      'Keep your response balanced and realistic'
    ],
    categories: ['self awareness', 'personal values', 'behavioral patterns', 'life experiences'],
    questions: [
      {
        id: 'sdt_example',
        type: 'text-input',
        category: 'self awareness',
        question: 'EXAMPLE: Describe yourself, your nature, and your personality.',
        description: 'Example Response: "I am a confident and determined person who believes in hard work and helping others. My friends describe me as reliable and optimistic. I enjoy taking on challenges and learning new things. While I can sometimes be impatient, I am working on developing better patience. I believe in honesty and treating everyone with respect. My goal is to serve my country and make a positive difference in society."',
        timeLimit: 900
      },
      {
        id: 'sdt1',
        type: 'text-input',
        category: 'self awareness',
        question: 'Describe yourself - your personality, strengths, and areas where you can improve.',
        description: 'Write about who you are as a person, including your key traits and characteristics.',
        timeLimit: 900
      }
    ]
  };

  // GPE (Group Planning Exercise) Configuration
  const gpeTestConfig: TestConfig = {
    id: 'gpe-test',
    name: 'GPE (Group Planning Exercise)',
    description: 'Assess planning abilities, resource management, and strategic thinking',
    duration: '20 minutes',
    instructions: [
      'You will be given a practical problem requiring detailed planning',
      'Consider all aspects: resources, timeline, manpower, risks, and alternatives',
      'Write a step-by-step plan with clear priorities',
      'Include contingency measures for potential problems',
      'Think practically and realistically about implementation',
      'Show your organizational and leadership capabilities'
    ],
    categories: ['strategic planning', 'resource management', 'risk assessment', 'execution strategy'],
    questions: [
      {
        id: 'gpe_example',
        type: 'text-input',
        category: 'strategic planning',
        question: 'EXAMPLE: You are tasked to organize a blood donation camp in your locality with 50 volunteers and ₹10,000 budget in 10 days.',
        description: 'Example Response: "Day 1-3: Get permissions, identify venue, contact blood bank. Day 4-6: Publicity through posters, social media, local announcements. Train volunteers on duties. Day 7-8: Set up camp, arrange equipment, coordinate with medical team. Day 9: Conduct camp with registration, screening, donation, refreshments. Day 10: Follow-up and report. Budget: ₹4000 publicity, ₹3000 refreshments, ₹2000 logistics, ₹1000 contingency. Risk management: backup venue, extra volunteers, weather protection."',
        timeLimit: 1200
      },
      {
        id: 'gpe1',
        type: 'text-input',
        category: 'strategic planning',
        question: 'You need to organize a disaster relief operation for a flood-affected village. You have 20 volunteers, 3 trucks, ₹1,00,000 budget, and 7 days to plan and execute.',
        description: 'Include: Priority areas, resource allocation, timeline, team assignments, and contingency plans.',
        timeLimit: 1200
      },
      {
        id: 'gpe2',
        type: 'text-input',
        category: 'resource management',
        question: 'Plan a cleanliness drive for your city area involving 100 volunteers, local authorities, and NGOs with a 15-day timeline and ₹50,000 budget.',
        description: 'Detail: Strategy, resource distribution, phases, community involvement, and sustainability measures.',
        timeLimit: 1200
      },
      {
        id: 'gpe3',
        type: 'text-input',
        category: 'execution strategy',
        question: 'Organize a skill development workshop for 200 unemployed youth in your area with 10 trainers, limited facilities, and 30 days timeline.',
        description: 'Include: Course planning, venue arrangement, trainer coordination, material procurement, and follow-up strategy.',
        timeLimit: 1200
      }
    ]
  };

  const testConfigs = {
    'iq': iqTestConfig,
    'memory': memoryTestConfig,
    'attention': attentionTestConfig,
    'cognitive-speed': cognitiveSpeedTestConfig,
    'emotional-processing': emotionalProcessingTestConfig,
    'problem-solving': problemSolvingTestConfig,
    'tat': tatTestConfig,
    'wat': watTestConfig,
    'srt': srtTestConfig,
    'sdt': sdtTestConfig,
    'gpe': gpeTestConfig
  };

  const cognitiveTests = [
    {
      id: 'iq' as const,
      name: 'IQ Assessment',
      description: 'Comprehensive cognitive ability assessment measuring multiple intelligence factors',
      icon: Brain,
      color: 'purple',
      duration: '45 min',
      difficulty: 'Advanced',
      category: 'Cognitive',
      areas: ['Logical Reasoning', 'Pattern Recognition', 'Mathematical Ability', 'Spatial Intelligence', 'Verbal Comprehension'],
      type: 'Intelligence Quotient',
      popular: true
    },
    {
      id: 'memory' as const,
      name: 'Memory Assessment',
      description: 'Evaluate your short-term, long-term, and working memory capabilities',
      icon: HardDrive,
      color: 'blue',
      duration: '25 min',
      difficulty: 'Intermediate',
      category: 'Memory',
      areas: ['Visual Memory', 'Verbal Memory', 'Working Memory', 'Sequential Memory'],
      type: 'Memory Systems',
      popular: true
    },
    {
      id: 'attention' as const,
      name: 'Attention & Focus',
      description: 'Measure your concentration abilities and attention span across different tasks',
      icon: Focus,
      color: 'green',
      duration: '20 min',
      difficulty: 'Intermediate',
      category: 'Attention',
      areas: ['Sustained Attention', 'Selective Attention', 'Divided Attention', 'Attention Switching'],
      type: 'Attention Control',
      popular: true
    },
    {
      id: 'cognitive-speed' as const,
      name: 'Processing Speed',
      description: 'Assess how quickly you can process information and make decisions',
      icon: Zap,
      color: 'yellow',
      duration: '15 min',
      difficulty: 'Beginner',
      category: 'Speed',
      areas: ['Processing Speed', 'Reaction Time'],
      type: 'Speed Assessment',
      popular: false
    },
    {
      id: 'emotional-processing' as const,
      name: 'Emotional Processing',
      description: 'Evaluate how you perceive and process emotional information',
      icon: Activity,
      color: 'red',
      duration: '18 min',
      difficulty: 'Intermediate',
      category: 'Emotional',
      areas: ['Emotion Recognition', 'Emotional Reasoning'],
      type: 'Emotional Intelligence',
      popular: false
    },
    {
      id: 'problem-solving' as const,
      name: 'Problem Solving',
      description: 'Assess your ability to analyze problems and develop effective solutions',
      icon: Puzzle,
      color: 'indigo',
      duration: '30 min',
      difficulty: 'Advanced',
      category: 'Problem Solving',
      areas: ['Analytical Thinking', 'Creative Problem Solving'],
      type: 'Solution Development',
      popular: true
    }
  ];

  const ssbTests = [
    {
      id: 'tat' as const,
      name: 'TAT (Thematic Apperception Test)',
      description: 'Assess personality and motivation through story interpretation of ambiguous images',
      icon: Eye,
      color: 'orange',
      duration: '60 min',
      difficulty: 'Advanced',
      category: 'SSB',
      areas: ['Personality Assessment', 'Motivation Analysis', 'Emotional Expression', 'Creative Thinking'],
      type: 'Projective Test',
      popular: true
    },
    {
      id: 'wat' as const,
      name: 'WAT (Word Association Test)',
      description: 'Reveal subconscious thoughts and personality traits through immediate word responses',
      icon: MessageSquare,
      color: 'teal',
      duration: '15 min',
      difficulty: 'Intermediate',
      category: 'SSB',
      areas: ['Subconscious Thoughts', 'Personality Traits', 'Emotional Responses', 'Cognitive Patterns'],
      type: 'Association Test',
      popular: true
    },
    {
      id: 'srt' as const,
      name: 'SRT (Situation Reaction Test)',
      description: 'Evaluate practical intelligence and decision-making in challenging scenarios',
      icon: Target,
      color: 'cyan',
      duration: '30 min',
      difficulty: 'Advanced',
      category: 'SSB',
      areas: ['Decision Making', 'Leadership Qualities', 'Problem Solving', 'Team Management'],
      type: 'Situational Assessment',
      popular: true
    },
    {
      id: 'sdt' as const,
      name: 'SDT (Self Description Test)',
      description: 'Comprehensive self-assessment of personality, values, and behavioral patterns',
      icon: PenTool,
      color: 'rose',
      duration: '45 min',
      difficulty: 'Intermediate',
      category: 'SSB',
      areas: ['Self Awareness', 'Personal Values', 'Behavioral Patterns', 'Life Experiences'],
      type: 'Self Assessment',
      popular: false
    },
    {
      id: 'gpe' as const,
      name: 'GPE (Group Planning Exercise)',
      description: 'Assess strategic planning, resource management, and execution capabilities',
      icon: Shield,
      color: 'violet',
      duration: '45 min',
      difficulty: 'Advanced',
      category: 'SSB',
      areas: ['Strategic Planning', 'Resource Management', 'Risk Assessment', 'Execution Strategy'],
      type: 'Planning Exercise',
      popular: false
    }
  ];

  const categories = ['All', 'Cognitive', 'Memory', 'Attention', 'Speed', 'Emotional', 'Problem Solving', 'SSB'];
  
  const allTests = [...cognitiveTests, ...ssbTests];
  const filteredTests = allTests.filter(test => 
    selectedCategory === 'All' || test.category === selectedCategory
  );

  const getColorClasses = (color: string) => {
    const colors = {
      purple: 'bg-purple-100 text-purple-500 border-purple-200',
      blue: 'bg-blue-100 text-blue-500 border-blue-200',
      green: 'bg-green-100 text-green-500 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-500 border-yellow-200',
      red: 'bg-red-100 text-red-500 border-red-200',
      indigo: 'bg-indigo-100 text-indigo-500 border-indigo-200',
      orange: 'bg-orange-100 text-orange-500 border-orange-200',
      teal: 'bg-teal-100 text-teal-500 border-teal-200',
      cyan: 'bg-cyan-100 text-cyan-500 border-cyan-200',
      rose: 'bg-rose-100 text-rose-500 border-rose-200',
      violet: 'bg-violet-100 text-violet-500 border-violet-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-600',
      'Intermediate': 'bg-yellow-100 text-yellow-600',
      'Advanced': 'bg-red-100 text-red-600'
    };
    return colors[difficulty as keyof typeof colors] || colors['Intermediate'];
  };

  const handleTestTypeSelect = (type: typeof selectedTestType) => {
    setSelectedTestType(type);
    setShowTest(true);
  };

  const handleTestComplete = (result: TestResult) => {
    setTestResult(result);
    setShowTest(false);
  };

  const handleTestExit = () => {
    setShowTest(false);
    setSelectedTestType(null);
    setTestResult(null);
  };

  const resetTest = () => {
    setTestResult(null);
    setSelectedTestType(null);
    setShowTest(false);
  };

  if (showTest && selectedTestType) {
    const config = testConfigs[selectedTestType];
    return (
      <CommonTestComponent
        testConfig={config}
        onTestComplete={handleTestComplete}
        onTestExit={handleTestExit}
      />
    );
  }

  if (testResult) {
    return (
      <TestResultDashboard
        result={testResult}
        onRetakeTest={resetTest}
        onBackToTests={() => window.history.back()}
      />
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Back Button & Header */}
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Tests
            </button>
            
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Psychology Tests
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Comprehensive cognitive assessments and SSB psychological evaluations for personal development and career guidance
              </p>
              <div className="flex items-center justify-center space-x-6 text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  15-60 minutes
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Free
                </div>
                <div className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Scientifically Validated
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="text-center mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Categories</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-purple-500 text-white shadow-md transform scale-105'
                      : 'bg-white text-gray-600 hover:text-purple-500 hover:bg-purple-50 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Cognitive Tests Section */}
          {(selectedCategory === 'All' || selectedCategory !== 'SSB') && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Cognitive & General Psychology Tests</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cognitiveTests.filter(test => selectedCategory === 'All' || test.category === selectedCategory).map((test, index) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative"
                  >
                    {test.popular && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                        Popular
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${getColorClasses(test.color)}`}>
                        <test.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {test.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {test.description}
                      </p>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                        {test.difficulty}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">{test.type}</span>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">Assessment Areas:</h4>
                      <div className="space-y-2">
                        {test.areas.slice(0, 4).map((area) => (
                          <div key={area} className="flex items-center text-gray-600 text-xs">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2" />
                            {area}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-6 bg-gray-50 rounded-lg p-2">
                      <span>⏱️ {test.duration}</span>
                      <span>🧠 {test.category}</span>
                      <span>🎯 {test.difficulty}</span>
                    </div>

                    <button
                      onClick={() => handleTestTypeSelect(test.id)}
                      className="btn-primary w-full text-sm"
                    >
                      Start {test.name}
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* SSB Tests Section */}
          {(selectedCategory === 'All' || selectedCategory === 'SSB') && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">SSB Psychological Tests</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Services Selection Board psychological assessments designed to evaluate personality traits, 
                  leadership qualities, and decision-making abilities for defense and government services.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ssbTests.map((test, index) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative border-l-4 border-orange-400"
                  >
                    {test.popular && (
                      <div className="absolute -top-2 -right-2 bg-orange-400 text-orange-900 text-xs font-bold px-2 py-1 rounded-full">
                        SSB
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${getColorClasses(test.color)}`}>
                        <test.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {test.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {test.description}
                      </p>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                        {test.difficulty}
                      </span>
                      <span className="text-xs text-orange-600 font-medium bg-orange-100 px-2 py-1 rounded">{test.type}</span>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">Assessment Areas:</h4>
                      <div className="space-y-2">
                        {test.areas.slice(0, 4).map((area) => (
                          <div key={area} className="flex items-center text-gray-600 text-xs">
                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2" />
                            {area}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-6 bg-orange-50 rounded-lg p-2">
                      <span>⏱️ {test.duration}</span>
                      <span>🛡️ SSB</span>
                      <span>🎯 {test.difficulty}</span>
                    </div>

                    <button
                      onClick={() => handleTestTypeSelect(test.id)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full text-sm"
                    >
                      Start {test.name.split(' ')[0]}
                      <ArrowRight className="ml-2 h-3 w-3 inline" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <div className="text-center">
                <Brain className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Understanding Psychological Assessment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Cognitive Abilities</h4>
                    <p>Measure core mental processes including reasoning, memory, attention, and processing speed</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">SSB Assessments</h4>
                    <p>Specialized tests for defense services evaluating leadership, personality, and decision-making</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Personal Development</h4>
                    <p>Apply results to career planning, self-improvement, and professional growth strategies</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-blue-100 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Cognitive Tests:</strong> Scientific assessments measuring various aspects of mental functioning and intelligence.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-100 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>SSB Tests:</strong> Specialized evaluations used by defense services to assess personality and leadership potential.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PsychologyTestPage;