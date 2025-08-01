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
exports.default = HomePage;
var react_1 = require("react");
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
function HomePage() {
    var _this = this;
    var _a = (0, wouter_1.useLocation)(), setLocation = _a[1];
    var _b = (0, react_1.useState)(false), isStarting = _b[0], setIsStarting = _b[1];
    var startAssessmentMutation = (0, react_query_1.useMutation)({
        mutationFn: function () { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiRequest('POST', '/assessment/start')];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        }); },
        onSuccess: function (data) {
            setLocation("/assessment?session=".concat(data.sessionId));
        },
        onError: function (error) {
            console.error('Failed to start assessment:', error);
            alert('Failed to start assessment. Please try again.');
        },
    });
    var handleStartAssessment = function () {
        setIsStarting(true);
        startAssessmentMutation.mutate();
    };
    return (<div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <lucide_react_1.Brain className="h-4 w-4 text-primary-foreground"/>
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
          
          <button onClick={handleStartAssessment} disabled={isStarting || startAssessmentMutation.isPending} className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg">
            {isStarting || startAssessmentMutation.isPending ? (<>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Starting Assessment...
              </>) : (<>
                Start Career Assessment
                <lucide_react_1.ArrowRight className="ml-2 h-5 w-5"/>
              </>)}
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
                <lucide_react_1.Brain className="h-8 w-8 text-purple-600"/>
              </div>
              <h4 className="text-xl font-semibold mb-2">Take Assessment</h4>
              <p className="text-gray-600">
                Answer 60 questions about activities you'd like or dislike to identify your Holland Code personality type.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <lucide_react_1.Users className="h-8 w-8 text-blue-600"/>
              </div>
              <h4 className="text-xl font-semibold mb-2">Get Matched</h4>
              <p className="text-gray-600">
                Receive personalized career recommendations based on your interests using the O*NET database.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <lucide_react_1.TrendingUp className="h-8 w-8 text-green-600"/>
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
        ].map(function (type) { return (<div key={type.code} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {type.code}
                  </div>
                  <h4 className="text-lg font-semibold ml-3">{type.name}</h4>
                </div>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </div>); })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <lucide_react_1.Brain className="h-4 w-4 text-primary-foreground"/>
            </div>
            <h5 className="text-xl font-semibold">Career Compass</h5>
          </div>
          <p className="text-gray-400">
            Helping students discover their perfect career path through scientific assessment and personalized guidance.
          </p>
        </div>
      </footer>
    </div>);
}
