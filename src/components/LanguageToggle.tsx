import React from 'react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 border-border/50 hover:bg-card transition-colors"
    >
      <Languages className="w-4 h-4" />
      <span className="font-medium">
        {language === 'en' ? 'हिंदी' : 'English'}
      </span>
    </Button>
  );
};

export default LanguageToggle;
