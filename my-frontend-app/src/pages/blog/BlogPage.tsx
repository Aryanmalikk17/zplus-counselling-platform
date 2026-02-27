import { Search, Calendar, User, BookOpen, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState, useMemo } from 'react';


// Sample blog posts - in real app, these would come from your API
const blogPosts = [
  {
    id: 1,
    title: 'Understanding the Big Five Personality Traits',
    excerpt: 'The Big Five model is the most widely accepted personality theory in psychology. Learn what each trait means and how it shapes your life.',
    author: 'Dr. Sarah Johnson',
    date: '2024-08-15',
    category: 'Personality Science',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'How to Use Personality Tests for Career Growth',
    excerpt: 'Discover how personality assessments can be a powerful tool for career planning and professional development.',
    author: 'ZPlus Counselling Team',
    date: '2024-08-10',
    category: 'Career Development',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'The Science Behind MBTI: Fact vs Fiction',
    excerpt: 'Separating the science from the myths surrounding the Myers-Briggs Type Indicator.',
    author: 'Dr. Michael Chen',
    date: '2024-08-05',
    category: 'Research',
    readTime: '8 min read'
  },
  {
    id: 4,
    title: 'Managing Anxiety: Evidence-Based Techniques',
    excerpt: 'Learn practical strategies from cognitive behavioral therapy to manage anxiety and improve your daily life.',
    author: 'Dr. Emily Rodriguez',
    date: '2024-08-20',
    category: 'Mental Health',
    readTime: '10 min read'
  },
  {
    id: 5,
    title: 'Building Emotional Intelligence in the Workplace',
    excerpt: 'Develop your emotional intelligence skills to enhance leadership, teamwork, and professional relationships.',
    author: 'Dr. James Wilson',
    date: '2024-08-18',
    category: 'Career Development',
    readTime: '8 min read'
  },
  {
    id: 6,
    title: 'Understanding Depression: Signs, Symptoms, and Support',
    excerpt: 'A comprehensive guide to recognizing depression and finding the right support and treatment options.',
    author: 'Dr. Lisa Thompson',
    date: '2024-08-12',
    category: 'Mental Health',
    readTime: '12 min read'
  },
  {
    id: 7,
    title: 'Stress Management Techniques for Modern Life',
    excerpt: 'Practical strategies to manage stress in our fast-paced world, from mindfulness to time management.',
    author: 'Dr. Robert Kumar',
    date: '2024-08-08',
    category: 'Stress Management',
    readTime: '9 min read'
  },
  {
    id: 8,
    title: 'The Power of Mindfulness in Daily Life',
    excerpt: 'Discover how mindfulness practices can reduce stress, improve focus, and enhance overall well-being.',
    author: 'Dr. Maria Santos',
    date: '2024-08-25',
    category: 'Mindfulness',
    readTime: '7 min read'
  },
  {
    id: 9,
    title: 'Healthy Relationship Patterns: What to Look For',
    excerpt: 'Understanding the characteristics of healthy relationships and how to build stronger connections.',
    author: 'Dr. David Park',
    date: '2024-08-22',
    category: 'Relationship Psychology',
    readTime: '11 min read'
  },
  {
    id: 10,
    title: 'Career Transition: Navigating Change Successfully',
    excerpt: 'A step-by-step guide to making successful career transitions and finding your professional path.',
    author: 'Career Coach Sarah Adams',
    date: '2024-08-19',
    category: 'Career Development',
    readTime: '13 min read'
  },
  {
    id: 11,
    title: 'Self-Esteem: Building Confidence from Within',
    excerpt: 'Practical strategies to develop healthy self-esteem and overcome self-doubt.',
    author: 'Dr. Amanda Foster',
    date: '2024-08-16',
    category: 'Self-Development',
    readTime: '8 min read'
  },
  {
    id: 12,
    title: 'Leadership Styles: Finding Your Authentic Approach',
    excerpt: 'Explore different leadership styles and discover how to lead authentically based on your personality.',
    author: 'Dr. Thomas Lee',
    date: '2024-08-14',
    category: 'Leadership',
    readTime: '10 min read'
  },
  {
    id: 13,
    title: 'Understanding Trauma and Its Effects',
    excerpt: 'A sensitive exploration of trauma, its impact on mental health, and pathways to healing.',
    author: 'Dr. Jennifer Martinez',
    date: '2024-08-11',
    category: 'Mental Health',
    readTime: '15 min read'
  },
  {
    id: 14,
    title: 'Work-Life Balance: More Than Just Time Management',
    excerpt: 'Achieving true work-life balance through boundary setting, prioritization, and self-care.',
    author: 'Dr. Rachel Green',
    date: '2024-08-09',
    category: 'Stress Management',
    readTime: '9 min read'
  },
  {
    id: 15,
    title: 'Communication Skills for Better Relationships',
    excerpt: 'Master essential communication techniques to improve all your personal and professional relationships.',
    author: 'Dr. Michael Brown',
    date: '2024-08-07',
    category: 'Relationship Psychology',
    readTime: '11 min read'
  },
  {
    id: 16,
    title: 'Understanding Your Learning Style',
    excerpt: 'Discover how you learn best and optimize your study and professional development strategies.',
    author: 'Educational Psychologist Dr. Nina Patel',
    date: '2024-08-06',
    category: 'Self-Discovery',
    readTime: '8 min read'
  },
  {
    id: 17,
    title: 'Dealing with Workplace Burnout',
    excerpt: 'Recognize the signs of burnout and learn effective strategies for recovery and prevention.',
    author: 'Dr. Kevin Wright',
    date: '2024-08-04',
    category: 'Mental Health',
    readTime: '12 min read'
  },
  {
    id: 18,
    title: 'The Psychology of Goal Setting and Achievement',
    excerpt: 'Use psychological principles to set meaningful goals and develop strategies to achieve them.',
    author: 'Dr. Samantha Clark',
    date: '2024-08-03',
    category: 'Self-Development',
    readTime: '10 min read'
  },
  {
    id: 19,
    title: 'Parenting Styles and Child Development',
    excerpt: 'Understanding different parenting approaches and their impact on child psychological development.',
    author: 'Child Psychologist Dr. Laura Kim',
    date: '2024-08-02',
    category: 'Family Psychology',
    readTime: '14 min read'
  },
  {
    id: 20,
    title: 'Sleep and Mental Health: The Vital Connection',
    excerpt: 'Explore how sleep quality affects mental health and learn strategies for better sleep hygiene.',
    author: 'Dr. Paul Anderson',
    date: '2024-08-01',
    category: 'Mental Health',
    readTime: '9 min read'
  },
  {
    id: 21,
    title: 'Understanding Introversion vs Extroversion',
    excerpt: 'Debunking myths about personality types and understanding the spectrum of social preferences.',
    author: 'Dr. Helen Zhou',
    date: '2024-07-30',
    category: 'Personality Science',
    readTime: '7 min read'
  },
  {
    id: 22,
    title: 'Conflict Resolution in Personal and Professional Settings',
    excerpt: 'Learn effective strategies for resolving conflicts and maintaining healthy relationships.',
    author: 'Conflict Resolution Expert Dr. Mark Johnson',
    date: '2024-07-28',
    category: 'Relationship Psychology',
    readTime: '11 min read'
  },
  {
    id: 23,
    title: 'The Role of Gratitude in Mental Well-being',
    excerpt: 'Discover how practicing gratitude can improve mental health and life satisfaction.',
    author: 'Dr. Grace Liu',
    date: '2024-07-26',
    category: 'Mindfulness',
    readTime: '6 min read'
  },
  {
    id: 24,
    title: 'Understanding and Managing Social Anxiety',
    excerpt: 'Comprehensive strategies for overcoming social anxiety and building social confidence.',
    author: 'Dr. Sarah Mitchell',
    date: '2024-07-24',
    category: 'Mental Health',
    readTime: '13 min read'
  },
  {
    id: 25,
    title: 'Building Resilience: Bouncing Back from Adversity',
    excerpt: 'Develop mental resilience to better cope with life\'s challenges and setbacks.',
    author: 'Dr. Carlos Rodriguez',
    date: '2024-07-22',
    category: 'Self-Development',
    readTime: '10 min read'
  },
  {
    id: 26,
    title: 'The Science of Happiness: What Research Tells Us',
    excerpt: 'Evidence-based insights into what truly makes us happy and how to cultivate lasting well-being.',
    author: 'Positive Psychology Researcher Dr. Anna Williams',
    date: '2024-07-20',
    category: 'Research',
    readTime: '12 min read'
  },
  {
    id: 27,
    title: 'Understanding Cognitive Behavioral Therapy (CBT)',
    excerpt: 'An introduction to CBT principles and how this therapy approach can help with various mental health challenges.',
    author: 'CBT Specialist Dr. Richard Taylor',
    date: '2024-07-18',
    category: 'Mental Health',
    readTime: '11 min read'
  },
  {
    id: 28,
    title: 'Team Dynamics: Psychology of Effective Teams',
    excerpt: 'Understanding group psychology and how to build high-performing, collaborative teams.',
    author: 'Organizational Psychologist Dr. Jessica Chen',
    date: '2024-07-16',
    category: 'Team Dynamics',
    readTime: '9 min read'
  },
  {
    id: 29,
    title: 'Digital Wellness: Managing Technology\'s Impact on Mental Health',
    excerpt: 'Strategies for maintaining mental well-being in our increasingly digital world.',
    author: 'Dr. Alex Thompson',
    date: '2024-07-14',
    category: 'Mental Health',
    readTime: '8 min read'
  },
  {
    id: 30,
    title: 'Cultural Psychology: How Culture Shapes Our Mind',
    excerpt: 'Exploring how cultural background influences personality, behavior, and mental health.',
    author: 'Cultural Psychologist Dr. Priya Sharma',
    date: '2024-07-12',
    category: 'Research',
    readTime: '10 min read'
  }
];

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Personality Insights & Articles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore the latest in personality science, self-discovery tips, and career guidance
            from our team of psychology experts.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10 w-80"
              />
            </div>
            <div className="relative">
              <Filter className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field pl-10 w-60"
              >
                <option>All Categories</option>
                <option>Mental Health</option>
                <option>Career Development</option>
                <option>Personality Science</option>
                <option>Relationship Psychology</option>
                <option>Self-Development</option>
                <option>Stress Management</option>
                <option>Mindfulness</option>
                <option>Leadership</option>
                <option>Research</option>
                <option>Self-Discovery</option>
                <option>Team Dynamics</option>
                <option>Family Psychology</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Showing {filteredPosts.length} of {blogPosts.length} articles
              {selectedCategory !== 'All Categories' && ` in "${selectedCategory}"`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="mb-4">
                  <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors cursor-pointer">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200 text-center">
            <BookOpen className="h-12 w-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">More Articles Coming Soon!</h3>
            <p className="text-gray-600 mb-6">
              We're working on comprehensive guides, research insights, and practical tips
              to help you on your self-discovery journey.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Relationship Psychology', 'Leadership Styles', 'Stress Management', 'Team Dynamics', 'Career Transitions'].map((topic) => (
                <span key={topic} className="bg-white text-primary-600 px-4 py-2 rounded-full text-sm font-medium">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;