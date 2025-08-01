import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Brain, ArrowLeft, TrendingUp, DollarSign, GraduationCap, Star, BookOpen, Users } from "lucide-react";
import type { Career, RoadmapYear } from "@shared/schema";

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

const getHollandCodeName = (code: string) => {
  const names: { [key: string]: string } = {
    'R': 'Realistic',
    'I': 'Investigative', 
    'A': 'Artistic',
    'S': 'Social',
    'E': 'Enterprising',
    'C': 'Conventional'
  };
  return names[code] || code;
};

const getCareerIcon = (title: string) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("engineer") || titleLower.includes("technical")) {
    return <Users className="h-6 w-6" />;
  }
  if (titleLower.includes("teacher") || titleLower.includes("education")) {
    return <BookOpen className="h-6 w-6" />;
  }
  if (titleLower.includes("manager") || titleLower.includes("business")) {
    return <TrendingUp className="h-6 w-6" />;
  }
  return <Star className="h-6 w-6" />;
};

export default function ResultsPage() {
  const [, params] = useRoute("/results/:sessionId");
  const [, setLocation] = useLocation();
  const sessionId = params?.sessionId;

  // Fetch assessment results
  const { data: results, isLoading, error } = useQuery({
    queryKey: ['results', sessionId],
    queryFn: async () => {
      const response = await apiRequest('POST', `/assessment/${sessionId}/results`);
      return response.json();
    },
    enabled: !!sessionId,
  });

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Session</h1>
          <button 
            onClick={() => setLocation('/')}
            className="text-primary hover:underline"
          >
            Start New Assessment
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Analyzing Your Results</h2>
          <p className="text-gray-600">This may take a few moments...</p>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Results</h1>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : 'Failed to load your assessment results'}
          </p>
          <button 
            onClick={() => setLocation('/')}
            className="text-primary hover:underline"
          >
            Start New Assessment
          </button>
        </div>
      </div>
    );
  }

  const { careers, hollandCode } = results;

  // Get top Holland Code types
  const hollandCodeEntries = Object.entries(hollandCode || {})
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 3);

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
              <h1 className="text-xl font-semibold text-gray-900">Your Career Results</h1>
            </div>
            <button
              onClick={() => setLocation('/')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Start Over
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Holland Code Results */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Holland Code Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hollandCodeEntries.map(([code, score], index) => (
              <div key={code} className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  index === 0 ? 'bg-primary text-primary-foreground' : 
                  index === 1 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  <span className="text-xl font-bold">{code}</span>
                </div>
                <h3 className="text-lg font-semibold">{getHollandCodeName(code)}</h3>
                <p className="text-gray-600">Score: {score as number}/10</p>
              </div>
            ))}
          </div>
        </div>

        {/* Career Matches */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Career Matches ({careers?.length || 0} found)
          </h2>
          
          {careers && careers.length > 0 ? (
            <div className="space-y-8">
              {careers.map((career: Career) => (
                <div key={career.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                  {/* Career Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                          {getCareerIcon(career.title)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{career.title}</h3>
                          <p className="text-sm text-gray-600">O*NET Code: {career.onetCode}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-500" />
                          {career.fit}% Match
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {career.salaryRange}
                        </span>
                        <span className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                          {career.growthRate}
                        </span>
                        <span className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          {career.educationLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Career Description */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">About This Career</h4>
                    <p className="text-gray-600 leading-relaxed">{career.fullDescription}</p>
                  </div>

                  {/* Skills */}
                  {career.skills && career.skills.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill: string, skillIndex: number) => (
                          <span 
                            key={skillIndex}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* High School Roadmap */}
                  {career.roadmap && career.roadmap.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">High School Preparation Roadmap</h4>
                      <div className="space-y-6">
                        {career.roadmap.map((year: RoadmapYear) => (
                          <div key={year.year} className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                              {year.year}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900 mb-2">{year.title}</h5>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h6 className="font-medium text-gray-700 mb-2 flex items-center">
                                    <BookOpen className="h-4 w-4 mr-1" />
                                    Core Classes
                                  </h6>
                                  <ul className="text-sm text-gray-600 space-y-1">
                                    {year.coreClasses.map((cls, idx) => (
                                      <li key={idx} className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        {cls}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h6 className="font-medium text-gray-700 mb-2 flex items-center">
                                    <Users className="h-4 w-4 mr-1" />
                                    Activities & Extracurriculars
                                  </h6>
                                  <ul className="text-sm text-gray-600 space-y-1">
                                    {year.activities.map((activity, idx) => (
                                      <li key={idx} className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        {activity}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No career matches found. Please try taking the assessment again.</p>
              <button
                onClick={() => setLocation('/')}
                className="text-primary hover:underline"
              >
                Start New Assessment
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setLocation('/')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Take Assessment Again
          </button>
        </div>
      </main>
    </div>
  );
}