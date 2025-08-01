import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { hollandQuestions } from "@shared/holland-questions";
import { Brain, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

const apiRequest = async (method: string, endpoint: string, data?: any) => {
  const response = await fetch(`/api${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.statusText}`);
  }

  return response;
};

export default function AssessmentPage() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(useSearch());
  const sessionId = searchParams.get('session');

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<('L' | 'D' | 'N')[]>([]);

  // Redirect if no session ID
  useEffect(() => {
    if (!sessionId) {
      setLocation('/');
    }
  }, [sessionId, setLocation]);

  // Fetch existing session data
  const { data: session } = useQuery({
    queryKey: ['assessment', sessionId],
    queryFn: async () => {
      const response = await apiRequest('GET', `/assessment/${sessionId}`);
      return response.json();
    },
    enabled: !!sessionId,
  });

  // Initialize answers from session data
  useEffect(() => {
    if (session && session.answers) {
      setAnswers(session.answers);
      setCurrentQuestion(session.currentQuestion || 0);
    }
  }, [session]);

  // Update assessment mutation
  const updateAssessmentMutation = useMutation({
    mutationFn: async (data: { answers: ('L' | 'D' | 'N')[], currentQuestion: number, completed: boolean }) => {
      const response = await apiRequest('PATCH', `/assessment/${sessionId}`, data);
      return response.json();
    },
  });

  // Get results mutation
  const getResultsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', `/assessment/${sessionId}/results`);
      return response.json();
    },
    onSuccess: () => {
      setLocation(`/results/${sessionId}`);
    },
    onError: (error: Error) => {
      console.error('Failed to get results:', error);
      alert('Failed to get results. Please try again.');
    },
  });

  const handleAnswer = (answer: 'L' | 'D' | 'N') => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    const isCompleted = currentQuestion === hollandQuestions.length - 1;
    const nextQuestion = Math.min(currentQuestion + 1, hollandQuestions.length - 1);

    // Update the assessment session
    updateAssessmentMutation.mutate({
      answers: newAnswers,
      currentQuestion: isCompleted ? currentQuestion : nextQuestion,
      completed: isCompleted
    });

    if (isCompleted) {
      // Get results
      getResultsMutation.mutate();
    } else {
      setCurrentQuestion(nextQuestion);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      
      updateAssessmentMutation.mutate({
        answers,
        currentQuestion: prevQuestion,
        completed: false
      });
    }
  };

  const progress = ((currentQuestion + 1) / hollandQuestions.length) * 100;
  const question = hollandQuestions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

  if (!sessionId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Career Assessment</h1>
            </div>
            <div className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {hollandQuestions.length}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Assessment Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Question */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">{question?.category}</span>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {question?.text}
                </h2>
                <p className="text-gray-600 mt-1">
                  Would you like or dislike this activity?
                </p>
              </div>
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => handleAnswer('L')}
              className={`p-6 rounded-lg border-2 transition-all ${
                currentAnswer === 'L'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className={`h-6 w-6 ${currentAnswer === 'L' ? 'text-green-500' : 'text-gray-400'}`} />
              </div>
              <div className="font-semibold">Like</div>
              <div className="text-sm text-gray-600">I would enjoy this</div>
            </button>

            <button
              onClick={() => handleAnswer('N')}
              className={`p-6 rounded-lg border-2 transition-all ${
                currentAnswer === 'N'
                  ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                  : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <div className={`w-6 h-6 rounded-full ${currentAnswer === 'N' ? 'bg-yellow-500' : 'bg-gray-400'}`} />
              </div>
              <div className="font-semibold">Neutral</div>
              <div className="text-sm text-gray-600">I'm not sure</div>
            </button>

            <button
              onClick={() => handleAnswer('D')}
              className={`p-6 rounded-lg border-2 transition-all ${
                currentAnswer === 'D'
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <div className={`w-6 h-6 rounded-full ${
                  currentAnswer === 'D' ? 'bg-red-500' : 'bg-gray-400'
                } flex items-center justify-center`}>
                  <div className="w-3 h-0.5 bg-white rounded" />
                </div>
              </div>
              <div className="font-semibold">Dislike</div>
              <div className="text-sm text-gray-600">I would not enjoy this</div>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>

            <div className="text-sm text-gray-500">
              {answers.filter(a => a !== undefined).length} of {hollandQuestions.length} answered
            </div>

            {currentQuestion === hollandQuestions.length - 1 && currentAnswer ? (
              <button
                onClick={() => getResultsMutation.mutate()}
                disabled={getResultsMutation.isPending}
                className="flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                {getResultsMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Getting Results...
                  </>
                ) : (
                  <>
                    View Results
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            ) : (
              <div className="text-sm text-gray-400">
                {currentAnswer ? 'Click an option above to continue' : 'Select an answer to continue'}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}