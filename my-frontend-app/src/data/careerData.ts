import { Briefcase, TrendingUp, Users, Target, BookOpen, CheckCircle, Brain, BarChart3, Globe, MapPin, DollarSign, Play, MessageSquare, Video, Download, Lightbulb, Heart, Building, GraduationCap, Star } from 'lucide-react';
export interface CareerResourceItem {
    title: string;
    description: string;
    action: string;
    free?: boolean;
    price?: string;
    time?: string;
}

export interface CareerResource {
    type: string;
    icon: React.ComponentType<unknown>;
    items: CareerResourceItem[];
}

export const assessmentQuestions = [
    {
        question: "What type of work environment do you prefer?",
        options: [
            "Collaborative team setting",
            "Independent work with minimal supervision",
            "Fast-paced, dynamic environment",
            "Structured, organized workplace"
        ],
        categories: ["teamwork", "independence", "pace", "structure"]
    },
    {
        question: "Which activity sounds most appealing to you?",
        options: [
            "Solving complex problems",
            "Creating something new",
            "Helping people",
            "Leading and organizing"
        ],
        categories: ["analytical", "creative", "service", "leadership"]
    },
    {
        question: "What motivates you most in a career?",
        options: [
            "Making a positive impact on society",
            "Financial success and stability",
            "Personal growth and learning",
            "Recognition and achievement"
        ],
        categories: ["impact", "financial", "growth", "recognition"]
    },
    {
        question: "How do you prefer to communicate?",
        options: [
            "Writing and documentation",
            "Face-to-face conversations",
            "Presentations and public speaking",
            "Visual and creative mediums"
        ],
        categories: ["written", "interpersonal", "public", "visual"]
    },
    {
        question: "Which work schedule appeals to you most?",
        options: [
            "Traditional 9-5 schedule",
            "Flexible hours",
            "Project-based deadlines",
            "Varied, unpredictable schedule"
        ],
        categories: ["traditional", "flexible", "project", "varied"]
    }
];

export const careerServices = [
    {
        icon: Target as React.ComponentType<any>,
        title: 'Career Assessment',
        description: 'Discover your ideal career path through comprehensive personality and aptitude testing.',
        link: '/test/career',
        features: ['Personality Analysis', 'Skills Assessment', 'Interest Mapping', 'Career Matching']
    },
    {
        icon: BookOpen as React.ComponentType<any>,
        title: 'Career Counseling',
        description: 'Get personalized career guidance from our certified career counselors.',
        price: '₹2,999',
        features: ['1-on-1 Sessions', 'Personalized Plan', 'Industry Insights', 'Goal Setting']
    },
    {
        icon: Users as React.ComponentType<any>,
        title: 'Interview Preparation',
        description: 'Master job interviews with our specialized training programs.',
        link: '/interview/gd',
        features: ['Mock Interviews', 'HR Rounds', 'Technical Prep', 'Body Language']
    },
    {
        icon: TrendingUp as React.ComponentType<any>,
        title: 'Skill Development',
        description: 'Identify and develop the skills needed for your target career.',
        price: '₹1,999',
        features: ['Skill Gap Analysis', 'Learning Path', 'Certification Prep', 'Portfolio Building']
    }
];

export const careerPaths = [
    {
        name: 'Technology & IT',
        roles: ['Software Engineer', 'Data Scientist', 'Product Manager', 'DevOps Engineer'],
        growth: '+15%',
        salary: '₹6-25L',
        icon: Brain
    },
    {
        name: 'Healthcare',
        roles: ['Doctor', 'Nurse', 'Medical Researcher', 'Healthcare Admin'],
        growth: '+8%',
        salary: '₹4-20L',
        icon: Heart
    },
    {
        name: 'Education',
        roles: ['Teacher', 'Principal', 'Educational Consultant', 'Content Developer'],
        growth: '+5%',
        salary: '₹3-12L',
        icon: GraduationCap
    },
    {
        name: 'Business & Finance',
        roles: ['Financial Analyst', 'Marketing Manager', 'Consultant', 'Business Analyst'],
        growth: '+12%',
        salary: '₹5-18L',
        icon: BarChart3
    },
    {
        name: 'Creative Arts',
        roles: ['Graphic Designer', 'Content Creator', 'Photographer', 'UX Designer'],
        growth: '+10%',
        salary: '₹3-15L',
        icon: Lightbulb
    },
    {
        name: 'Government & Defense',
        roles: ['Civil Servant', 'Military Officer', 'Policy Analyst', 'Public Admin'],
        growth: '+7%',
        salary: '₹4-16L',
        icon: Building
    }
];

export const successStories = [
    {
        name: 'Rahul Sharma',
        role: 'Software Engineer at Google',
        content: 'The career assessment helped me understand my strengths and guided me towards a fulfilling tech career. The counseling sessions were invaluable.',
        rating: 5,
        image: '👨‍💻',
        salary: '₹28L',
        location: 'Bangalore'
    },
    {
        name: 'Priya Patel',
        role: 'Marketing Manager at Unilever',
        content: 'Thanks to ZPluse Counselling, I found the perfect career that matches my personality and interests. The interview prep was excellent.',
        rating: 5,
        image: '👩‍💼',
        salary: '₹15L',
        location: 'Mumbai'
    },
    {
        name: 'Dr. Amit Kumar',
        role: 'Cardiologist',
        content: 'The guidance I received was invaluable in helping me choose the right medical specialization and prepare for entrance exams.',
        rating: 5,
        image: '👨‍⚕️',
        salary: '₹22L',
        location: 'Delhi'
    }
];

