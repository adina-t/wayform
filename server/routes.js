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
exports.registerRoutes = registerRoutes;
var http_1 = require("http");
var storage_1 = require("./storage");
var onet_1 = require("./services/onet");
var openai_1 = require("./services/openai");
var zod_1 = require("zod");
function registerRoutes(app) {
    return __awaiter(this, void 0, void 0, function () {
        var httpServer;
        var _this = this;
        return __generator(this, function (_a) {
            // Create a new assessment session
            app.post("/api/assessment/start", function (_req, res) { return __awaiter(_this, void 0, void 0, function () {
                var session, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage_1.storage.createAssessmentSession({
                                    answers: [],
                                    currentQuestion: 0,
                                    completed: false
                                })];
                        case 1:
                            session = _a.sent();
                            res.json({ sessionId: session.id });
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Error creating assessment session:', error_1);
                            res.status(500).json({ message: "Failed to create assessment session" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Update assessment session with answers
            app.patch("/api/assessment/:sessionId", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var sessionId, updateData, session, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            sessionId = req.params.sessionId;
                            updateData = zod_1.z.object({
                                answers: zod_1.z.array(zod_1.z.enum(['L', 'D', 'N'])).optional(),
                                currentQuestion: zod_1.z.number().optional(),
                                completed: zod_1.z.boolean().optional()
                            }).parse(req.body);
                            return [4 /*yield*/, storage_1.storage.updateAssessmentSession(sessionId, updateData)];
                        case 1:
                            session = _a.sent();
                            if (!session) {
                                return [2 /*return*/, res.status(404).json({ message: "Assessment session not found" })];
                            }
                            res.json(session);
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            console.error('Error updating assessment session:', error_2);
                            if (error_2 instanceof zod_1.z.ZodError) {
                                return [2 /*return*/, res.status(400).json({
                                        message: "Invalid request data",
                                        errors: error_2.errors
                                    })];
                            }
                            res.status(500).json({ message: "Failed to update assessment session" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Get assessment session
            app.get("/api/assessment/:sessionId", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var sessionId, session, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            sessionId = req.params.sessionId;
                            return [4 /*yield*/, storage_1.storage.getAssessmentSession(sessionId)];
                        case 1:
                            session = _a.sent();
                            if (!session) {
                                return [2 /*return*/, res.status(404).json({ message: "Assessment session not found" })];
                            }
                            res.json(session);
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            console.error('Error fetching assessment session:', error_3);
                            res.status(500).json({ message: "Failed to fetch assessment session" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Process completed assessment and get career recommendations
            app.post("/api/assessment/:sessionId/results", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var sessionId, session, hollandCode, answerString, onetCareers, enhancedCareers, _i, _a, onetCareer, existingCareer, aiEnhancement, newCareer, error_4, response, error_5;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 12, , 13]);
                            sessionId = req.params.sessionId;
                            return [4 /*yield*/, storage_1.storage.getAssessmentSession(sessionId)];
                        case 1:
                            session = _b.sent();
                            if (!session) {
                                return [2 /*return*/, res.status(404).json({ message: "Assessment session not found" })];
                            }
                            if (!session.completed || session.answers.length !== 60) {
                                return [2 /*return*/, res.status(400).json({ message: "Assessment is not complete" })];
                            }
                            hollandCode = onet_1.onetService.calculateHollandCode(session.answers);
                            answerString = onet_1.onetService.formatAnswersForAPI(session.answers);
                            return [4 /*yield*/, onet_1.onetService.getCareersByInterestProfile(answerString)];
                        case 2:
                            onetCareers = _b.sent();
                            if (onetCareers.length === 0) {
                                return [2 /*return*/, res.json({
                                        careers: [],
                                        totalResults: 0,
                                        hollandCode: hollandCode
                                    })];
                            }
                            enhancedCareers = [];
                            _i = 0, _a = onetCareers.slice(0, 10);
                            _b.label = 3;
                        case 3:
                            if (!(_i < _a.length)) return [3 /*break*/, 10];
                            onetCareer = _a[_i];
                            _b.label = 4;
                        case 4:
                            _b.trys.push([4, 8, , 9]);
                            return [4 /*yield*/, storage_1.storage.getCareerByOnetCode(onetCareer.code)];
                        case 5:
                            existingCareer = _b.sent();
                            if (existingCareer) {
                                enhancedCareers.push(existingCareer);
                                return [3 /*break*/, 9];
                            }
                            return [4 /*yield*/, openai_1.openaiService.enhanceCareerInfo(onetCareer)];
                        case 6:
                            aiEnhancement = _b.sent();
                            return [4 /*yield*/, storage_1.storage.createCareer({
                                    onetCode: onetCareer.code,
                                    title: onetCareer.title,
                                    fit: onetCareer.fit,
                                    zone: onetCareer.zone,
                                    shortDescription: aiEnhancement.shortDescription,
                                    fullDescription: aiEnhancement.fullDescription,
                                    salaryRange: aiEnhancement.salaryRange,
                                    growthRate: aiEnhancement.growthRate,
                                    educationLevel: aiEnhancement.educationLevel,
                                    skills: aiEnhancement.skills,
                                    roadmap: aiEnhancement.roadmap
                                })];
                        case 7:
                            newCareer = _b.sent();
                            enhancedCareers.push(newCareer);
                            return [3 /*break*/, 9];
                        case 8:
                            error_4 = _b.sent();
                            console.error("Error processing career ".concat(onetCareer.code, ":"), error_4);
                            return [3 /*break*/, 9];
                        case 9:
                            _i++;
                            return [3 /*break*/, 3];
                        case 10: 
                        // Update session with results
                        return [4 /*yield*/, storage_1.storage.updateAssessmentSession(sessionId, {
                                careers: enhancedCareers,
                                hollandCode: hollandCode
                            })];
                        case 11:
                            // Update session with results
                            _b.sent();
                            response = {
                                careers: enhancedCareers,
                                totalResults: enhancedCareers.length,
                                hollandCode: hollandCode
                            };
                            res.json(response);
                            return [3 /*break*/, 13];
                        case 12:
                            error_5 = _b.sent();
                            console.error('Error processing assessment results:', error_5);
                            res.status(500).json({
                                message: "Failed to process assessment results. Please check your internet connection and try again."
                            });
                            return [3 /*break*/, 13];
                        case 13: return [2 /*return*/];
                    }
                });
            }); });
            // Get career details
            app.get("/api/careers/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var career, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage_1.storage.getCareer(req.params.id)];
                        case 1:
                            career = _a.sent();
                            if (!career) {
                                return [2 /*return*/, res.status(404).json({ message: "Career not found" })];
                            }
                            res.json(career);
                            return [3 /*break*/, 3];
                        case 2:
                            error_6 = _a.sent();
                            console.error('Error fetching career:', error_6);
                            res.status(500).json({ message: "Failed to fetch career information" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            httpServer = (0, http_1.createServer)(app);
            return [2 /*return*/, httpServer];
        });
    });
}
