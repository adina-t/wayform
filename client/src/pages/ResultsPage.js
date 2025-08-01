"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResultsPage;
var wouter_1 = require("wouter");
var react_query_1 = require("@tanstack/react-query");
var lucide_react_1 = require("lucide-react");
var apiRequest = function (method, endpoint, data) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api".concat(endpoint), {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: data ? JSON.stringify(data) : undefined,
                })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Request failed: ".concat(response.statusText));
                }
                return [2 /*return*/, response];
        }
    });
}); };
var getHollandCodeName = function (code) {
    var names = {
        'R': 'Realistic',
        'I': 'Investigative',
        'A': 'Artistic',
        'S': 'Social',
        'E': 'Enterprising',
        'C': 'Conventional'
    };
    return names[code] || code;
};
var getCareerIcon = function (title) {
    var titleLower = title.toLowerCase();
    if (titleLower.includes("engineer") || titleLower.includes("technical")) {
        return <lucide_react_1.Users className="h-6 w-6"/>;
    }
    if (titleLower.includes("teacher") || titleLower.includes("education")) {
        return <lucide_react_1.BookOpen className="h-6 w-6"/>;
    }
    if (titleLower.includes("manager") || titleLower.includes("business")) {
        return <lucide_react_1.TrendingUp className="h-6 w-6"/>;
    }
    return <lucide_react_1.Star className="h-6 w-6"/>;
};
function ResultsPage() {
    var _this = this;
    var _a = (0, wouter_1.useRoute)("/results/:sessionId"), params = _a[1];
    var _b = (0, wouter_1.useLocation)(), setLocation = _b[1];
    var sessionId = params === null || params === void 0 ? void 0 : params.sessionId;
    // Fetch assessment results
    var _c = (0, react_query_1.useQuery)({
        queryKey: ['results', sessionId],
        queryFn: function () { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiRequest('POST', "/assessment/".concat(sessionId, "/results"))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        }); },
        enabled: !!sessionId,
    }), results = _c.data, isLoading = _c.isLoading, error = _c.error;
    if (!sessionId) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Session</h1>
          <button onClick={function () { return setLocation('/'); }} className="text-primary hover:underline">
            Start New Assessment
          </button>
        </div>
      </div>);
    }
    if (isLoading) {
        return (<div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Analyzing Your Results</h2>
          <p className="text-gray-600">This may take a few moments...</p>
        </div>
      </div>);
    }
    if (error || !results) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Results</h1>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : 'Failed to load your assessment results'}
          </p>
          <button onClick={function () { return setLocation('/'); }} className="text-primary hover:underline">
            Start New Assessment
          </button>
        </div>
      </div>);
    }
    var careers = results.careers, hollandCode = results.hollandCode;
    // Get top Holland Code types
    var hollandCodeEntries = Object.entries(hollandCode || {})
        .sort(function (_a, _b) {
        var a = _a[1];
        var b = _b[1];
        return b - a;
    })
        .slice(0, 3);
    return (<div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <lucide_react_1.Brain className="h-4 w-4 text-primary-foreground"/>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Your Career Results</h1>
            </div>
            <button onClick={function () { return setLocation('/'); }} className="flex items-center text-gray-600 hover:text-gray-900">
              <lucide_react_1.ArrowLeft className="h-4 w-4 mr-2"/>
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
            {hollandCodeEntries.map(function (_a, index) {
            var code = _a[0], score = _a[1];
            return (<div key={code} className="text-center">
                <div className={"w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ".concat(index === 0 ? 'bg-primary text-primary-foreground' :
                    index === 1 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700')}>
                  <span className="text-xl font-bold">{code}</span>
                </div>
                <h3 className="text-lg font-semibold">{getHollandCodeName(code)}</h3>
                <p className="text-gray-600">Score: {score}/10</p>
              </div>);
        })}
          </div>
        </div>

        {/* Career Matches */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Career Matches ({(careers === null || careers === void 0 ? void 0 : careers.length) || 0} found)
          </h2>
          
          {careers && careers.length > 0 ? (<div className="space-y-8">
              {careers.map(function (career) { return (<div key={career.id} className="border-b border-gray-200 pb-8 last:border-b-0">
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
                          <lucide_react_1.Star className="h-4 w-4 mr-1 text-yellow-500"/>
                          {career.fit}% Match
                        </span>
                        <span className="flex items-center">
                          <lucide_react_1.DollarSign className="h-4 w-4 mr-1"/>
                          {career.salaryRange}
                        </span>
                        <span className="flex items-center">
                          <lucide_react_1.TrendingUp className="h-4 w-4 mr-1 text-green-500"/>
                          {career.growthRate}
                        </span>
                        <span className="flex items-center">
                          <lucide_react_1.GraduationCap className="h-4 w-4 mr-1"/>
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
                  {career.skills && career.skills.length > 0 && (<div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map(function (skill, skillIndex) { return (<span key={skillIndex} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {skill}
                          </span>); })}
                      </div>
                    </div>)}

                  {/* High School Roadmap */}
                  {career.roadmap && career.roadmap.length > 0 && (<div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">High School Preparation Roadmap</h4>
                      <div className="space-y-6">
                        {career.roadmap.map(function (year) { return (<div key={year.year} className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                              {year.year}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900 mb-2">{year.title}</h5>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h6 className="font-medium text-gray-700 mb-2 flex items-center">
                                    <lucide_react_1.BookOpen className="h-4 w-4 mr-1"/>
                                    Core Classes
                                  </h6>
                                  <ul className="text-sm text-gray-600 space-y-1">
                                    {year.coreClasses.map(function (cls, idx) { return (<li key={idx} className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        {cls}
                                      </li>); })}
                                  </ul>
                                </div>
                                <div>
                                  <h6 className="font-medium text-gray-700 mb-2 flex items-center">
                                    <lucide_react_1.Users className="h-4 w-4 mr-1"/>
                                    Activities & Extracurriculars
                                  </h6>
                                  <ul className="text-sm text-gray-600 space-y-1">
                                    {year.activities.map(function (activity, idx) { return (<li key={idx} className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        {activity}
                                      </li>); })}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>); })}
                      </div>
                    </div>)}
                </div>); })}
            </div>) : (<div className="text-center py-12">
              <p className="text-gray-600 mb-4">No career matches found. Please try taking the assessment again.</p>
              <button onClick={function () { return setLocation('/'); }} className="text-primary hover:underline">
                Start New Assessment
              </button>
            </div>)}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 text-center">
          <button onClick={function () { return setLocation('/'); }} className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Take Assessment Again
          </button>
        </div>
      </main>
    </div>);
}