export const jobMarketTrends = [
    {
        title: 'Remote Work Revolution',
        description: 'Remote and hybrid work models have increased by 300% post-pandemic',
        trend: '+300%',
        icon: Globe as React.ComponentType<any>,
        color: 'blue'
    },
    {
        title: 'AI & Machine Learning',
        description: 'Fastest growing field with 40% job growth annually',
        trend: '+40%',
        icon: Brain as React.ComponentType<any>,
        color: 'purple'
    },
    {
        title: 'Green Jobs',
        description: 'Sustainable energy and environmental roles growing rapidly',
        trend: '+25%',
        icon: Lightbulb as React.ComponentType<any>,
        color: 'green'
    },
    {
        title: 'Healthcare Expansion',
        description: 'Aging population driving demand for healthcare professionals',
        trend: '+18%',
        icon: Heart as React.ComponentType<any>,
        color: 'red'
    }
];

export const industrySalaryData = [
    { industry: 'Technology', entry: '₹8L', mid: '₹18L', senior: '₹35L', locations: ['Bangalore', 'Hyderabad', 'Pune'] },
    { industry: 'Finance', entry: '₹6L', mid: '₹15L', senior: '₹30L', locations: ['Mumbai', 'Delhi', 'Bangalore'] },
    { industry: 'Healthcare', entry: '₹5L', mid: '₹12L', senior: '₹25L', locations: ['All Cities', 'Metro Areas'] },
    { industry: 'Education', entry: '₹4L', mid: '₹8L', senior: '₹15L', locations: ['All Cities', 'Tier 2 Cities'] },
    { industry: 'Marketing', entry: '₹5L', mid: '₹12L', senior: '₹22L', locations: ['Mumbai', 'Delhi', 'Bangalore'] },
    { industry: 'Design', entry: '₹4L', mid: '₹10L', senior: '₹20L', locations: ['Bangalore', 'Mumbai', 'Pune'] }
];

export const careerResources: CareerResource[] = [
    {
        type: 'Free Resources',
        icon: Download as React.ComponentType<any>,
        items: [
            { title: 'Resume Templates', description: '50+ Professional Templates', action: 'Download', free: true },
            { title: 'Interview Guide', description: 'Complete Preparation Manual', action: 'Download', free: true },
            { title: 'Salary Calculator', description: 'Industry Benchmarking Tool', action: 'Use Tool', free: true },
            { title: 'Career Roadmaps', description: 'Step-by-step Career Paths', action: 'View', free: true }
        ]
    },
    {
        type: 'Video Courses',
        icon: Play as React.ComponentType<any>,
        items: [
            { title: 'LinkedIn Optimization', description: '2-hour comprehensive course', action: 'Watch', price: '₹999' },
            { title: 'Interview Mastery', description: '5-hour complete training', action: 'Enroll', price: '₹1,999' },
            { title: 'Negotiation Skills', description: '3-hour expert guidance', action: 'Start', price: '₹1,499' },
            { title: 'Personal Branding', description: '4-hour brand building', action: 'Begin', price: '₹1,799' }
        ]
    },
    {
        type: 'Live Sessions',
        icon: Video as React.ComponentType<any>,
        items: [
            { title: 'Career Q&A Sessions', description: 'Weekly expert interactions', action: 'Join', time: 'Every Friday 7 PM' },
            { title: 'Industry Insider Talks', description: 'Monthly industry experts', action: 'Register', time: 'First Saturday' },
            { title: 'Mock Interview Practice', description: 'Real-time feedback sessions', action: 'Book', price: '₹799' },
            { title: 'Group Counseling', description: 'Peer learning sessions', action: 'Participate', price: '₹499' }
        ]
    }
];

export const careerTools = [
    {
        name: 'Salary Benchmark Tool',
        description: 'Compare salaries across industries and locations',
        icon: DollarSign as React.ComponentType<any>,
        features: ['Real-time data', 'Location-based', 'Experience level filters'],
        action: 'Use Tool',
        popular: true
    },
    {
        name: 'Skills Gap Analyzer',
        description: 'Identify skills needed for your target role',
        icon: Target as React.ComponentType<any>,
        features: ['Skill mapping', 'Learning resources', 'Progress tracking'],
        action: 'Analyze Skills'
    },
    {
        name: 'Career Path Planner',
        description: 'Create step-by-step career progression plan',
        icon: MapPin as React.ComponentType<any>,
        features: ['Goal setting', 'Timeline creation', 'Milestone tracking'],
        action: 'Plan Career'
    },
    {
        name: 'Interview Simulator',
        description: 'Practice with AI-powered interview questions',
        icon: MessageSquare as React.ComponentType<any>,
        features: ['AI feedback', 'Multiple formats', 'Performance analytics'],
        action: 'Start Practice',
        new: true
    }
];

export const expertCounselors = [
    {
        name: 'Dr. Rajesh Kumar',
        specialization: 'Technology & Engineering Careers',
        experience: '15+ Years',
        rating: 4.9,
        sessions: 2500,
        image: '👨‍💼',
        expertise: ['Software Engineering', 'Data Science', 'Product Management'],
        languages: ['English', 'Hindi', 'Tamil']
    },
    {
        name: 'Ms. Priya Sharma',
        specialization: 'Healthcare & Medical Careers',
        experience: '12+ Years',
        rating: 4.8,
        sessions: 1800,
        image: '👩‍⚕️',
        expertise: ['Medical Specializations', 'Nursing', 'Hospital Administration'],
        languages: ['English', 'Hindi', 'Marathi']
    },
    {
        name: 'Mr. Arjun Patel',
        specialization: 'Business & Finance',
        experience: '18+ Years',
        rating: 4.9,
        sessions: 3200,
        image: '👨‍💻',
        expertise: ['Investment Banking', 'Consulting', 'Entrepreneurship'],
        languages: ['English', 'Hindi', 'Gujarati']
    }
];
