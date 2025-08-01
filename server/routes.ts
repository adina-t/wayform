import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { onetService } from "./services/onet";
import { openaiService } from "./services/openai";
import { z } from "zod";
import type { InterestProfilerResponse } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Create a new assessment session
  app.post("/api/assessment/start", async (_req, res) => {
    try {
      const session = await storage.createAssessmentSession({
        answers: [],
        currentQuestion: 0,
        completed: false
      });

      res.json({ sessionId: session.id });
    } catch (error) {
      console.error('Error creating assessment session:', error);
      res.status(500).json({ message: "Failed to create assessment session" });
    }
  });

  // Update assessment session with answers
  app.patch("/api/assessment/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const updateData = z.object({
        answers: z.array(z.enum(['L', 'D', 'N'])).optional(),
        currentQuestion: z.number().optional(),
        completed: z.boolean().optional()
      }).parse(req.body);

      const session = await storage.updateAssessmentSession(sessionId, updateData);
      
      if (!session) {
        return res.status(404).json({ message: "Assessment session not found" });
      }

      res.json(session);
    } catch (error) {
      console.error('Error updating assessment session:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid request data", 
          errors: error.errors 
        });
      }

      res.status(500).json({ message: "Failed to update assessment session" });
    }
  });

  // Get assessment session
  app.get("/api/assessment/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await storage.getAssessmentSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ message: "Assessment session not found" });
      }

      res.json(session);
    } catch (error) {
      console.error('Error fetching assessment session:', error);
      res.status(500).json({ message: "Failed to fetch assessment session" });
    }
  });

  // Process completed assessment and get career recommendations
  app.post("/api/assessment/:sessionId/results", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await storage.getAssessmentSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ message: "Assessment session not found" });
      }

      if (!session.completed || session.answers.length !== 60) {
        return res.status(400).json({ message: "Assessment is not complete" });
      }

      // Calculate Holland Code scores
      const hollandCode = onetService.calculateHollandCode(session.answers);

      // Format answers for O*NET API
      const answerString = onetService.formatAnswersForAPI(session.answers);

      // Get career recommendations from O*NET
      const onetCareers = await onetService.getCareersByInterestProfile(answerString);
      
      if (onetCareers.length === 0) {
        return res.json({
          careers: [],
          totalResults: 0,
          hollandCode
        });
      }

      // Enhance careers with AI-generated information
      const enhancedCareers = [];
      
      for (const onetCareer of onetCareers.slice(0, 10)) { // Limit to top 10 results
        try {
          // Check if career already exists in storage
          const existingCareer = await storage.getCareerByOnetCode(onetCareer.code);
          
          if (existingCareer) {
            enhancedCareers.push(existingCareer);
            continue;
          }

          // Enhance with AI
          const aiEnhancement = await openaiService.enhanceCareerInfo(onetCareer);
          
          // Create career record
          const newCareer = await storage.createCareer({
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
          });

          enhancedCareers.push(newCareer);
          
        } catch (error) {
          console.error(`Error processing career ${onetCareer.code}:`, error);
          // Continue with other careers if one fails
        }
      }

      // Update session with results
      await storage.updateAssessmentSession(sessionId, {
        careers: enhancedCareers,
        hollandCode
      });

      const response: InterestProfilerResponse = {
        careers: enhancedCareers,
        totalResults: enhancedCareers.length,
        hollandCode
      };

      res.json(response);

    } catch (error) {
      console.error('Error processing assessment results:', error);
      res.status(500).json({ 
        message: "Failed to process assessment results. Please check your internet connection and try again." 
      });
    }
  });

  // Get career details
  app.get("/api/careers/:id", async (req, res) => {
    try {
      const career = await storage.getCareer(req.params.id);
      
      if (!career) {
        return res.status(404).json({ message: "Career not found" });
      }

      res.json(career);
    } catch (error) {
      console.error('Error fetching career:', error);
      res.status(500).json({ message: "Failed to fetch career information" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}