import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Brain, ArrowRight, Users, TrendingUp } from "lucide-react";

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

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [isStarting, setIsStarting] = useState(false);

  const startAssessmentMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/assessment/start');
      return response.json();
    },
    onSuccess: (data) => {
      setLocation(`/assessment?session=${data.sessionId}`);
    },
    onError: (error: Error) => {
      console.error('Failed to start assessment:', error);
      alert('Failed to start assessment. Please try again.');
    },
  });

  const handleStartAssessment = () => {
    setIsStarting(true);
    startAssessmentMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Career Compass</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover Your Perfect Career Path
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take our scientifically-backed Holland Code Interest Profiler to uncover careers that match your personality and interests. Get personalized high school roadmaps to achieve your goals.
          </p>
          
          <button
            onClick={handleStartAssessment}
            disabled={isStarting || startAssessmentMutation.isPending}
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {isStarting || startAssessmentMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Starting Assessment...
              </>
            ) : (
              <>
                Start Career Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            60 questions • Takes about 10-15 minutes • Completely free
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Take Assessment</h4>
              <p className="text-gray-600">
                Answer 60 questions about activities you'd like or dislike to identify your Holland Code personality type.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Get Matched</h4>
              <p className="text-gray-600">
                Receive personalized career recommendations based on your interests using the O*NET database.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Plan Your Path</h4>
              <p className="text-gray-600">
                Get detailed high school roadmaps with specific classes and activities to prepare for your chosen career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Holland Code Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Based on Holland Code Theory
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { code: 'R', name: 'Realistic', description: 'Hands-on, practical activities' },
              { code: 'I', name: 'Investigative', description: 'Research, analysis, problem-solving' },
              { code: 'A', name: 'Artistic', description: 'Creative, expressive activities' },
              { code: 'S', name: 'Social', description: 'Helping and working with people' },
              { code: 'E', name: 'Enterprising', description: 'Leading, persuading, business' },
              { code: 'C', name: 'Conventional', description: 'Organizing, data, attention to detail' }
            ].map((type) => (
              <div key={type.code} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {type.code}
                  </div>
                  <h4 className="text-lg font-semibold ml-3">{type.name}</h4>
                </div>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            <h5 className="text-xl font-semibold">Career Compass</h5>
          </div>
          <p className="text-gray-400">
            Helping students discover their perfect career path through scientific assessment and personalized guidance.
          </p>
        </div>
      </footer>
    </div>
  );
}