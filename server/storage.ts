import type { Career, InsertCareer, AssessmentSession, InsertAssessmentSession } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Career operations
  getCareer(id: string): Promise<Career | undefined>;
  getCareerByOnetCode(onetCode: string): Promise<Career | undefined>;
  createCareer(career: InsertCareer): Promise<Career>;
  
  // Assessment session operations
  createAssessmentSession(session: InsertAssessmentSession): Promise<AssessmentSession>;
  getAssessmentSession(id: string): Promise<AssessmentSession | undefined>;
  updateAssessmentSession(id: string, updates: Partial<AssessmentSession>): Promise<AssessmentSession | undefined>;
}

export class MemStorage implements IStorage {
  private careers: Map<string, Career>;
  private assessmentSessions: Map<string, AssessmentSession>;

  constructor() {
    this.careers = new Map();
    this.assessmentSessions = new Map();
  }

  async getCareer(id: string): Promise<Career | undefined> {
    return this.careers.get(id);
  }

  async getCareerByOnetCode(onetCode: string): Promise<Career | undefined> {
    return Array.from(this.careers.values()).find(
      (career) => career.onetCode === onetCode,
    );
  }

  async createCareer(insertCareer: InsertCareer): Promise<Career> {
    const id = randomUUID();
    const career: Career = { 
      ...insertCareer, 
      id,
      createdAt: Date.now()
    };
    this.careers.set(id, career);
    return career;
  }

  async createAssessmentSession(insertSession: InsertAssessmentSession): Promise<AssessmentSession> {
    const id = randomUUID();
    const session: AssessmentSession = { 
      ...insertSession, 
      id,
      createdAt: Date.now()
    };
    this.assessmentSessions.set(id, session);
    return session;
  }

  async getAssessmentSession(id: string): Promise<AssessmentSession | undefined> {
    return this.assessmentSessions.get(id);
  }

  async updateAssessmentSession(id: string, updates: Partial<AssessmentSession>): Promise<AssessmentSession | undefined> {
    const session = this.assessmentSessions.get(id);
    if (!session) return undefined;

    const updatedSession = { ...session, ...updates };
    this.assessmentSessions.set(id, updatedSession);
    return updatedSession;
  }
}

export const storage = new MemStorage();