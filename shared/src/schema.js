"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertAssessmentSessionSchema = exports.insertCareerSchema = exports.hollandAnswersSchema = void 0;
const zod_1 = require("zod");
// User's answers to the 60 questions
exports.hollandAnswersSchema = zod_1.z.object({
    answers: zod_1.z.array(zod_1.z.enum(['L', 'D', 'N'])).length(60) // Like, Dislike, Neutral
});
// Insert schema for creating careers
exports.insertCareerSchema = zod_1.z.object({
    onetCode: zod_1.z.string(),
    title: zod_1.z.string(),
    fit: zod_1.z.number(),
    zone: zod_1.z.number(),
    shortDescription: zod_1.z.string(),
    fullDescription: zod_1.z.string(),
    salaryRange: zod_1.z.string(),
    growthRate: zod_1.z.string(),
    educationLevel: zod_1.z.string(),
    skills: zod_1.z.array(zod_1.z.string()),
    roadmap: zod_1.z.array(zod_1.z.object({
        year: zod_1.z.number(),
        title: zod_1.z.string(),
        coreClasses: zod_1.z.array(zod_1.z.string()),
        activities: zod_1.z.array(zod_1.z.string())
    }))
});
exports.insertAssessmentSessionSchema = zod_1.z.object({
    answers: zod_1.z.array(zod_1.z.enum(['L', 'D', 'N'])),
    currentQuestion: zod_1.z.number(),
    completed: zod_1.z.boolean(),
    careers: zod_1.z.array(zod_1.z.any()).optional(),
    hollandCode: zod_1.z.object({
        R: zod_1.z.number(),
        I: zod_1.z.number(),
        A: zod_1.z.number(),
        S: zod_1.z.number(),
        E: zod_1.z.number(),
        C: zod_1.z.number()
    }).optional()
});
