import OpenAI from "openai";
import type { ONetCareer, RoadmapYear } from "@shared/schema";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "default_key"
});

export interface EnhancedCareerInfo {
  shortDescription: string;
  fullDescription: string;
  salaryRange: string;
  growthRate: string;
  educationLevel: string;
  skills: string[];
  roadmap: RoadmapYear[];
}

export class OpenAIService {
  async enhanceCareerInfo(onetCareer: ONetCareer): Promise<EnhancedCareerInfo> {
    try {
      const prompt = `
You are a career guidance counselor specializing in helping high school students understand career paths. 

Based on the following O*NET career information, provide a comprehensive analysis:

Career: ${onetCareer.title}
O*NET Code: ${onetCareer.code}
Interest Profile Fit: ${onetCareer.fit}% match
Job Zone: ${onetCareer.zone} (1=minimal preparation, 2=some preparation, 3=medium preparation, 4=considerable preparation, 5=extensive preparation)

Please provide a JSON response with the following structure:
{
  "shortDescription": "A brief 1-2 sentence description of what this career involves",
  "fullDescription": "A detailed, engaging description of the career (2-3 paragraphs) that explains what professionals in this field do, the impact they have, and what makes this career interesting for high school students",
  "salaryRange": "A realistic salary range in format like '$45K - $85K' based on entry to experienced levels",
  "growthRate": "Job growth outlook in format like '15% growth' or 'Stable' or 'Declining'",
  "educationLevel": "Most common education requirement like 'Bachelor's Degree', 'Master's Degree', 'Certificate', 'High School Diploma', etc.",
  "skills": ["Array of 4-6 key skills needed for this career, focused on what high school students can start developing"],
  "roadmap": [
    {
      "year": 9,
      "title": "Freshman Year - Foundation Building",
      "coreClasses": ["Array of 4-5 specific high school classes that would prepare students for this career"],
      "activities": ["Array of 3-4 extracurricular activities, clubs, or projects relevant to this career path"]
    },
    {
      "year": 10,
      "title": "Sophomore Year - Skill Development", 
      "coreClasses": ["Array of 4-5 classes building on freshman foundation"],
      "activities": ["Array of 3-4 activities that advance skills from freshman year"]
    },
    {
      "year": 11,
      "title": "Junior Year - Advanced Learning",
      "coreClasses": ["Array of 4-5 advanced/AP classes relevant to the career"],
      "activities": ["Array of 3-4 activities including leadership, internships, or competitions"]
    },
    {
      "year": 12,
      "title": "Senior Year - College Preparation",
      "coreClasses": ["Array of 4-5 capstone classes that prepare for college and career"],
      "activities": ["Array of 3-4 activities focused on college prep and career exploration"]
    }
  ]
}

Make sure all information is accurate, age-appropriate for high school students, and actionable. Focus on creating a realistic pathway that students can actually follow. Base the education level and salary information on current job market data.
`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an expert career counselor who creates detailed, accurate career guidance for high school students. Always respond with valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.1,
        max_tokens: 2000
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      
      // Validate and return the enhanced career info
      return {
        shortDescription: result.shortDescription || `${onetCareer.title} professional`,
        fullDescription: result.fullDescription || 'Career description not available',
        salaryRange: result.salaryRange || 'Salary data not available',
        growthRate: result.growthRate || 'Growth data not available',
        educationLevel: result.educationLevel || 'Education requirements vary',
        skills: Array.isArray(result.skills) ? result.skills : [],
        roadmap: Array.isArray(result.roadmap) ? result.roadmap : []
      };

    } catch (error) {
      console.error('Error enhancing career info with OpenAI:', error);
      
      // Return fallback data if AI enhancement fails
      return {
        shortDescription: `${onetCareer.title} professional`,
        fullDescription: 'Career description not available - please check your OpenAI API key configuration.',
        salaryRange: 'Salary data not available',
        growthRate: 'Growth data not available', 
        educationLevel: 'Education requirements vary',
        skills: [],
        roadmap: []
      };
    }
  }
}

export const openaiService = new OpenAIService();