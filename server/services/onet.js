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
exports.onetService = exports.ONetService = void 0;
var ONetService = /** @class */ (function () {
    function ONetService() {
        this.baseUrl = 'https://services.onetcenter.org/ws';
        this.username = process.env.ONET_USERNAME;
        this.password = process.env.ONET_PASSWORD;
    }
    ONetService.prototype.getCareersByInterestProfile = function (answerString) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!this.username || !this.password) {
                            throw new Error('O*NET credentials not configured. Please set ONET_USERNAME and ONET_PASSWORD environment variables.');
                        }
                        url = "".concat(this.baseUrl, "/mnm/interestprofiler/careers?answers=").concat(encodeURIComponent(answerString));
                        return [4 /*yield*/, fetch(url, {
                                method: 'GET',
                                headers: {
                                    'Accept': 'application/json',
                                    'Authorization': "Basic ".concat(Buffer.from("".concat(this.username, ":").concat(this.password)).toString('base64')),
                                    'User-Agent': 'nodejs-Career-Guidance-App/1.00 (bot)'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            if (response.status === 401) {
                                throw new Error('O*NET authentication failed. Please verify your credentials are correct.');
                            }
                            throw new Error("O*NET API error: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        // The O*NET Interest Profiler API returns careers in this format
                        if (!data.career || !Array.isArray(data.career)) {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, data.career.map(function (career) { return ({
                                code: career.code,
                                title: career.title,
                                fit: career.fit || 0,
                                zone: career.zone || 1
                            }); })];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching careers from O*NET Interest Profiler:', error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Helper method to format Holland Code answers for O*NET API
    ONetService.prototype.formatAnswersForAPI = function (answers) {
        // O*NET expects answers in a specific format
        // L = Like = 1, D = Dislike = 0, N = Neutral = 0.5 or similar
        return answers.map(function (answer) {
            switch (answer) {
                case 'L': return '1';
                case 'D': return '0';
                case 'N': return '0';
                default: return '0';
            }
        }).join('');
    };
    // Calculate Holland Code scores
    ONetService.prototype.calculateHollandCode = function (answers) {
        var scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        // Each category has 10 questions (0-9, 10-19, 20-29, 30-39, 40-49, 50-59)
        var categories = ['R', 'I', 'A', 'S', 'E', 'C'];
        categories.forEach(function (category, categoryIndex) {
            var startIndex = categoryIndex * 10;
            var endIndex = startIndex + 10;
            for (var i = startIndex; i < endIndex && i < answers.length; i++) {
                if (answers[i] === 'L') {
                    scores[category]++;
                }
            }
        });
        return scores;
    };
    return ONetService;
}());
exports.ONetService = ONetService;
exports.onetService = new ONetService();
