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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AssessmentPage;
var react_1 = require("react");
var wouter_1 = require("wouter");
var react_query_1 = require("@tanstack/react-query");
var holland_questions_1 = require("@shared/holland-questions");
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
function AssessmentPage() {
    var _this = this;
    var _a = (0, wouter_1.useLocation)(), setLocation = _a[1];
    var searchParams = new URLSearchParams((0, wouter_1.useSearch)());
    var sessionId = searchParams.get('session');
    var _b = (0, react_1.useState)(0), currentQuestion = _b[0], setCurrentQuestion = _b[1];
    var _c = (0, react_1.useState)([]), answers = _c[0], setAnswers = _c[1];
    // Redirect if no session ID
    (0, react_1.useEffect)(function () {
        if (!sessionId) {
            setLocation('/');
        }
    }, [sessionId, setLocation]);
    // Fetch existing session data
    var session = (0, react_query_1.useQuery)({
        queryKey: ['assessment', sessionId],
        queryFn: function () { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiRequest('GET', "/assessment/".concat(sessionId))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        }); },
        enabled: !!sessionId,
    }).data;
    // Initialize answers from session data
    (0, react_1.useEffect)(function () {
        if (session && session.answers) {
            setAnswers(session.answers);
            setCurrentQuestion(session.currentQuestion || 0);
        }
    }, [session]);
    // Update assessment mutation
    var updateAssessmentMutation = (0, react_query_1.useMutation)({
        mutationFn: function (data) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiRequest('PATCH', "/assessment/".concat(sessionId), data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        }); },
    });
    // Get results mutation
    var getResultsMutation = (0, react_query_1.useMutation)({
        mutationFn: function () { return __awaiter(_this, void 0, void 0, function () {
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
        onSuccess: function () {
            setLocation("/results/".concat(sessionId));
        },
        onError: function (error) {
            console.error('Failed to get results:', error);
            alert('Failed to get results. Please try again.');
        },
    });
    var handleAnswer = function (answer) {
        var newAnswers = __spreadArray([], answers, true);
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);
        var isCompleted = currentQuestion === holland_questions_1.hollandQuestions.length - 1;
        var nextQuestion = Math.min(currentQuestion + 1, holland_questions_1.hollandQuestions.length - 1);
        // Update the assessment session
        updateAssessmentMutation.mutate({
            answers: newAnswers,
            currentQuestion: isCompleted ? currentQuestion : nextQuestion,
            completed: isCompleted
        });
        if (isCompleted) {
            // Get results
            getResultsMutation.mutate();
        }
        else {
            setCurrentQuestion(nextQuestion);
        }
    };
    var handlePrevious = function () {
        if (currentQuestion > 0) {
            var prevQuestion = currentQuestion - 1;
            setCurrentQuestion(prevQuestion);
            updateAssessmentMutation.mutate({
                answers: answers,
                currentQuestion: prevQuestion,
                completed: false
            });
        }
    };
    var progress = ((currentQuestion + 1) / holland_questions_1.hollandQuestions.length) * 100;
    var question = holland_questions_1.hollandQuestions[currentQuestion];
    var currentAnswer = answers[currentQuestion];
    if (!sessionId) {
        return null;
    }
    return (<div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <lucide_react_1.Brain className="h-4 w-4 text-primary-foreground"/>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Career Assessment</h1>
            </div>
            <div className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {holland_questions_1.hollandQuestions.length}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-primary rounded-full transition-all duration-300" style={{ width: "".concat(progress, "%") }}/>
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
                <span className="text-primary font-bold">{question === null || question === void 0 ? void 0 : question.category}</span>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {question === null || question === void 0 ? void 0 : question.text}
                </h2>
                <p className="text-gray-600 mt-1">
                  Would you like or dislike this activity?
                </p>
              </div>
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button onClick={function () { return handleAnswer('L'); }} className={"p-6 rounded-lg border-2 transition-all ".concat(currentAnswer === 'L'
            ? 'border-green-500 bg-green-50 text-green-700'
            : 'border-gray-200 hover:border-green-300 hover:bg-green-50')}>
              <div className="flex items-center justify-center mb-2">
                <lucide_react_1.CheckCircle className={"h-6 w-6 ".concat(currentAnswer === 'L' ? 'text-green-500' : 'text-gray-400')}/>
              </div>
              <div className="font-semibold">Like</div>
              <div className="text-sm text-gray-600">I would enjoy this</div>
            </button>

            <button onClick={function () { return handleAnswer('N'); }} className={"p-6 rounded-lg border-2 transition-all ".concat(currentAnswer === 'N'
            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
            : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50')}>
              <div className="flex items-center justify-center mb-2">
                <div className={"w-6 h-6 rounded-full ".concat(currentAnswer === 'N' ? 'bg-yellow-500' : 'bg-gray-400')}/>
              </div>
              <div className="font-semibold">Neutral</div>
              <div className="text-sm text-gray-600">I'm not sure</div>
            </button>

            <button onClick={function () { return handleAnswer('D'); }} className={"p-6 rounded-lg border-2 transition-all ".concat(currentAnswer === 'D'
            ? 'border-red-500 bg-red-50 text-red-700'
            : 'border-gray-200 hover:border-red-300 hover:bg-red-50')}>
              <div className="flex items-center justify-center mb-2">
                <div className={"w-6 h-6 rounded-full ".concat(currentAnswer === 'D' ? 'bg-red-500' : 'bg-gray-400', " flex items-center justify-center")}>
                  <div className="w-3 h-0.5 bg-white rounded"/>
                </div>
              </div>
              <div className="font-semibold">Dislike</div>
              <div className="text-sm text-gray-600">I would not enjoy this</div>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button onClick={handlePrevious} disabled={currentQuestion === 0} className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
              <lucide_react_1.ArrowLeft className="h-4 w-4 mr-2"/>
              Previous
            </button>

            <div className="text-sm text-gray-500">
              {answers.filter(function (a) { return a !== undefined; }).length} of {holland_questions_1.hollandQuestions.length} answered
            </div>

            {currentQuestion === holland_questions_1.hollandQuestions.length - 1 && currentAnswer ? (<button onClick={function () { return getResultsMutation.mutate(); }} disabled={getResultsMutation.isPending} className="flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">
                {getResultsMutation.isPending ? (<>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Getting Results...
                  </>) : (<>
                    View Results
                    <lucide_react_1.ArrowRight className="h-4 w-4 ml-2"/>
                  </>)}
              </button>) : (<div className="text-sm text-gray-400">
                {currentAnswer ? 'Click an option above to continue' : 'Select an answer to continue'}
              </div>)}
          </div>
        </div>
      </main>
    </div>);
}
