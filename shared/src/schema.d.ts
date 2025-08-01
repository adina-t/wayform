import { z } from "zod";
export interface HollandQuestion {
    id: number;
    text: string;
    category: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
}
export declare const hollandAnswersSchema: z.ZodObject<{
    answers: z.ZodArray<z.ZodEnum<["L", "D", "N"]>, "many">;
}, "strip", z.ZodTypeAny, {
    answers: ("L" | "D" | "N")[];
}, {
    answers: ("L" | "D" | "N")[];
}>;
export type HollandAnswers = z.infer<typeof hollandAnswersSchema>;
export interface ONetCareer {
    code: string;
    title: string;
    fit: number;
    zone: number;
}
export interface RoadmapYear {
    year: number;
    title: string;
    coreClasses: string[];
    activities: string[];
}
export interface Career {
    id: string;
    onetCode: string;
    title: string;
    fit: number;
    zone: number;
    shortDescription: string;
    fullDescription: string;
    salaryRange: string;
    growthRate: string;
    educationLevel: string;
    skills: string[];
    roadmap: RoadmapYear[];
    createdAt: number;
}
export declare const insertCareerSchema: z.ZodObject<{
    onetCode: z.ZodString;
    title: z.ZodString;
    fit: z.ZodNumber;
    zone: z.ZodNumber;
    shortDescription: z.ZodString;
    fullDescription: z.ZodString;
    salaryRange: z.ZodString;
    growthRate: z.ZodString;
    educationLevel: z.ZodString;
    skills: z.ZodArray<z.ZodString, "many">;
    roadmap: z.ZodArray<z.ZodObject<{
        year: z.ZodNumber;
        title: z.ZodString;
        coreClasses: z.ZodArray<z.ZodString, "many">;
        activities: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        title: string;
        year: number;
        coreClasses: string[];
        activities: string[];
    }, {
        title: string;
        year: number;
        coreClasses: string[];
        activities: string[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    onetCode: string;
    title: string;
    fit: number;
    zone: number;
    shortDescription: string;
    fullDescription: string;
    salaryRange: string;
    growthRate: string;
    educationLevel: string;
    skills: string[];
    roadmap: {
        title: string;
        year: number;
        coreClasses: string[];
        activities: string[];
    }[];
}, {
    onetCode: string;
    title: string;
    fit: number;
    zone: number;
    shortDescription: string;
    fullDescription: string;
    salaryRange: string;
    growthRate: string;
    educationLevel: string;
    skills: string[];
    roadmap: {
        title: string;
        year: number;
        coreClasses: string[];
        activities: string[];
    }[];
}>;
export type InsertCareer = z.infer<typeof insertCareerSchema>;
export interface InterestProfilerRequest {
    answers: string;
}
export interface InterestProfilerResponse {
    careers: Career[];
    totalResults: number;
    hollandCode: {
        R: number;
        I: number;
        A: number;
        S: number;
        E: number;
        C: number;
    };
}
export interface AssessmentSession {
    id: string;
    answers: ('L' | 'D' | 'N')[];
    currentQuestion: number;
    completed: boolean;
    careers?: Career[];
    hollandCode?: {
        R: number;
        I: number;
        A: number;
        S: number;
        E: number;
        C: number;
    };
    createdAt: number;
}
export declare const insertAssessmentSessionSchema: z.ZodObject<{
    answers: z.ZodArray<z.ZodEnum<["L", "D", "N"]>, "many">;
    currentQuestion: z.ZodNumber;
    completed: z.ZodBoolean;
    careers: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    hollandCode: z.ZodOptional<z.ZodObject<{
        R: z.ZodNumber;
        I: z.ZodNumber;
        A: z.ZodNumber;
        S: z.ZodNumber;
        E: z.ZodNumber;
        C: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        R: number;
        I: number;
        A: number;
        S: number;
        E: number;
        C: number;
    }, {
        R: number;
        I: number;
        A: number;
        S: number;
        E: number;
        C: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    answers: ("L" | "D" | "N")[];
    currentQuestion: number;
    completed: boolean;
    careers?: any[] | undefined;
    hollandCode?: {
        R: number;
        I: number;
        A: number;
        S: number;
        E: number;
        C: number;
    } | undefined;
}, {
    answers: ("L" | "D" | "N")[];
    currentQuestion: number;
    completed: boolean;
    careers?: any[] | undefined;
    hollandCode?: {
        R: number;
        I: number;
        A: number;
        S: number;
        E: number;
        C: number;
    } | undefined;
}>;
export type InsertAssessmentSession = z.infer<typeof insertAssessmentSessionSchema>;
//# sourceMappingURL=schema.d.ts.map