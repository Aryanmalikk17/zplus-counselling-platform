import {
    CheckCircle,
    Brain,
    Target,
    UserCheck,
    Briefcase,
    BookOpen,
    BarChart3,
    Zap,
    Heart,
    Users,
    TrendingUp,
    Star,
    MessageSquare,
    Award
} from 'lucide-react';

export const platformStats = [
    { number: '50,000+', label: 'Tests Completed', icon: CheckCircle },
    { number: '30+', label: 'Assessment Types', icon: Brain },
    { number: '95%', label: 'Accuracy Rate', icon: Target },
    { number: '24/7', label: 'Expert Support', icon: UserCheck }
];

export const comprehensiveFeatures = [
    {
        icon: Brain,
        title: 'Comprehensive Assessments',
        description: '30+ scientifically validated tests including MBTI, Big Five, Enneagram, IQ, and specialized career assessments.',
        features: ['Personality Tests', 'IQ Assessment', 'Career Guidance', 'SSB Tests']
    },
    {
        icon: Briefcase,
        title: 'Career Development',
        description: 'Complete career guidance with expert counselors, salary insights, and personalized career roadmaps.',
        features: ['Expert Counseling', 'Salary Data', 'Career Tools', 'Interview Prep']
    },
    {
        icon: BookOpen,
        title: 'Knowledge Hub',
        description: '30+ expert articles covering mental health, relationships, stress management, and personal development.',
        features: ['Expert Articles', 'Research Insights', 'Self-Help Guides', 'Psychology Tips']
    },
    {
        icon: BarChart3,
        title: 'Advanced Analytics',
        description: 'Detailed progress tracking, comparison tools, and comprehensive reports with actionable insights.',
        features: ['Progress Tracking', 'PDF Reports', 'Comparisons', 'Insights Dashboard']
    }
];

export const popularTests = [
    {
        title: 'MBTI Personality Test',
        description: 'Discover your 16-type personality profile and understand your cognitive preferences.',
        time: '15 min',
        users: '15K+',
        category: 'Personality',
        icon: Brain,
        testId: 'mbti',
        rating: 4.9
    },
    {
        title: 'Career Aptitude Assessment',
        description: 'Find your ideal career path with comprehensive aptitude and interest analysis.',
        time: '20 min',
        users: '12K+',
        category: 'Career',
        icon: Briefcase,
        testId: 'career',
        rating: 4.8
    },
    {
        title: 'Big Five Personality',
        description: 'Measure your openness, conscientiousness, extraversion, agreeableness, and neuroticism.',
        time: '12 min',
        users: '18K+',
        category: 'Personality',
        icon: Target,
        testId: 'bigfive',
        rating: 4.9
    },
    {
        title: 'IQ Assessment',
        description: 'Comprehensive cognitive ability testing with detailed intelligence analysis.',
        time: '25 min',
        users: '8K+',
        category: 'Intelligence',
        icon: Zap,
        testId: 'iq',
        rating: 4.7
    },
    {
        title: 'Emotional Intelligence',
        description: 'Assess your emotional awareness, empathy, and social skills.',
        time: '18 min',
        users: '10K+',
        category: 'Emotional',
        icon: Heart,
        testId: 'eq',
        rating: 4.8
    },
    {
        title: 'Leadership Style',
        description: 'Discover your natural leadership approach and development areas.',
        time: '16 min',
        users: '6K+',
        category: 'Leadership',
        icon: Users,
        testId: 'leadership',
        rating: 4.6
    }
];

export const successMetrics = [
    {
        title: 'Career Transitions',
        metric: '85%',
        description: 'Successfully changed careers',
        icon: TrendingUp,
        color: 'green'
    },
    {
        title: 'Salary Increase',
        metric: '40%',
        description: 'Average salary improvement',
        icon: BarChart3,
        color: 'blue'
    },
    {
        title: 'Job Satisfaction',
        metric: '92%',
        description: 'Report improved satisfaction',
        icon: Heart,
        color: 'red'
    },
    {
        title: 'Expert Rating',
        metric: '4.8/5',
        description: 'User satisfaction score',
        icon: Star,
        color: 'yellow'
    }
];

export const expertServices = [
    {
        title: 'Personal Counseling',
        description: 'One-on-one sessions with certified psychologists',
        icon: MessageSquare,
        price: 'From ₹1,999',
        features: ['1-hour sessions', 'Personalized guidance', 'Follow-up support']
    },
    {
        title: 'Career Coaching',
        description: 'Professional career guidance and planning',
        icon: Target,
        price: 'From ₹2,999',
        features: ['Career roadmap', 'Interview prep', 'Skill development']
    },
    {
        title: 'Team Workshops',
        description: 'Corporate team building and assessment programs',
        icon: Users,
        price: 'Custom pricing',
        features: ['Team assessments', 'Workshop facilitation', 'Detailed reports']
    }
];

export const features = [
    {
        icon: Brain,
        title: 'Scientific Tests',
        description: 'Take personality tests based on proven psychological frameworks like MBTI, Big Five, and Enneagram.'
    },
    {
        icon: TrendingUp,
        title: 'Career Insights',
        description: 'Discover career paths that align with your personality traits and natural strengths.'
    },
    {
        icon: Users,
        title: 'Team Building',
        description: 'Understand team dynamics and improve collaboration through personality insights.'
    },
    {
        icon: Award,
        title: 'Certified Results',
        description: 'Get detailed, professional reports you can use for personal development or career planning.'
    }
];

export const testimonials = [
    {
        name: 'Priya Sharma',
        role: 'Software Engineer',
        content: 'ZPlus Counselling helped me understand my strengths and find a career path I truly love. The insights were spot-on!',
        avatar: '👩‍💻'
    },
    {
        name: 'Rajesh Kumar',
        role: 'Team Lead',
        content: 'Our team communication improved dramatically after everyone took the personality tests. Highly recommend!',
        avatar: '👨‍💼'
    },
    {
        name: 'Anita Patel',
        role: 'HR Manager',
        content: 'The detailed reports help us make better hiring decisions and create more effective teams.',
        avatar: '👩‍💼'
    }
];
