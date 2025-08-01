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
exports.openaiService = exports.OpenAIService = void 0;
var openai_1 = require("openai");
var openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY || "default_key"
});
var OpenAIService = /** @class */ (function () {
    function OpenAIService() {
    }
    OpenAIService.prototype.enhanceCareerInfo = function (onetCareer) {
        return __awaiter(this, void 0, void 0, function () {
            var prompt_1, response, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        prompt_1 = "\nYou are a career guidance counselor specializing in helping high school students understand career paths. \n\nBased on the following O*NET career information, provide a comprehensive analysis:\n\nCareer: ".concat(onetCareer.title, "\nO*NET Code: ").concat(onetCareer.code, "\nInterest Profile Fit: ").concat(onetCareer.fit, "% match\nJob Zone: ").concat(onetCareer.zone, " (1=minimal preparation, 2=some preparation, 3=medium preparation, 4=considerable preparation, 5=extensive preparation)\n\nPlease provide a JSON response with the following structure:\n{\n  \"shortDescription\": \"A brief 1-2 sentence description of what this career involves\",\n  \"fullDescription\": \"A detailed, engaging description of the career (2-3 paragraphs) that explains what professionals in this field do, the impact they have, and what makes this career interesting for high school students\",\n  \"salaryRange\": \"A realistic salary range in format like '$45K - $85K' based on entry to experienced levels\",\n  \"growthRate\": \"Job growth outlook in format like '15% growth' or 'Stable' or 'Declining'\",\n  \"educationLevel\": \"Most common education requirement like 'Bachelor's Degree', 'Master's Degree', 'Certificate', 'High School Diploma', etc.\",\n  \"skills\": [\"Array of 4-6 key skills needed for this career, focused on what high school students can start developing\"],\n  \"roadmap\": [\n    {\n      \"year\": 9,\n      \"title\": \"Freshman Year - Foundation Building\",\n      \"coreClasses\": [\"Array of 4-5 specific high school classes that would prepare students for this career\"],\n      \"activities\": [\"Array of 3-4 extracurricular activities, clubs, or projects relevant to this career path\"]\n    },\n    {\n      \"year\": 10,\n      \"title\": \"Sophomore Year - Skill Development\", \n      \"coreClasses\": [\"Array of 4-5 classes building on freshman foundation\"],\n      \"activities\": [\"Array of 3-4 activities that advance skills from freshman year\"]\n    },\n    {\n      \"year\": 11,\n      \"title\": \"Junior Year - Advanced Learning\",\n      \"coreClasses\": [\"Array of 4-5 advanced/AP classes relevant to the career\"],\n      \"activities\": [\"Array of 3-4 activities including leadership, internships, or competitions\"]\n    },\n    {\n      \"year\": 12,\n      \"title\": \"Senior Year - College Preparation\",\n      \"coreClasses\": [\"Array of 4-5 capstone classes that prepare for college and career\"],\n      \"activities\": [\"Array of 3-4 activities focused on college prep and career exploration\"]\n    }\n  ]\n}\n\nMake sure all information is accurate, age-appropriate for high school students, and actionable. Focus on creating a realistic pathway that students can actually follow. Base the education level and salary information on current job market data.\n");
                        return [4 /*yield*/, openai.chat.completions.create({
                                model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
                                messages: [
                                    {
                                        role: "system",
                                        content: "You are an expert career counselor who creates detailed, accurate career guidance for high school students. Always respond with valid JSON."
                                    },
                                    {
                                        role: "user",
                                        content: prompt_1
                                    }
                                ],
                                response_format: { type: "json_object" },
                                temperature: 0.1,
                                max_tokens: 2000
                            })];
                    case 1:
                        response = _a.sent();
                        result = JSON.parse(response.choices[0].message.content || '{}');
                        // Validate and return the enhanced career info
                        return [2 /*return*/, {
                                shortDescription: result.shortDescription || "".concat(onetCareer.title, " professional"),
                                fullDescription: result.fullDescription || 'Career description not available',
                                salaryRange: result.salaryRange || 'Salary data not available',
                                growthRate: result.growthRate || 'Growth data not available',
                                educationLevel: result.educationLevel || 'Education requirements vary',
                                skills: Array.isArray(result.skills) ? result.skills : [],
                                roadmap: Array.isArray(result.roadmap) ? result.roadmap : []
                            }];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error enhancing career info with OpenAI:', error_1);
                        // Return fallback data if AI enhancement fails
                        return [2 /*return*/, {
                                shortDescription: "".concat(onetCareer.title, " professional"),
                                fullDescription: 'Career description not available - please check your OpenAI API key configuration.',
                                salaryRange: 'Salary data not available',
                                growthRate: 'Growth data not available',
                                educationLevel: 'Education requirements vary',
                                skills: [],
                                roadmap: []
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OpenAIService;
}());
exports.OpenAIService = OpenAIService;
exports.openaiService = new OpenAIService();
