import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Users, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  Star,
  CheckCircle,
  Play,
  BookOpen,
  Target,
  BarChart3,
  Shield,
  Globe,
  Clock,
  MessageSquare,
  Heart,
  Lightbulb,
  GraduationCap,
  Building,
  Zap,
  UserCheck,
  Download,
  Video,
  Calendar,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const HomePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  // Enhanced data for the new homepage
  const platformStats = [
    { number: '50,000+', label: 'Tests Completed', icon: CheckCircle },
    { number: '30+', label: 'Assessment Types', icon: Brain },
    { number: '95%', label: 'Accuracy Rate', icon: Target },
    { number: '24/7', label: 'Expert Support', icon: UserCheck }
  ];

  const comprehensiveFeatures = [
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

  const popularTests = [
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

  const successMetrics = [
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

  const expertServices = [
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

  const features = [
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

  const testimonials = [
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-blue-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-yellow-200 max-w-md mx-auto"
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className="text-2xl">👋</div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      Welcome back, <span className="text-yellow-600">{user?.fullName}</span>!
                    </p>
                    <p className="text-gray-600">Ready to discover more about yourself?</p>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                <Star className="w-4 h-4 mr-2" />
                Trusted by 50,000+ users worldwide
              </span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              Unlock Your True
              <br />
              <span className="text-yellow-500">Potential Today</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover your personality, find your ideal career, and transform your life with our comprehensive 
              psychological assessments and expert guidance. Join thousands who've already transformed their future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/tests" className="btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl">
                Start Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/career" className="btn-secondary text-lg px-8 py-4">
                Explore Career Guidance
              </Link>
            </div>

            {/* Platform Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {platformStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comprehensive Platform Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for Personal Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From personality insights to career guidance, we provide a complete ecosystem 
              for understanding yourself and achieving your goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {comprehensiveFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-start space-x-6 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-4">{feature.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Popular Tests Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Take Your Perfect Assessment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive collection of scientifically-validated assessments, 
              each designed to provide deep insights into different aspects of your personality and potential.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularTests.map((test, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-l-4 border-yellow-400"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <test.icon className="h-8 w-8 text-yellow-500" />
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                      {test.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-700">{test.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{test.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{test.description}</p>
                
                <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {test.time}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {test.users} taken
                  </div>
                </div>

                <Link 
                  to={`/test/${test.testId}`}
                  className="btn-primary w-full text-center group"
                >
                  Start Assessment
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/tests" className="btn-secondary text-lg px-8 py-3">
              View All 30+ Assessments
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Proven Results That Matter
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Our users don't just take tests—they transform their lives. Here's the impact 
              we've made together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-${metric.color}-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <metric.icon className={`h-10 w-10 text-${metric.color}-400`} />
                </div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">{metric.metric}</div>
                <div className="text-lg font-semibold mb-2">{metric.title}</div>
                <div className="text-gray-300">{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Get Expert Guidance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take your insights to the next level with personalized guidance from our 
              certified psychologists and career counselors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
                
                <service.icon className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <div className="text-2xl font-bold text-yellow-600 mb-6">{service.price}</div>
                
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Link to="/career" className="btn-primary w-full">
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Why Choose ZPlus Counselling?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge psychology with user-friendly design 
              to give you the most accurate and actionable personality insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <feature.icon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              What People Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who've discovered their potential
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-600 italic mb-4 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                Your Journey to Self-Discovery Starts Now
              </h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Join over 50,000 people who have transformed their lives through our comprehensive 
                assessments and expert guidance. Don't wait—your future self will thank you.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">Free</div>
                  <div className="text-sm opacity-80">Initial Assessment</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-sm opacity-80">Expert Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">30+</div>
                  <div className="text-sm opacity-80">Test Types</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <div className="text-sm opacity-80">Accuracy Rate</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Start Your Transformation
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center p-4 bg-yellow-50 rounded-xl">
                  <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center mr-4 font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Take Your Assessment</div>
                    <div className="text-gray-600 text-sm">Choose from 30+ scientifically-backed tests</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4 font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Get Detailed Insights</div>
                    <div className="text-gray-600 text-sm">Receive comprehensive analysis and recommendations</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center mr-4 font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Transform Your Life</div>
                    <div className="text-gray-600 text-sm">Apply insights to achieve your goals</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link 
                  to="/tests" 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-center block"
                >
                  Start Free Assessment Now
                </Link>
                {!isAuthenticated && (
                  <Link 
                    to="/register" 
                    className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 font-semibold py-4 px-6 rounded-xl transition-all duration-200 text-center block"
                  >
                    Create Free Account
                  </Link>
                )}
              </div>

              <p className="text-sm text-gray-500 text-center mt-6">
                ✓ No credit card required ✓ 100% confidential ✓ Instant results
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;