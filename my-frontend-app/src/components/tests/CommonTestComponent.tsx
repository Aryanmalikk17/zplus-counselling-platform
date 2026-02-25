import { Clock, ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';


import { TestConfig, TestAnswer, TestSession, TestResult } from '../../types/testTypes';
import { testHistoryService } from '../../services/testHistoryService';
import { useAuth } from '../../context/AuthContext';

interface CommonTestComponentProps {
  testConfig: TestConfig;
  onTestComplete: (result: TestResult) => void;
  onTestExit: () => void;
}

export const CommonTestComponent: React.FC<CommonTestComponentProps> = ({
  testConfig,
  onTestComplete,
  onTestExit
}) => {
  const { user } = useAuth();

  const [session, setSession] = useState<TestSession>({
    testId: testConfig.id,
    answers: [],
    startTime: new Date(),
    currentQuestionIndex: 0,
    isCompleted: false
  });

  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);

  const currentQuestion = testConfig.questions[session.currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Question-specific timer for SSB tests
  useEffect(() => {
    let questionTimer: NodeJS.Timeout;
    if (isTimerRunning && currentQuestion?.timeLimit) {
      const remainingTime = currentQuestion.timeLimit;
      questionTimer = setTimeout(() => {
        // Auto-advance for timed questions
        if (session.currentQuestionIndex < testConfig.questions.length - 1) {
          handleNextQuestion();
        }
      }, remainingTime * 1000);
    }
    return () => clearTimeout(questionTimer);
  }, [isTimerRunning, session.currentQuestionIndex]);

  const handleStartTest = () => {
    setShowInstructions(false);
    setIsTimerRunning(true);
  };

  const handleAnswerSelect = (answer: string) => {
    setCurrentAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!currentAnswer.trim()) return;

    const newAnswer: TestAnswer = {
      questionId: currentQuestion.id,
      answer: currentAnswer,
      timeSpent: timeSpent
    };

    const updatedAnswers = [...session.answers, newAnswer];

    if (session.currentQuestionIndex < testConfig.questions.length - 1) {
      setSession(prev => ({
        ...prev,
        answers: updatedAnswers,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
      setCurrentAnswer('');
    } else {
      // Test completed
      const finalSession = {
        ...session,
        answers: updatedAnswers,
        isCompleted: true
      };

      const result = calculateResults(finalSession);
      setIsTimerRunning(false);

      // Save test result to history if user is logged in
      if (user?.id) {
        const testResultForHistory = {
          id: `${testConfig.id}-${Date.now()}`,
          testName: testConfig.name,
          testType: testConfig.type || 'general',
          category: testConfig.categories[0] || 'general',
          totalQuestions: result.totalQuestions,
          correctAnswers: result.correctAnswers,
          incorrectAnswers: result.incorrectAnswers,
          skippedQuestions: result.unanswered,
          percentage: result.percentage,
          grade: result.grade,
          isPassed: result.isPassed,
          timeSpent: result.timeSpent,
          maxTime: testConfig.timeLimit ? parseInt(testConfig.timeLimit.replace(/\D/g, '')) * 60 : result.timeSpent,
          difficulty: testConfig.difficulty || 'Medium',
          answers: result.detailedAnswers.map(answer => ({
            questionId: answer.questionId,
            userAnswer: answer.userAnswer,
            correctAnswer: answer.correctAnswer || '',
            isCorrect: answer.isCorrect,
            timeSpent: answer.timeSpent,
            questionText: answer.question,
            explanation: answer.explanation || undefined
          })),
          categoryBreakdown: result.categoryResults.map(cat => ({
            category: (cat as any).category,
            total: (cat as any).totalQuestions,
            correct: (cat as any).correctAnswers,
            percentage: (cat as any).percentage
          })),
          recommendations: result.recommendations,
          strengths: result.strengths,
          weaknesses: result.weaknesses
        };

        try {
          testHistoryService.saveTestResult(user.id, testResultForHistory);
        } catch (error) {
          console.error('Failed to save test result to history:', error);
        }
      }

      onTestComplete(result);
    }
  };

  const handlePreviousQuestion = () => {
    if (session.currentQuestionIndex > 0) {
      setSession(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
      // Load previous answer if exists
      const previousAnswer = session.answers[session.currentQuestionIndex - 1];
      if (previousAnswer) {
        setCurrentAnswer(previousAnswer.answer as string);
      }
    }
  };

  const calculateResults = (finalSession: TestSession): TestResult => {
    const totalQuestions = testConfig.questions.length;
    const totalPoints = testConfig.totalPoints || totalQuestions;
    let pointsEarned = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    // Calculate category-wise results
    const categoryResults: Record<string, any> = {};

    // Initialize category results
    testConfig.categories.forEach((category: any) => {
      categoryResults[category] = {
        category,
        totalQuestions: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        score: 0,
        percentage: 0,
        timeSpent: 0
      };
    });

    // Detailed answers for review
    const detailedAnswers = finalSession.answers.map(answer => {
      const question = testConfig.questions.find(q => q.id === answer.questionId);
      if (!question) return null;

      let isCorrect = false;
      const questionPoints = question.points || 1;

      // Check if answer is correct (for objective questions)
      if (question.correctAnswer) {
        isCorrect = answer.answer.toString().toLowerCase().trim() ===
          question.correctAnswer.toLowerCase().trim();
      } else if (question.options?.some(opt => opt.isCorrect)) {
        // Multiple choice with marked correct answer
        const correctOption = question.options.find(opt => opt.isCorrect);
        isCorrect = answer.answer === correctOption?.text;
      } else {
        // Subjective questions (SSB tests) - consider all as correct for now
        // TODO: Implement AI-based evaluation for subjective answers
        isCorrect = answer.answer.toString().trim().length > 10; // Basic completion check
      }

      const earnedPoints = isCorrect ? questionPoints : 0;
      pointsEarned += earnedPoints;

      if (isCorrect) correctAnswers++;
      else incorrectAnswers++;

      // Update category results
      const categoryResult = categoryResults[question.category];
      if (categoryResult) {
        categoryResult.totalQuestions++;
        categoryResult.timeSpent += answer.timeSpent;
        if (isCorrect) {
          categoryResult.correctAnswers++;
          categoryResult.score += questionPoints;
        } else {
          categoryResult.incorrectAnswers++;
        }
      }

      return {
        questionId: question.id,
        question: question.question,
        userAnswer: answer.answer.toString(),
        correctAnswer: question.correctAnswer ||
          question.options?.find(opt => opt.isCorrect)?.text ||
          'Subjective Answer',
        isCorrect,
        pointsEarned: earnedPoints,
        timeSpent: answer.timeSpent,
        category: question.category
      };
    }).filter(Boolean) as any[];

    // Calculate final category percentages
    Object.values(categoryResults).forEach((category: any) => {
      if (category.totalQuestions > 0) {
        category.percentage = (category.correctAnswers / category.totalQuestions) * 100;
      }
    });

    const unanswered = totalQuestions - finalSession.answers.length;
    const percentage = (correctAnswers / totalQuestions) * 100;

    // Calculate grade
    const grade = percentage >= 95 ? 'A+' :
      percentage >= 90 ? 'A' :
        percentage >= 85 ? 'B+' :
          percentage >= 80 ? 'B' :
            percentage >= 75 ? 'C+' :
              percentage >= 70 ? 'C' :
                percentage >= 60 ? 'D' : 'F';

    const isPassed = percentage >= (testConfig.passingScore || 60);

    // Generate insights
    const { recommendations, strengths, weaknesses } = generateDetailedInsights(
      percentage,
      Object.values(categoryResults),
      detailedAnswers,
      testConfig.id
    );

    return {
      testId: testConfig.id,
      testName: testConfig.name,
      score: pointsEarned,
      percentage: Math.round(percentage * 100) / 100,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      unanswered,
      totalPoints,
      pointsEarned,
      categoryResults: Object.values(categoryResults),
      timeSpent,
      completedAt: new Date(),
      recommendations,
      strengths,
      weaknesses,
      grade: grade as any,
      isPassed,
      detailedAnswers
    };
  };

  const generateDetailedInsights = (
    percentage: number,
    categoryResults: any[],
    detailedAnswers: any[],
    testId: string
  ) => {
    const recommendations: string[] = [];
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    // Overall performance analysis
    if (percentage >= 90) {
      strengths.push("Exceptional overall performance across all areas");
      recommendations.push("Consider advanced level challenges to further develop your skills");
    } else if (percentage >= 80) {
      strengths.push("Strong performance with good understanding of concepts");
      recommendations.push("Focus on perfecting weaker areas to achieve excellence");
    } else if (percentage >= 70) {
      strengths.push("Good foundation with room for improvement");
      recommendations.push("Regular practice and review of key concepts recommended");
    } else {
      weaknesses.push("Needs significant improvement in fundamental concepts");
      recommendations.push("Consider additional study and practice before retaking");
    }

    // Category-specific analysis
    categoryResults.forEach((category: any) => {
      if (category.percentage >= 80) {
        strengths.push(`Strong performance in ${category.category.toLowerCase()}`);
      } else if (category.percentage < 60) {
        weaknesses.push(`Needs improvement in ${category.category.toLowerCase()}`);
        recommendations.push(`Focus more practice on ${category.category.toLowerCase()} topics`);
      }
    });

    // Test-specific insights
    if (testId.includes('iq')) {
      if (percentage >= 80) {
        strengths.push("Strong analytical and logical reasoning abilities");
      } else {
        recommendations.push("Practice more logical reasoning and pattern recognition exercises");
      }
    } else if (testId.includes('memory')) {
      recommendations.push("Use memory techniques like visualization and association");
    } else if (testId.includes('personality')) {
      recommendations.push("Results reflect your natural personality traits and preferences");
    } else if (testId.includes('tat') || testId.includes('wat') || testId.includes('srt')) {
      recommendations.push("Continue developing leadership and communication skills");
      if (percentage >= 70) {
        strengths.push("Good understanding of leadership principles and situational awareness");
      }
    }

    // Time management analysis
    const avgTimePerQuestion = categoryResults.reduce((acc: any, cat: any) => acc + cat.timeSpent, 0) /
      categoryResults.reduce((acc: any, cat: any) => acc + cat.totalQuestions, 0);

    if (avgTimePerQuestion < 60) {
      strengths.push("Excellent time management and quick decision making");
    } else if (avgTimePerQuestion > 180) {
      weaknesses.push("Time management needs improvement");
      recommendations.push("Practice answering questions more quickly while maintaining accuracy");
    }

    return { recommendations, strengths, weaknesses };
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (showInstructions) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="card">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {testConfig.name}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {testConfig.description}
                </p>
                <div className="flex items-center justify-center space-x-6 text-gray-500 mb-8">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    {testConfig.duration}
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    {testConfig.questions.length} Questions
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions:</h2>
                <ul className="space-y-3">
                  {testConfig.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={onTestExit} className="btn-secondary">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Tests
                </button>
                <button onClick={handleStartTest} className="btn-primary">
                  <Play className="mr-2 h-4 w-4" />
                  Start Test
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Progress Header */}
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">{testConfig.name}</h2>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatTime(timeSpent)}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Question {session.currentQuestionIndex + 1} of {testConfig.questions.length}
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((session.currentQuestionIndex + 1) / testConfig.questions.length) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="card">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {currentQuestion.question}
                </h3>
                {currentQuestion.timeLimit && (
                  <div className="flex items-center text-orange-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {currentQuestion.timeLimit}s limit
                  </div>
                )}
              </div>

              {currentQuestion.description && (
                <p className="text-gray-600 mb-4">{currentQuestion.description}</p>
              )}

              {currentQuestion.image && (
                <div className="mb-6">
                  <div className="text-center">
                    <div className="inline-block border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={currentQuestion.image}
                        alt="Test Image"
                        className="max-w-full h-auto max-h-96 object-contain"
                        onError={(e) => {
                          // Fallback for missing images
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY5NzM4MyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIHdpbGwgYmUgZGlzcGxheWVkIGhlcmU8L3RleHQ+Cjwvc3ZnPg==';
                        }}
                      />
                    </div>
                    {currentQuestion.timeLimit && (
                      <div className="mt-3 text-sm text-orange-600 font-medium">
                        ⏰ Look at the image for 30 seconds, then write your story
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Question Timer Display for SSB Tests */}
              {currentQuestion.timeLimit && (
                <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-orange-800 font-medium text-sm">
                      ⏱️ Time Limit: {Math.floor(currentQuestion.timeLimit / 60)}:{(currentQuestion.timeLimit % 60).toString().padStart(2, '0')} minutes
                    </span>
                    <span className="text-orange-600 text-xs">
                      Be spontaneous and authentic
                    </span>
                  </div>
                </div>
              )}

              {/* SSB Test Tips */}
              {testConfig.id.includes('tat') && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-blue-800 text-sm">
                    <strong>TAT Tips:</strong> Include what is happening, what led to this, what people are thinking/feeling, and what happens next. Write 150-200 words.
                  </div>
                </div>
              )}

              {testConfig.id.includes('wat') && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-green-800 text-sm">
                    <strong>WAT Tips:</strong> Write your first spontaneous thought as a positive sentence. Avoid overthinking.
                  </div>
                </div>
              )}

              {testConfig.id.includes('srt') && (
                <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="text-purple-800 text-sm">
                    <strong>SRT Tips:</strong> Show leadership, initiative, and practical solutions. Be specific about your actions.
                  </div>
                </div>
              )}

              {/* Enhanced textarea for SSB tests */}
              {currentQuestion.type === 'text-input' ? (
                <div className="space-y-2">
                  <textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder={
                      testConfig.id.includes('tat') ? "Write your story here... (150-200 words)" :
                        testConfig.id.includes('wat') ? "Write your first thought as a sentence..." :
                          testConfig.id.includes('srt') ? "Describe what you would do..." :
                            testConfig.id.includes('sdt') ? "Describe yourself honestly..." :
                              testConfig.id.includes('gpe') ? "Write your detailed plan..." :
                                "Type your answer here..."
                    }
                    className="w-full p-4 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 resize-none text-sm"
                    rows={testConfig.id.includes('tat') || testConfig.id.includes('gpe') || testConfig.id.includes('sdt') ? 8 : 4}
                    style={{ fontSize: '14px', lineHeight: '1.5' }}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Words: {currentAnswer.trim().split(/\s+/).filter(word => word.length > 0).length}</span>
                    {currentQuestion.timeLimit && (
                      <span className="text-orange-600">⏰ {currentQuestion.timeLimit}s limit</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswerSelect(option.text)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${currentAnswer === option.text
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                        }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 mr-3 ${currentAnswer === option.text
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300'
                          }`}>
                          {currentAnswer === option.text && (
                            <div className="w-full h-full rounded-full bg-white transform scale-50" />
                          )}
                        </div>
                        <span>{option.text}</span>
                      </div>
                    </button>
                  )) || <div className="text-gray-500">No options available</div>}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={session.currentQuestionIndex === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={!currentAnswer.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {session.currentQuestionIndex === testConfig.questions.length - 1 ? 'Finish Test' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommonTestComponent;