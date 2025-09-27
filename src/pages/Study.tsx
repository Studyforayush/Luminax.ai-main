import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Zap, Clock, Target, CheckCircle, Flame, BookOpen, Trophy, TrendingUp, Users, Settings, ArrowRight } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchQuizzes, submitResult, QuizItem } from "@/supabase/quiz";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const Study = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useLanguage();
  const [selectedSubject, setSelectedSubject] = useState("General");
  const [quizProgress, setQuizProgress] = useState(0);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<any>(null);
  
  const { data: quizResp, isLoading: quizzesLoading } = useQuery<{ data: QuizItem[]; error: any}>({
    queryKey: ["quizzes", { topic: "General" }],
    queryFn: () => fetchQuizzes("General", 5),
  });

  const quizzes = useMemo(() => quizResp?.data ?? [], [quizResp]);

  const submitMutation = useMutation({
    mutationFn: (args: { userId: string; quizId: number; score: number }) => submitResult(args.userId, args.quizId, args.score),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });

  const handleSubmit = (quizId: number) => {
    // Placeholder user id; replace with real auth session user id when available
    const userId = "anonymous-user";
    submitMutation.mutate({ userId, quizId, score: 10 });
    setQuizProgress(prev => Math.min(prev + 20, 100));
  };

  const handleGenerateQuiz = async () => {
    setIsGeneratingQuiz(true);
    console.log(`Generating AI quiz for ${selectedSubject}...`);
    
    // Simulate AI quiz generation
    setTimeout(() => {
      const aiQuiz = {
        id: Date.now(),
        subject: selectedSubject,
        questions: [
          {
            id: 1,
            question: `What is the fundamental concept in ${selectedSubject}?`,
            options: ["Option A", "Option B", "Option C", "Option D"],
            correct: 0
          },
          {
            id: 2,
            question: `Which principle is most important in ${selectedSubject}?`,
            options: ["Principle 1", "Principle 2", "Principle 3", "Principle 4"],
            correct: 1
          },
          {
            id: 3,
            question: `How does ${selectedSubject} relate to real-world applications?`,
            options: ["Application 1", "Application 2", "Application 3", "Application 4"],
            correct: 2
          }
        ],
        difficulty: "Medium",
        timeLimit: 15
      };
      
      setGeneratedQuiz(aiQuiz);
      setIsGeneratingQuiz(false);
      setQuizProgress(prev => Math.min(prev + 10, 100));
      console.log("AI Quiz generated successfully!");
    }, 2000);
  };

  const handleStartTest = (testType: string) => {
    console.log(`Starting ${testType}...`);
    // Could navigate to a specific test page
    alert(`Starting ${testType}! This will open a full-length practice test.`);
  };

  const handleQuickFire = () => {
    console.log("Starting Quick Fire quiz...");
    setQuizProgress(prev => Math.min(prev + 15, 100));
    // Could navigate to a quick fire quiz page
  };

  const handleMemoryPalace = () => {
    console.log("Starting Memory Palace practice...");
    setQuizProgress(prev => Math.min(prev + 5, 100));
    // Could navigate to memory palace practice
  };

  const handleReview = () => {
    console.log("Starting review session...");
    navigate('/progress');
  };

  const handleContinueQuest = () => {
    console.log("Continuing daily quest...");
    setQuizProgress(prev => Math.min(prev + 25, 100));
  };

  const handleViewProgress = () => {
    navigate('/progress');
  };

  const handleViewLeaderboard = () => {
    navigate('/leaderboard');
  };

  const handleViewCommunity = () => {
    navigate('/community');
  };

  const handleViewProfile = () => {
    navigate('/profile');
  };

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
    queryClient.invalidateQueries({ queryKey: ["quizzes"] });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          {t('study.title')}{" "}
          <span className="gradient-secondary bg-clip-text text-transparent">
            {t('study.hub')}
          </span>
        </h1>
        <p className="text-xl text-muted-foreground">
          {t('study.subtitle')}
        </p>
      </div>

      {/* Daily Quest */}
      <Card className="gradient-card border-border/50 glow-secondary cursor-pointer hover:shadow-lg transition-all duration-300" onClick={handleContinueQuest}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-warning streak-animation" />
              Daily Quest
            </CardTitle>
            <Badge className="gradient-secondary text-secondary-foreground">
              +100 XP
            </Badge>
          </div>
          <CardDescription>
            Complete today's challenge to maintain your streak!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Mathematics - Quadratic Equations</span>
              <div className="flex items-center gap-2">
                <Progress value={60} className="w-20 h-2" />
                <span className="text-sm text-muted-foreground">3/5</span>
              </div>
            </div>
            <Button 
              className="w-full gradient-secondary glow-secondary"
              onClick={handleContinueQuest}
            >
              Continue Quest
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Quiz Generator */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="gradient-card border-border/50 hover:glow-primary transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center glow-primary">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>AI Quiz Generator</CardTitle>
                <CardDescription>Custom quizzes based on your subjects</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={selectedSubject === "Physics" ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => handleSubjectChange("Physics")}
                >
                  Physics
                </Badge>
                <Badge 
                  variant={selectedSubject === "Chemistry" ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => handleSubjectChange("Chemistry")}
                >
                  Chemistry
                </Badge>
                <Badge 
                  variant={selectedSubject === "Math" ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => handleSubjectChange("Math")}
                >
                  Math
                </Badge>
                <Badge 
                  variant={selectedSubject === "General" ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => handleSubjectChange("General")}
                >
                  General
                </Badge>
              </div>
              <Button 
                className="w-full gradient-primary glow-primary" 
                disabled={quizzesLoading} 
                onClick={handleGenerateQuiz}
              >
                {quizzesLoading ? "Loading..." : "Generate Quiz"}
              </Button>
              {isGeneratingQuiz && (
                <div className="mt-4 p-4 bg-sidebar-accent rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="text-sm">AI is generating your quiz...</span>
                  </div>
                </div>
              )}
              
              {generatedQuiz && (
                <div className="mt-4 space-y-3">
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">🤖 AI Generated Quiz - {generatedQuiz.subject}</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Difficulty: {generatedQuiz.difficulty}</p>
                      <p className="text-sm text-muted-foreground">Time Limit: {generatedQuiz.timeLimit} minutes</p>
                      <p className="text-sm text-muted-foreground">Questions: {generatedQuiz.questions.length}</p>
                    </div>
                    <Button 
                      className="w-full mt-3 bg-primary hover:bg-primary/90"
                      onClick={() => alert("Starting AI Generated Quiz!")}
                    >
                      Start AI Quiz
                    </Button>
                  </div>
                </div>
              )}
              
              {quizzes.length > 0 && (
                <div className="mt-4 space-y-2">
                  {quizzes.map(q => (
                    <div key={q.id} className="flex items-center justify-between bg-sidebar-accent p-3 rounded">
                      <span className="font-medium">Quiz #{q.id} - {q.topic}</span>
                      <Button 
                        size="sm" 
                        onClick={() => handleSubmit(q.id)} 
                        disabled={submitMutation.isPending}
                      >
                        Submit 10 XP
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className=" bg-green gradient-card border-border/50 hover:glow-success transition-all duration-300">
          <CardHeader>
            <div className=" bg-black flex items-center gap-3">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center glow-success">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>JEE Practice Papers</CardTitle>
                <CardDescription>Full-length mock exams</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className=" bg-black space-y-3">
              <div className="space-y-2">
                <div className=" bg-green-900 flex items-center justify-between p-2 rounded">
                  <div>
                    <span className="font-medium">JEE Main Mock #15</span>
                    <div className=" flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>3 hours</span>
                    </div>
                  </div>
                  <Badge className="bg-green-900 text-white">New</Badge>
                </div>
                <div className=" bg-black flex items-center justify-between p-2 rounded">
                  <div>
                    <span className="font-medium">JEE Advanced Mock #8</span>
                    <div className=" flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>3.5 hours</span>
                    </div>
                  </div>
                  <Badge variant="outline">Available</Badge>
                </div>
                <div className=" bg-black flex items-center justify-between p-2  rounded">
                  <div>
                    <span className="font-medium">Physics Practice Set</span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>1.5 hours</span>
                    </div>
                  </div>
                  <Badge variant="outline">Available</Badge>
                </div>
              </div>
              <Button 
                className="w-full bg-success glow-success text-white hover:bg-success/90"
                onClick={() => handleStartTest("JEE Main Mock #15")}
              >
                Start JEE Main Test
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Study Options */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="gradient-card border-border/50 hover:glow-primary transition-all duration-300">
          <CardContent className="p-6 text-center">
            <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Quick Fire</h3>
            <p className="text-sm text-muted-foreground mb-4">10 rapid questions</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleQuickFire}
            >
              Start
            </Button>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50 hover:glow-secondary transition-all duration-300">
          <CardContent className="p-6 text-center">
            <Brain className="w-8 h-8 text-secondary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Memory Palace</h3>
            <p className="text-sm text-muted-foreground mb-4">Memorization drills</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleMemoryPalace}
            >
              Practice
            </Button>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50 hover:glow-success transition-all duration-300">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 text-success mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Review</h3>
            <p className="text-sm text-muted-foreground mb-4">Previous mistakes</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleReview}
            >
              Review
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Study Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="cursor-pointer hover:bg-sidebar-accent p-3 rounded-lg transition-colors" onClick={handleViewProgress}>
              <p className="text-2xl font-bold text-primary">42</p>
              <p className="text-sm text-muted-foreground">Quizzes Completed</p>
            </div>
            <div className="cursor-pointer hover:bg-sidebar-accent p-3 rounded-lg transition-colors" onClick={handleViewProgress}>
              <p className="text-2xl font-bold text-secondary">89%</p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
            <div className="cursor-pointer hover:bg-sidebar-accent p-3 rounded-lg transition-colors" onClick={handleViewProfile}>
              <p className="text-2xl font-bold text-success">7</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Navigation */}
      <Card className="gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Quick Navigation</CardTitle>
          <CardDescription>Jump to your favorite sections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" onClick={handleViewProgress}>
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">Progress</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" onClick={handleViewLeaderboard}>
              <Trophy className="w-6 h-6" />
              <span className="text-sm">Leaderboard</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" onClick={handleViewCommunity}>
              <Users className="w-6 h-6" />
              <span className="text-sm">Community</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" onClick={handleViewProfile}>
              <BookOpen className="w-6 h-6" />
              <span className="text-sm">Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Study;