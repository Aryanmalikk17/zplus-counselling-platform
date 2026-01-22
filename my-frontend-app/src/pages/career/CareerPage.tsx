import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  TrendingUp, 
  Users, 
  Award, 
  ArrowRight, 
  Target,
  BookOpen,
  Search,
  Star,
  CheckCircle,
  Calendar,
  Clock,
  User,
  Building,
  GraduationCap,
  Heart,
  Lightbulb,
  Brain,
  BarChart3,
  Globe,
  MapPin,
  DollarSign,
  Filter,
  ChevronDown,
  Play,
  MessageSquare,
  Video,
  FileText,
  Download,
  ExternalLink,
  Zap,
  Shield,
  Headphones
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CareerPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Define interfaces for better type safety
  interface CareerResourceItem {
    title: string;
    description: string;
    action: string;
    free?: boolean;
    price?: string;
    time?: string;
  }

  interface CareerResource {
    type: string;
    icon: React.ComponentType<any>;
    items: CareerResourceItem[];
  }

  // Quick Career Assessment Questions
  const assessmentQuestions = [
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

  const careerServices = [
    {
      icon: Target,
      title: 'Career Assessment',
      description: 'Discover your ideal career path through comprehensive personality and aptitude testing.',
      link: '/test/career',
      features: ['Personality Analysis', 'Skills Assessment', 'Interest Mapping', 'Career Matching']
    },
    {
      icon: BookOpen,
      title: 'Career Counseling',
      description: 'Get personalized career guidance from our certified career counselors.',
      price: '₹2,999',
      features: ['1-on-1 Sessions', 'Personalized Plan', 'Industry Insights', 'Goal Setting']
    },
    {
      icon: Users,
      title: 'Interview Preparation',
      description: 'Master job interviews with our specialized training programs.',
      link: '/interview/gd',
      features: ['Mock Interviews', 'HR Rounds', 'Technical Prep', 'Body Language']
    },
    {
      icon: TrendingUp,
      title: 'Skill Development',
      description: 'Identify and develop the skills needed for your target career.',
      price: '₹1,999',
      features: ['Skill Gap Analysis', 'Learning Path', 'Certification Prep', 'Portfolio Building']
    }
  ];

  const careerPaths = [
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

  const successStories = [
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

  const handleAssessmentStart = (type: string) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    setSelectedAssessment(type);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const getCareerRecommendations = () => {
    // Simple logic based on answers - in real app, this would be more sophisticated
    const answerCounts: Record<string, number> = {};
    answers.forEach((answer, index) => {
      const category = assessmentQuestions[index].categories[assessmentQuestions[index].options.indexOf(answer)];
      answerCounts[category] = (answerCounts[category] || 0) + 1;
    });

    const topCategories = Object.entries(answerCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category);

    // Map categories to career suggestions
    const careerMapping: Record<string, string[]> = {
      analytical: ['Data Scientist', 'Software Engineer', 'Research Analyst'],
      creative: ['UX Designer', 'Content Creator', 'Marketing Specialist'],
      service: ['Healthcare Professional', 'Teacher', 'Social Worker'],
      leadership: ['Project Manager', 'Business Analyst', 'Team Lead'],
      teamwork: ['HR Professional', 'Event Manager', 'Consultant'],
      independence: ['Freelance Developer', 'Writer', 'Consultant']
    };

    const recommendations = topCategories.flatMap(cat => careerMapping[cat] || []);
    return [...new Set(recommendations)].slice(0, 5);
  };

  const resetAssessment = () => {
    setSelectedAssessment(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  // New data for enhanced features
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [salaryRange, setSalaryRange] = useState('All');
  const [activeTab, setActiveTab] = useState('overview');

  // Job Market Trends Data
  const jobMarketTrends = [
    {
      title: 'Remote Work Revolution',
      description: 'Remote and hybrid work models have increased by 300% post-pandemic',
      trend: '+300%',
      icon: Globe,
      color: 'blue'
    },
    {
      title: 'AI & Machine Learning',
      description: 'Fastest growing field with 40% job growth annually',
      trend: '+40%',
      icon: Brain,
      color: 'purple'
    },
    {
      title: 'Green Jobs',
      description: 'Sustainable energy and environmental roles growing rapidly',
      trend: '+25%',
      icon: Lightbulb,
      color: 'green'
    },
    {
      title: 'Healthcare Expansion',
      description: 'Aging population driving demand for healthcare professionals',
      trend: '+18%',
      icon: Heart,
      color: 'red'
    }
  ];

  // Industry Salary Data
  const industrySalaryData = [
    { industry: 'Technology', entry: '₹8L', mid: '₹18L', senior: '₹35L', locations: ['Bangalore', 'Hyderabad', 'Pune'] },
    { industry: 'Finance', entry: '₹6L', mid: '₹15L', senior: '₹30L', locations: ['Mumbai', 'Delhi', 'Bangalore'] },
    { industry: 'Healthcare', entry: '₹5L', mid: '₹12L', senior: '₹25L', locations: ['All Cities', 'Metro Areas'] },
    { industry: 'Education', entry: '₹4L', mid: '₹8L', senior: '₹15L', locations: ['All Cities', 'Tier 2 Cities'] },
    { industry: 'Marketing', entry: '₹5L', mid: '₹12L', senior: '₹22L', locations: ['Mumbai', 'Delhi', 'Bangalore'] },
    { industry: 'Design', entry: '₹4L', mid: '₹10L', senior: '₹20L', locations: ['Bangalore', 'Mumbai', 'Pune'] }
  ];

  // Career Resources
  const careerResources: CareerResource[] = [
    {
      type: 'Free Resources',
      icon: Download,
      items: [
        { title: 'Resume Templates', description: '50+ Professional Templates', action: 'Download', free: true },
        { title: 'Interview Guide', description: 'Complete Preparation Manual', action: 'Download', free: true },
        { title: 'Salary Calculator', description: 'Industry Benchmarking Tool', action: 'Use Tool', free: true },
        { title: 'Career Roadmaps', description: 'Step-by-step Career Paths', action: 'View', free: true }
      ]
    },
    {
      type: 'Video Courses',
      icon: Play,
      items: [
        { title: 'LinkedIn Optimization', description: '2-hour comprehensive course', action: 'Watch', price: '₹999' },
        { title: 'Interview Mastery', description: '5-hour complete training', action: 'Enroll', price: '₹1,999' },
        { title: 'Negotiation Skills', description: '3-hour expert guidance', action: 'Start', price: '₹1,499' },
        { title: 'Personal Branding', description: '4-hour brand building', action: 'Begin', price: '₹1,799' }
      ]
    },
    {
      type: 'Live Sessions',
      icon: Video,
      items: [
        { title: 'Career Q&A Sessions', description: 'Weekly expert interactions', action: 'Join', time: 'Every Friday 7 PM' },
        { title: 'Industry Insider Talks', description: 'Monthly industry experts', action: 'Register', time: 'First Saturday' },
        { title: 'Mock Interview Practice', description: 'Real-time feedback sessions', action: 'Book', price: '₹799' },
        { title: 'Group Counseling', description: 'Peer learning sessions', action: 'Participate', price: '₹499' }
      ]
    }
  ];

  // Career Tools
  const careerTools = [
    {
      name: 'Salary Benchmark Tool',
      description: 'Compare salaries across industries and locations',
      icon: DollarSign,
      features: ['Real-time data', 'Location-based', 'Experience level filters'],
      action: 'Use Tool',
      popular: true
    },
    {
      name: 'Skills Gap Analyzer',
      description: 'Identify skills needed for your target role',
      icon: Target,
      features: ['Skill mapping', 'Learning resources', 'Progress tracking'],
      action: 'Analyze Skills'
    },
    {
      name: 'Career Path Planner',
      description: 'Create step-by-step career progression plan',
      icon: MapPin,
      features: ['Goal setting', 'Timeline creation', 'Milestone tracking'],
      action: 'Plan Career'
    },
    {
      name: 'Interview Simulator',
      description: 'Practice with AI-powered interview questions',
      icon: MessageSquare,
      features: ['AI feedback', 'Multiple formats', 'Performance analytics'],
      action: 'Start Practice',
      new: true
    }
  ];

  // Expert Counselors
  const expertCounselors = [
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              Your Dream Career
              <br />
              <span className="text-yellow-500">Starts Here</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover your ideal career path with our comprehensive assessments, expert guidance, 
              and personalized recommendations. Take the first step towards a fulfilling professional life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => handleAssessmentStart('quick')}
                className="btn-primary text-lg px-8 py-4"
              >
                Take Free Career Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <Link to="/test/career" className="btn-secondary text-lg px-8 py-4">
                Detailed Assessment
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">10K+</div>
                <div className="text-gray-600">Careers Guided</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">50+</div>
                <div className="text-gray-600">Career Paths</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Assessment Modal */}
      {selectedAssessment && !showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Quick Career Assessment</h3>
              <button 
                onClick={resetAssessment}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm text-gray-600">
                  {currentQuestionIndex + 1} of {assessmentQuestions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / assessmentQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">
                {assessmentQuestions[currentQuestionIndex].question}
              </h4>
              <div className="space-y-3">
                {assessmentQuestions[currentQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Assessment Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete!</h3>
              <p className="text-gray-600">Based on your responses, here are your recommended career paths:</p>
            </div>

            <div className="space-y-4 mb-6">
              {getCareerRecommendations().map((career, index) => (
                <div key={index} className="flex items-center p-4 bg-yellow-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center mr-4 font-semibold">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-900">{career}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                to="/test/career" 
                className="btn-primary flex-1 text-center"
                onClick={resetAssessment}
              >
                Get Detailed Assessment
              </Link>
              <button 
                onClick={resetAssessment}
                className="btn-secondary flex-1"
              >
                Retake Assessment
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Career Services */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Career Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive career support to help you make informed decisions about your professional future
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {careerServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <service.icon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                
                {service.price && (
                  <div className="text-2xl font-bold text-yellow-600 mb-4">
                    {service.price}
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {service.link ? (
                  <Link to={service.link} className="btn-primary w-full">
                    Get Started
                  </Link>
                ) : (
                  <button className="btn-secondary w-full">
                    Book Now
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Career Paths */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Career Paths
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore trending career opportunities across various industries with salary insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerPaths.map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <path.icon className="h-8 w-8 text-yellow-500 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">{path.name}</h3>
                  </div>
                  <span className="text-green-600 font-semibold text-sm bg-green-100 px-2 py-1 rounded">
                    {path.growth} growth
                  </span>
                </div>

                <div className="mb-4">
                  <div className="text-lg font-semibold text-yellow-600 mb-2">{path.salary}</div>
                  <div className="text-sm text-gray-500">Average Salary Range</div>
                </div>

                <div className="space-y-2 mb-6">
                  {path.roles.map((role, idx) => (
                    <div key={idx} className="text-gray-600 text-sm flex items-center">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></div>
                      {role}
                    </div>
                  ))}
                </div>

                <button className="btn-secondary w-full">
                  Explore Career Path
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how our career guidance has helped others achieve their professional goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{story.image}</div>
                
                <div className="flex justify-center mb-4">
                  {Array.from({ length: story.rating }, (_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 italic mb-4 leading-relaxed">
                  "{story.content}"
                </p>
                
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{story.name}</p>
                  <p className="text-sm text-gray-500 mb-2">{story.role}</p>
                  <div className="flex justify-center items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {story.salary}
                    </span>
                    <span className="flex items-center">
                      <Building className="h-3 w-3 mr-1" />
                      {story.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Find Your Perfect Career?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Take our comprehensive career assessment and get personalized recommendations 
              that align with your personality, interests, and skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleAssessmentStart('quick')}
                className="bg-white text-yellow-600 hover:bg-gray-50 font-semibold py-3 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Free Assessment
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-yellow-600 font-semibold py-3 px-8 rounded-full transition-all duration-200">
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Market Trends */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Current Job Market Trends
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay ahead with the latest insights into emerging careers and market demands
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobMarketTrends.map((trend, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-${trend.color}-100`}>
                  <trend.icon className={`h-8 w-8 text-${trend.color}-600`} />
                </div>
                <div className={`text-2xl font-bold text-${trend.color}-600 mb-2`}>
                  {trend.trend}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {trend.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {trend.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Salary Insights */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Industry Salary Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare compensation across different industries and experience levels
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Industry</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Entry Level</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Mid Level</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Senior Level</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Top Locations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {industrySalaryData.map((data, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">{data.industry}</td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">{data.entry}</td>
                      <td className="px-6 py-4 text-center text-blue-600 font-semibold">{data.mid}</td>
                      <td className="px-6 py-4 text-center text-purple-600 font-semibold">{data.senior}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {data.locations.join(', ')}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-6 py-4 text-center">
              <p className="text-sm text-gray-600">
                Salary data updated quarterly | Based on 10,000+ verified professionals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Tools & Resources */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Career Tools & Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools and comprehensive resources to accelerate your career growth
            </p>
          </motion.div>

          {/* Career Tools */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Interactive Career Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {careerTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative"
                >
                  {tool.popular && (
                    <div className="absolute -top-3 -right-3 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Popular
                    </div>
                  )}
                  {tool.new && (
                    <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      New
                    </div>
                  )}
                  
                  <tool.icon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {tool.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {tool.description}
                  </p>
                  
                  <div className="mb-6">
                    <ul className="text-xs text-gray-500 space-y-1">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="btn-primary w-full text-sm">
                    {tool.action}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Career Resources Tabs */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-wrap justify-center mb-8 border-b">
              {careerResources.map((resource, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(resource.type)}
                  className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
                    activeTab === resource.type
                      ? 'text-yellow-600 border-yellow-500'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  <resource.icon className="h-5 w-5 inline mr-2" />
                  {resource.type}
                </button>
              ))}
            </div>

            {careerResources.map((resource) => (
              <div
                key={resource.type}
                className={`${activeTab === resource.type ? 'block' : 'hidden'}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {resource.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                        {item.free && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                            FREE
                          </span>
                        )}
                        {item.price && (
                          <span className="text-yellow-600 font-semibold">{item.price}</span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                      {item.time && (
                        <p className="text-gray-500 text-xs mb-4">{item.time}</p>
                      )}
                      <button className="btn-secondary w-full text-sm">
                        {item.action}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Counselors */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Career Counselors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized guidance from industry experts and certified career counselors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertCounselors.map((counselor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="text-6xl mb-4">{counselor.image}</div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{counselor.name}</h3>
                <p className="text-yellow-600 font-semibold mb-2">{counselor.specialization}</p>
                
                <div className="flex justify-center items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-semibold">{counselor.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {counselor.sessions}+ sessions
                  </div>
                  <div className="text-sm text-gray-500">
                    {counselor.experience}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Expertise:</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {counselor.expertise.map((skill, idx) => (
                      <span key={idx} className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Languages:</h4>
                  <p className="text-sm text-gray-600">{counselor.languages.join(', ')}</p>
                </div>

                <button className="btn-primary w-full">
                  Book Consultation
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Transform Your Career Today
              </h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Join thousands of professionals who have successfully transformed their careers 
                with our expert guidance and comprehensive career development programs.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
                  <div className="text-sm opacity-80">Companies Hiring</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">85%</div>
                  <div className="text-sm opacity-80">Salary Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">30 Days</div>
                  <div className="text-sm opacity-80">Average Placement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                  <div className="text-sm opacity-80">Expert Support</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 text-gray-900"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Get Started Today</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center mr-4 font-semibold">
                    1
                  </div>
                  <span className="font-medium">Take Career Assessment</span>
                </div>
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4 font-semibold">
                    2
                  </div>
                  <span className="font-medium">Get Expert Consultation</span>
                </div>
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-4 font-semibold">
                    3
                  </div>
                  <span className="font-medium">Land Your Dream Job</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => handleAssessmentStart('quick')}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                >
                  Start Free Assessment Now
                </button>
                <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-200">
                  Schedule Free Consultation
                </button>
              </div>

              <p className="text-sm text-gray-500 text-center mt-4">
                No credit card required • 100% confidential • Expert guidance
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;