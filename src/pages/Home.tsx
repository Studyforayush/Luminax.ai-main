import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Zap, Users, Trophy, BookOpen, Target, Flame, MessageCircle, FileText, Video, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockCommunities } from '../data/mockData';
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const Home = () => {
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { t } = useLanguage();

  const handleJoinCommunity = () => {
    console.log("Navigating to community...");
    navigate('/community');
  };

  const handleWatchDemo = () => {
    console.log("Opening demo video...");
    setIsVideoOpen(true);
  };

  const handleStartJourney = () => {
    console.log("Starting journey...");
    navigate('/study');
  };

  const handleJoinSpecificCommunity = (communityId: string) => {
    console.log(`Joining community ${communityId}...`);
    navigate(`/community?join=${communityId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="gradient-secondary mb-6 text-secondary-foreground px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Welcome to the Future of Learning
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-primary">{t('home.welcome')}</span>{" "}
              <span className="gradient- bg-clip-text animate-pulse ">
                Luminax AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {t('home.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="gradient-primary glow-primary text-lg px-8 py-6"
                onClick={handleJoinCommunity}
              >
                {t('home.joinCommunity')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-lg px-8 py-6 border-white"
                    onClick={handleWatchDemo}
                  >
                    <Video className="h-5 w-5 mr-2" />
                    {t('home.watchDemo')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full">
                  <DialogHeader>
                    <DialogTitle>{t('home.seeInAction')}</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video w-full">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                      title="Luminax AI Demo"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-16 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 text-green-500">
              {t('home.seeInAction')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('home.demoDescription')}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-card rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform" onClick={handleWatchDemo}>
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{t('home.watchDemo')}</h3>
                  <p className="text-muted-foreground mb-4">{t('home.demoDescription')}</p>
                  <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={handleWatchDemo} className="bg-primary hover:bg-primary/90">
                        <Video className="w-4 h-4 mr-2" />
                        {t('home.playDemo')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full">
                      <DialogHeader>
                        <DialogTitle>Luminax AI Demo Video</DialogTitle>
                      </DialogHeader>
                      <div className="aspect-video w-full">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                          title="Luminax AI Demo"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg"
                        ></iframe>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section className="py-16 px-6 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 text-green-500">
              {t('home.joinStudyCommunity')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('home.connectStudents')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {mockCommunities.slice(0, 6).map((community) => (
              <Card key={community.id} className="bg-card border-2 border-purple-200 hover:border-green-400 hover:shadow-xl hover:shadow-white-100 transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-3xl shadow-lg bg-gradient-to-br from-green-500 to-green-600 group-hover:from-green-600 group-hover:to-green-700 transition-all duration-300"
                    >
                      {community.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1 text-green-300">{community.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs bg-card text-purple-600 border-white">
                          {community.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {community.memberCount.toLocaleString()} members
                        </span>
                      </div>
                    </div>
                  </div>
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {community.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {community.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-2 py-1 border-green-500 text-green-500 hover:bg-card">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                       className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => handleJoinSpecificCommunity(community.id)}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      {t('home.joinNow')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleJoinCommunity}
               className="text-base px-6 py-3 border-2 border-white text-white hover:bg-card hover:border-green-400 hover:text-green-400 transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              {t('home.viewAllCommunities')}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Level Up Your{" "}
              <span className="gradient-secondary bg-clip-text text-transparent">
                Learning Journey
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Transform boring study sessions into engaging gaming experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="gradient-card border-border/50 hover:glow-primary transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4 glow-primary">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Gamified Learning</CardTitle>
                <CardDescription>
                  Earn XP, unlock achievements, and level up as you study. Every quiz, discussion, and completed task rewards you.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="gradient-card border-border/50 hover:glow-secondary transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center mb-4 glow-secondary">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Study Communities</CardTitle>
                <CardDescription>
                  Join class-specific groups, compete with peers, and learn together in supportive communities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="gradient-card border-border/50 hover:glow-success transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center mb-4 glow-success">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <CardTitle>AI-Powered Quizzes</CardTitle>
                <CardDescription>
                  Get personalized quizzes generated by AI based on your subjects and learning progress.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 gradient-hero">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Studies?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who've made learning their favorite game
          </p>
          <Button 
            size="lg" 
            className="gradient-primary glow-primary text-lg px-8 py-6"
            onClick={handleStartJourney}
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;