import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube,
  MessageCircle,
  Heart,
  Shield,
  Award,
  Users,
  Brain
} from 'lucide-react';

// Custom X (Twitter) Icon Component
const XIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' },
    { name: 'Data Protection', path: '/data-protection' }
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/share/1D6srR3rRi/',
      color: 'hover:text-blue-600'
    },
    {
      name: 'X',
      icon: XIcon,
      url: 'https://x.com/zplusecounselling',
      color: 'hover:text-white'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/zplusecounselling',
      color: 'hover:text-pink-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/company/zplusecounselling',
      color: 'hover:text-blue-700'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@zplusecounselling',
      color: 'hover:text-red-600'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/917895158657',
      color: 'hover:text-green-500'
    }
  ];

  // Handle footer link clicks without navigation
  const handleFooterLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Just scroll to top smoothly instead of navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">ZPluse</h2>
                  <p className="text-yellow-400 text-sm font-medium">Counselling Platform</p>
                </div>
              </Link>
              <p className="text-gray-300 leading-relaxed mt-4">
                Empowering individuals through comprehensive psychological assessments, 
                expert career guidance, and personalized development insights.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <a 
                    href="mailto:support@zplusecounselling.com"
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                  >
                    support@zplusecounselling.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <a 
                    href="tel:+917895158657"
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                  >
                    +91 7895158657
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Visit Us</p>
                  <p className="text-gray-300">
                    Dehradun, Uttarkhand, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <p className="font-semibold mb-4">Follow Us</p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-gray-600 hover:scale-110 ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-gray-700">
              <h4 className="font-semibold mb-4 text-white">Why Trust Us</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>100% Confidential & Secure</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span>Scientifically Validated Tests</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>50,000+ Satisfied Users</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resources & Legal */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Resources & Support</h3>
            
            {/* Support Links - Using button elements to prevent navigation issues */}
            <div className="space-y-3">
              <button 
                onClick={handleFooterLinkClick}
                className="block w-full text-left text-gray-300 hover:text-yellow-400 transition-colors duration-200 cursor-pointer"
              >
                Help Center
              </button>
              <button 
                onClick={handleFooterLinkClick}
                className="block w-full text-left text-gray-300 hover:text-yellow-400 transition-colors duration-200 cursor-pointer"
              >
                Frequently Asked Questions
              </button>
              <button 
                onClick={handleFooterLinkClick}
                className="block w-full text-left text-gray-300 hover:text-yellow-400 transition-colors duration-200 cursor-pointer"
              >
                User Testimonials
              </button>
              <button 
                onClick={handleFooterLinkClick}
                className="block w-full text-left text-gray-300 hover:text-yellow-400 transition-colors duration-200 cursor-pointer"
              >
                Research & Methodology
              </button>
            </div>

            {/* Legal Links - Using button elements to prevent navigation issues */}
            <div className="pt-6 border-t border-gray-700">
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <div className="space-y-3">
                {legalLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={handleFooterLinkClick}
                    className="block w-full text-left text-sm text-gray-300 hover:text-yellow-400 transition-colors duration-200 cursor-pointer"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Badge */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Award className="w-6 h-6 text-yellow-400" />
                <h4 className="font-bold text-white">Expert Certified</h4>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                All our assessments are developed and validated by certified psychologists 
                and career counseling experts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gray-700 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <p className="text-gray-400 text-sm">
                © {currentYear} ZPluse Counselling Platform. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <p className="text-gray-400 text-sm flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>in India</span>
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>🔒 SSL Secured</span>
                <span>🌍 Global Access</span>
                <span>⚡ 99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;