import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.community': 'Community',
    'nav.study': 'Study',
    'nav.progress': 'Progress',
    'nav.leaderboard': 'Leaderboard',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    
    // Home Page
    'home.welcome': 'Welcome to',
    'home.subtitle': 'Learn and Progress with Students all over Country to make your Studying Fun, Competitive and Rewarding.',
    'home.startJourney': 'Start Your Journey',
    'home.watchDemo': 'Watch Demo Video',
    'home.joinCommunity': 'Join Your Community',
    'home.seeInAction': 'See Luminax AI in Action',
    'home.demoDescription': 'Watch how our AI-powered platform transforms your learning experience',
    'home.playDemo': 'Play Demo',
    'home.joinStudyCommunity': 'Join Your Study Community',
    'home.connectStudents': 'Connect with students in your field',
    'home.viewAllCommunities': 'View All Communities',
    'home.joinNow': 'Join Now',
    
    // Community Page
    'community.title': 'Study Communities',
    'community.subtitle': 'Connect with fellow students and learn together',
    'community.search': 'Search communities...',
    'community.allCategories': 'All Categories',
    'community.communitiesAvailable': 'communities available',
    'community.joined': 'Joined',
    'community.leave': 'Leave',
    'community.chat': 'Chat',
    'community.join': 'Join',
    'community.members': 'members',
    'community.yourJoinedCommunities': 'Your Joined Communities',
    'community.memberOf': 'You\'re a member of',
    'community.communities': 'communities',
    'community.view': 'View',
    'community.overview': 'Overview',
    'community.resources': 'Resources',
    'community.membersTab': 'Members',
    'community.stats': 'Community Stats',
    'community.rules': 'Community Rules',
    'community.recentActivity': 'Recent Activity',
    'community.selectCommunity': 'Select a Community',
    'community.chooseCommunity': 'Choose a community from the list to view details and join',
    
    // Study Page
    'study.title': 'Study',
    'study.hub': 'Hub',
    'study.subtitle': 'AI-powered quizzes, daily quests, and study challenges',
    'study.dailyQuest': 'Daily Quest',
    'study.completeChallenge': 'Complete today\'s challenge to maintain your streak!',
    'study.continueQuest': 'Continue Quest',
    'study.aiQuizGenerator': 'AI Quiz Generator',
    'study.customQuizzes': 'Custom quizzes based on your subjects',
    'study.generateQuiz': 'Generate Quiz',
    'study.generating': 'AI is generating your quiz...',
    'study.aiGeneratedQuiz': 'AI Generated Quiz',
    'study.difficulty': 'Difficulty',
    'study.timeLimit': 'Time Limit',
    'study.questions': 'Questions',
    'study.startAiQuiz': 'Start AI Quiz',
    'study.submitXp': 'Submit 10 XP',
    'study.jeePracticePapers': 'JEE Practice Papers',
    'study.fullLengthExams': 'Full-length mock exams & practice tests',
    'study.jeeMainPapers': 'JEE Main Papers',
    'study.jeeAdvancedPapers': 'JEE Advanced Papers',
    'study.hours': 'hours',
    'study.questionsCount': 'questions',
    'study.start': 'Start',
    'study.startRandomTest': 'Start Random Test',
    'study.quickFire': 'Quick Fire',
    'study.rapidQuestions': '10 rapid questions',
    'study.memoryPalace': 'Memory Palace',
    'study.memorizationDrills': 'Memorization drills',
    'study.practice': 'Practice',
    'study.review': 'Review',
    'study.previousMistakes': 'Previous mistakes',
    'study.studyStatistics': 'Study Statistics',
    'study.quizzesCompleted': 'Quizzes Completed',
    'study.averageScore': 'Average Score',
    'study.dayStreak': 'Day Streak',
    'study.quickNavigation': 'Quick Navigation',
    'study.jumpToSections': 'Jump to your favorite sections',
    'study.progress': 'Progress',
    'study.leaderboard': 'Leaderboard',
    'study.community': 'Community',
    'study.profile': 'Profile',
    
    // Profile Page
    'profile.title': 'Your',
    'profile.profile': 'Profile',
    'profile.subtitle': 'Track your achievements and learning journey',
    'profile.edit': 'Edit',
    'profile.totalXp': 'Total XP',
    'profile.globalRank': 'Global Rank',
    'profile.quizzesCompleted': 'Quizzes Completed',
    'profile.achievements': 'Achievements',
    'profile.avgScore': 'Avg Score',
    'profile.daysActive': 'Days Active',
    'profile.achievementGallery': 'Achievement Gallery',
    'profile.learningMilestones': 'Your learning milestones and badges',
    'profile.earned': 'Earned',
    'profile.locked': 'Locked',
    'profile.recentActivity': 'Recent Activity',
    'profile.latestActions': 'Your latest learning actions and progress',
    'profile.quickActions': 'Quick Actions',
    'profile.jumpToFavorite': 'Jump to your favorite sections',
    'profile.startStudy': 'Start Study',
    'profile.viewProgress': 'View Progress',
    
    // Common
    'common.loading': 'Loading...',
    'common.new': 'New',
    'common.available': 'Available',
    'common.minutes': 'minutes',
    'common.hours': 'hours',
    'common.days': 'days',
    'common.xp': 'XP',
    'common.level': 'Level',
    'common.streak': 'streak',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.community': 'कम्युनिटी',
    'nav.study': 'अध्ययन',
    'nav.progress': 'प्रगति',
    'nav.leaderboard': 'लीडरबोर्ड',
    'nav.profile': 'प्रोफाइल',
    'nav.settings': 'सेटिंग्स',
    
    // Home Page
    'home.welcome': 'आपका स्वागत है',
    'home.subtitle': 'देश भर के छात्रों के साथ सीखें और प्रगति करें, अपनी पढ़ाई को मजेदार, प्रतिस्पर्धी और पुरस्कृत बनाएं।',
    'home.startJourney': 'अपनी यात्रा शुरू करें',
    'home.watchDemo': 'डेमो वीडियो देखें',
    'home.joinCommunity': 'अपनी कम्युनिटी में शामिल हों',
    'home.seeInAction': 'ल्यूमिनैक्स AI को कार्य में देखें',
    'home.demoDescription': 'देखें कि कैसे हमारा AI-संचालित प्लेटफॉर्म आपके सीखने के अनुभव को बदलता है',
    'home.playDemo': 'डेमो चलाएं',
    'home.joinStudyCommunity': 'अपनी अध्ययन कम्युनिटी में शामिल हों',
    'home.connectStudents': 'अपने क्षेत्र के छात्रों के साथ जुड़ें',
    'home.viewAllCommunities': 'सभी कम्युनिटी देखें',
    'home.joinNow': 'अभी शामिल हों',
    
    // Community Page
    'community.title': 'अध्ययन कम्युनिटी',
    'community.subtitle': 'साथी छात्रों के साथ जुड़ें और एक साथ सीखें',
    'community.search': 'कम्युनिटी खोजें...',
    'community.allCategories': 'सभी श्रेणियां',
    'community.communitiesAvailable': 'कम्युनिटी उपलब्ध',
    'community.joined': 'शामिल',
    'community.leave': 'छोड़ें',
    'community.chat': 'चैट',
    'community.join': 'शामिल हों',
    'community.members': 'सदस्य',
    'community.yourJoinedCommunities': 'आपकी शामिल कम्युनिटी',
    'community.memberOf': 'आप',
    'community.communities': 'कम्युनिटी के सदस्य हैं',
    'community.view': 'देखें',
    'community.overview': 'अवलोकन',
    'community.resources': 'संसाधन',
    'community.membersTab': 'सदस्य',
    'community.stats': 'कम्युनिटी आंकड़े',
    'community.rules': 'कम्युनिटी नियम',
    'community.recentActivity': 'हाल की गतिविधि',
    'community.selectCommunity': 'एक कम्युनिटी चुनें',
    'community.chooseCommunity': 'विवरण देखने और शामिल होने के लिए सूची से एक कम्युनिटी चुनें',
    
    // Study Page
    'study.title': 'अध्ययन',
    'study.hub': 'हब',
    'study.subtitle': 'AI-संचालित क्विज़, दैनिक क्वेस्ट और अध्ययन चुनौतियां',
    'study.dailyQuest': 'दैनिक क्वेस्ट',
    'study.completeChallenge': 'अपनी स्ट्रीक बनाए रखने के लिए आज की चुनौती पूरी करें!',
    'study.continueQuest': 'क्वेस्ट जारी रखें',
    'study.aiQuizGenerator': 'AI क्विज़ जेनरेटर',
    'study.customQuizzes': 'आपके विषयों के आधार पर कस्टम क्विज़',
    'study.generateQuiz': 'क्विज़ जेनरेट करें',
    'study.generating': 'AI आपका क्विज़ जेनरेट कर रहा है...',
    'study.aiGeneratedQuiz': 'AI जेनरेटेड क्विज़',
    'study.difficulty': 'कठिनाई',
    'study.timeLimit': 'समय सीमा',
    'study.questions': 'प्रश्न',
    'study.startAiQuiz': 'AI क्विज़ शुरू करें',
    'study.submitXp': '10 XP जमा करें',
    'study.jeePracticePapers': 'JEE अभ्यास पेपर',
    'study.fullLengthExams': 'पूर्ण लंबाई के मॉक परीक्षा और अभ्यास टेस्ट',
    'study.jeeMainPapers': 'JEE मेन पेपर',
    'study.jeeAdvancedPapers': 'JEE एडवांस्ड पेपर',
    'study.hours': 'घंटे',
    'study.questionsCount': 'प्रश्न',
    'study.start': 'शुरू करें',
    'study.startRandomTest': 'रैंडम टेस्ट शुरू करें',
    'study.quickFire': 'त्वरित अग्नि',
    'study.rapidQuestions': '10 त्वरित प्रश्न',
    'study.memoryPalace': 'मेमोरी पैलेस',
    'study.memorizationDrills': 'याद करने के अभ्यास',
    'study.practice': 'अभ्यास',
    'study.review': 'समीक्षा',
    'study.previousMistakes': 'पिछली गलतियां',
    'study.studyStatistics': 'अध्ययन आंकड़े',
    'study.quizzesCompleted': 'क्विज़ पूरे',
    'study.averageScore': 'औसत स्कोर',
    'study.dayStreak': 'दिन स्ट्रीक',
    'study.quickNavigation': 'त्वरित नेविगेशन',
    'study.jumpToSections': 'अपने पसंदीदा सेक्शन पर जाएं',
    'study.progress': 'प्रगति',
    'study.leaderboard': 'लीडरबोर्ड',
    'study.community': 'कम्युनिटी',
    'study.profile': 'प्रोफाइल',
    
    // Profile Page
    'profile.title': 'आपकी',
    'profile.profile': 'प्रोफाइल',
    'profile.subtitle': 'अपनी उपलब्धियों और सीखने की यात्रा को ट्रैक करें',
    'profile.edit': 'संपादित करें',
    'profile.totalXp': 'कुल XP',
    'profile.globalRank': 'वैश्विक रैंक',
    'profile.quizzesCompleted': 'क्विज़ पूरे',
    'profile.achievements': 'उपलब्धियां',
    'profile.avgScore': 'औसत स्कोर',
    'profile.daysActive': 'सक्रिय दिन',
    'profile.achievementGallery': 'उपलब्धि गैलरी',
    'profile.learningMilestones': 'आपके सीखने के माइलस्टोन और बैज',
    'profile.earned': 'अर्जित',
    'profile.locked': 'लॉक',
    'profile.recentActivity': 'हाल की गतिविधि',
    'profile.latestActions': 'आपके नवीनतम सीखने की क्रियाएं और प्रगति',
    'profile.quickActions': 'त्वरित क्रियाएं',
    'profile.jumpToFavorite': 'अपने पसंदीदा सेक्शन पर जाएं',
    'profile.startStudy': 'अध्ययन शुरू करें',
    'profile.viewProgress': 'प्रगति देखें',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.new': 'नया',
    'common.available': 'उपलब्ध',
    'common.minutes': 'मिनट',
    'common.hours': 'घंटे',
    'common.days': 'दिन',
    'common.xp': 'XP',
    'common.level': 'स्तर',
    'common.streak': 'स्ट्रीक',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
