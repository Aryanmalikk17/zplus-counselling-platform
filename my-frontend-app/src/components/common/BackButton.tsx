import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  fallbackPath?: string;
  label?: string;
  className?: string;
  onClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  fallbackPath = '/tests', 
  label = 'Back',
  className = '',
  onClick
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onClick) {
      onClick();
      return;
    }
    
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center justify-center md:justify-start text-gray-600 hover:text-primary-600 transition-colors min-w-[44px] min-h-[44px] p-2 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-100 hover:bg-white hover:border-gray-200 shadow-sm ${className}`}
      aria-label={label}
    >
      <ChevronLeft className="h-5 w-5 md:mr-1" />
      <span className="hidden md:inline font-medium pr-1">{label}</span>
    </button>
  );
};

export default BackButton;
