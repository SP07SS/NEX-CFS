
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from 'lucide-react';

interface Language {
  code: string;
  name: string;
}

const sampleLanguages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'es', name: 'Español (Spanish)' },
  { code: 'fr', name: 'Français (French)' },
  { code: 'zh', name: '中文 (Mandarin)' },
  { code: 'ar', name: 'العربية (Arabic)' },
  { code: 'de', name: 'Deutsch (German)' },
];

interface LanguageSelectorProps {
  isMobile?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isMobile }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(sampleLanguages[0]); // Default to English

  const handleLanguageSelect = (lang: Language) => {
    setCurrentLanguage(lang);
    // In a real app, you would trigger language change logic here (e.g., i18n library)
    console.log(`Language changed to ${lang.name}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
            variant="ghost" 
            size={isMobile ? "default" : "sm"} 
            className={
              isMobile 
                ? "w-full justify-start text-muted-foreground hover:text-primary gap-2 text-lg font-medium" 
                : "text-foreground/80 hover:text-foreground hover:bg-transparent px-2 py-1 h-auto flex items-center gap-1"
            }
        >
          <Globe className={isMobile ? "h-5 w-5" : "h-4 w-4"} />
          {isMobile ? (
            <span>Language: {currentLanguage.name}</span>
          ) : (
            <span className="text-xs font-medium">{currentLanguage.code.toUpperCase()}</span>
          )}
          <span className="sr-only">Change language, current: {currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isMobile ? "start" : "end"} className="max-h-72 overflow-y-auto">
        {sampleLanguages.map((lang) => (
          <DropdownMenuItem key={lang.code} onSelect={() => handleLanguageSelect(lang)}>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
