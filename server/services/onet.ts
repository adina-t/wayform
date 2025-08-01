import type { ONetCareer } from '../../shared/src/schema';

export class ONetService {
  private readonly baseUrl = 'https://services.onetcenter.org/ws';
  private readonly username = process.env.ONET_USERNAME;
  private readonly password = process.env.ONET_PASSWORD;

  async getCareersByInterestProfile(answerString: string): Promise<ONetCareer[]> {
    try {
      if (!this.username || !this.password) {
        throw new Error('O*NET credentials not configured. Please set ONET_USERNAME and ONET_PASSWORD environment variables.');
      }

      const url = `${this.baseUrl}/mnm/interestprofiler/careers?answers=${encodeURIComponent(answerString)}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`,
          'User-Agent': 'nodejs-Career-Guidance-App/1.00 (bot)'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('O*NET authentication failed. Please verify your credentials are correct.');
        }
        throw new Error(`O*NET API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // The O*NET Interest Profiler API returns careers in this format
      if (!data.career || !Array.isArray(data.career)) {
        return [];
      }

      return data.career.map((career: any) => ({
        code: career.code,
        title: career.title,
        fit: career.fit || 0,
        zone: career.zone || 1
      }));

    } catch (error) {
      console.error('Error fetching careers from O*NET Interest Profiler:', error);
      throw error;
    }
  }

  // Helper method to format Holland Code answers for O*NET API
  formatAnswersForAPI(answers: ('L' | 'D' | 'N')[]): string {
    // O*NET expects answers in a specific format
    // L = Like = 1, D = Dislike = 0, N = Neutral = 0.5 or similar
    return answers.map(answer => {
      switch(answer) {
        case 'L': return '1';
        case 'D': return '0';
        case 'N': return '0';
        default: return '0';
      }
    }).join('');
  }

  // Calculate Holland Code scores
  calculateHollandCode(answers: ('L' | 'D' | 'N')[]): { R: number; I: number; A: number; S: number; E: number; C: number } {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    
    // Each category has 10 questions (0-9, 10-19, 20-29, 30-39, 40-49, 50-59)
    const categories = ['R', 'I', 'A', 'S', 'E', 'C'] as const;
    
    categories.forEach((category, categoryIndex) => {
      const startIndex = categoryIndex * 10;
      const endIndex = startIndex + 10;
      
      for (let i = startIndex; i < endIndex && i < answers.length; i++) {
        if (answers[i] === 'L') {
          scores[category]++;
        }
      }
    });

    return scores;
  }
}

export const onetService = new ONetService();