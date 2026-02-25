import {
  Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube,
  MessageCircle, Heart, Shield, Award, Brain, Lock, ArrowRight, Sparkles, Globe
} from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom X (Twitter) Icon Component
const XIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' },
    { name: 'Data Protection', path: '/data-protection' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/share/1D6srR3rRi/', color: 'group-hover:text-blue-600' },
    { name: 'X', icon: XIcon, url: 'https://x.com/zplusecounselling', color: 'group-hover:text-gray-900' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/zplusecounselling', color: 'group-hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/zpluse-counseling-5745a1398?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', color: 'group-hover:text-blue-700' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@zplusecounselling', color: 'group-hover:text-red-600' },
    { name: 'WhatsApp', icon: MessageCircle, url: 'https://wa.me/917895158657', color: 'group-hover:text-green-500' }
  ];

  const handleFooterLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 border-t border-white/40 bg-white/30 backdrop-blur-md text-gray-800 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.03)] selection:bg-primary-500/30">

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl pointer-events-none transform -translate-y-1/2" />
      <div className="absolute right-0 bottom-0 w-full h-64 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />

      {/* Hero CTA Section within Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 relative z-10">
        <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10 mb-8 md:mb-0 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-100 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">Start Your Journey Today</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Ready to discover your true potential?
            </h3>
            <p className="text-gray-600 text-lg">
              Join 50,000+ others who have found clarity, purpose, and direction through our scientifically validated assessments.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button
              onClick={() => { window.scrollTo(0, 0); navigate('/register'); }}
              className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-bold rounded-2xl shadow-elevated-low hover:shadow-elevated-glow hover:-translate-y-1 transition-all duration-300 flex items-center justify-center whitespace-nowrap"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => { window.scrollTo(0, 0); navigate('/tests'); }}
              className="px-8 py-4 bg-white/80 backdrop-blur-md text-gray-700 font-bold rounded-2xl shadow-sm hover:bg-white hover:-translate-y-1 transition-all duration-300 border border-gray-200 flex items-center justify-center whitespace-nowrap"
            >
              Explore Tests
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand & Social */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="inline-flex items-center space-x-3 group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-elevated-low group-hover:shadow-elevated-glow group-hover:scale-105 transition-all duration-300">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">ZPluse</h2>
                <p className="text-primary-600 text-sm font-bold tracking-wide uppercase">Counselling Platform</p>
              </div>
            </Link>

            <p className="text-gray-600 leading-relaxed text-lg pr-4">
              Empowering individuals through comprehensive psychological assessments, expert career guidance, and personalized development insights.
            </p>

            <div className="space-y-4">
              <p className="font-bold text-gray-900">Connect with us</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/60 backdrop-blur-md border border-white/60 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] group"
                    aria-label={social.name}
                  >
                    <social.icon className={`w-5 h-5 text-gray-500 transition-colors duration-300 ${social.color}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Resources</h3>
            <div className="space-y-4">
              {['Help Center', 'FAQ', 'User Testimonials', 'Research & Methodology'].map((item) => (
                <button
                  key={item}
                  onClick={handleFooterLinkClick}
                  className="block w-full text-left font-medium text-gray-600 hover:text-primary-600 transition-colors duration-200 group flex items-center"
                >
                  <span className="w-2 h-2 rounded-full bg-primary-400 mr-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">{item}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Contact Us</h3>
            <div className="space-y-5">
              <a href="mailto:support@zplusecounselling.com" className="flex items-start space-x-4 group p-3 -ml-3 rounded-2xl hover:bg-white/50 transition-colors duration-300 border border-transparent hover:border-white/60">
                <div className="w-10 h-10 rounded-full bg-white/80 shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-primary-50 group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600 group-hover:text-primary-600 transition-colors text-sm break-all">support@zplusecounselling.com</p>
                </div>
              </a>

              <a href="tel:+917895158657" className="flex items-start space-x-4 group p-3 -ml-3 rounded-2xl hover:bg-white/50 transition-colors duration-300 border border-transparent hover:border-white/60">
                <div className="w-10 h-10 rounded-full bg-white/80 shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-green-50 group-hover:scale-110 transition-all duration-300">
                  <Phone className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-600 group-hover:text-green-600 transition-colors text-sm">+91 78951 58657</p>
                </div>
              </a>

              <div className="flex items-start space-x-4 group p-3 -ml-3 rounded-2xl hover:bg-white/50 transition-colors duration-300 border border-transparent hover:border-white/60">
                <div className="w-10 h-10 rounded-full bg-white/80 shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-orange-50 group-hover:scale-110 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Location</p>
                  <p className="text-gray-600 text-sm">Dehradun, Uttarakhand, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal & Trust */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Legal & Trust</h3>

            <div className="space-y-3 pb-4">
              {legalLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={handleFooterLinkClick}
                  className="block w-full text-left font-medium text-gray-500 hover:text-primary-600 transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 pointer-events-none">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shadow-inner">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <h4 className="font-bold text-gray-900">Expert Certified</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Assessments validated by certified psychologists & career experts.
              </p>
            </div>

            {/* Admin Access Button */}
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/admin/assessments');
              }}
              className="mt-4 flex items-center justify-center w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <Lock className="w-4 h-4 mr-2 text-gray-400 group-hover:text-white transition-colors" />
              Admin Access
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Legal / Copyright Bar */}
      <div className="border-t border-white/50 bg-white/60 backdrop-blur-xl relative z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.01)] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
            <div className="flex items-center">
              <p className="text-gray-600 text-sm font-medium">
                © {currentYear} ZPluse Counselling Platform. All rights reserved.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-8">
              <p className="text-gray-700 text-sm font-bold flex items-center bg-white/80 px-4 py-2 rounded-full shadow-sm border border-white">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current mx-1.5 animate-pulse" />
                <span>in India</span>
              </p>

              <div className="flex items-center space-x-6 text-sm font-medium text-gray-500">
                <span className="flex items-center hover:text-primary-600 transition-colors cursor-default"><Shield className="w-4 h-4 mr-1.5" /> SSL Secured</span>
                <span className="flex items-center hover:text-primary-600 transition-colors cursor-default"><Globe className="w-4 h-4 mr-1.5" /> Global Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;