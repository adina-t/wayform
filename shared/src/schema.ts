import { z } from "zod";

// Holland Code Interest Profiler Question
export interface HollandQuestion {
  id: number;
  text: string;
  category: 'R' | 'I' | 'A' | 'S' | 'E' | 'C'; // Realistic, Investigative, Artistic, Social, Enterprising, Conventional
}

// User's answers to the 60 questions
export const hollandAnswersSchema = z.object({
  answers: z.array(z.enum(['L', 'D', 'N'])).length(60) // Like, Dislike, Neutral
});

export type HollandAnswers = z.infer<typeof hollandAnswersSchema>;

// O*NET Career Response from Interest Profiler API
export interface ONetCareer {
  code: string;
  title: string;
  fit: number;
  zone: number;
}

// Roadmap year structure for high school preparation
export interface RoadmapYear {
  year: number;
  title: string;
  coreClasses: string[];
  activities: string[];
}

// Enhanced career information with AI-generated content
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

// Insert schema for creating careers
export const insertCareerSchema = z.object({
  onetCode: z.string(),
  title: z.string(),
  fit: z.number(),
  zone: z.number(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  salaryRange: z.string(),
  growthRate: z.string(),
  educationLevel: z.string(),
  skills: z.array(z.string()),
  roadmap: z.array(z.object({
    year: z.number(),
    title: z.string(),
    coreClasses: z.array(z.string()),
    activities: z.array(z.string())
  }))
});

export type InsertCareer = z.infer<typeof insertCareerSchema>;

// API Request/Response types
export interface InterestProfilerRequest {
  answers: string; // Formatted answer string for O*NET API
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

// User assessment session
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

export const insertAssessmentSessionSchema = z.object({
  answers: z.array(z.enum(['L', 'D', 'N'])),
  currentQuestion: z.number(),
  completed: z.boolean(),
  careers: z.array(z.any()).optional(),
  hollandCode: z.object({
    R: z.number(),
    I: z.number(),
    A: z.number(),
    S: z.number(),
    E: z.number(),
    C: z.number()
  }).optional()
});

export type InsertAssessmentSession = z.infer<typeof insertAssessmentSessionSchema>;