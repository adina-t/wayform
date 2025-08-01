// Holland Code Interest Profiler Question interface
interface HollandQuestion {
    id: number;
    text: string;
    category: 'R' | 'I' | 'A' | 'S' | 'E' | 'C'; // Realistic, Investigative, Artistic, Social, Enterprising, Conventional
  }
  
  export const hollandQuestions: HollandQuestion[] = [
    // Realistic (R) - 10 questions
    { id: 1, text: "Build kitchen cabinets", category: 'R' },
    { id: 2, text: "Lay brick or tile", category: 'R' },
    { id: 3, text: "Work on cars", category: 'R' },
    { id: 4, text: "Use a power saw", category: 'R' },
    { id: 5, text: "Fix electrical things", category: 'R' },
    { id: 6, text: "Pitch a tent", category: 'R' },
    { id: 7, text: "Work on a farm", category: 'R' },
    { id: 8, text: "Operate machinery", category: 'R' },
    { id: 9, text: "Build things", category: 'R' },
    { id: 10, text: "Work with animals", category: 'R' },
  
    // Investigative (I) - 10 questions
    { id: 11, text: "Study the movement of planets", category: 'I' },
    { id: 12, text: "Examine blood samples using a microscope", category: 'I' },
    { id: 13, text: "Investigate crimes", category: 'I' },
    { id: 14, text: "Study animal behavior", category: 'I' },
    { id: 15, text: "Work in a biology lab", category: 'I' },
    { id: 16, text: "Read scientific articles", category: 'I' },
    { id: 17, text: "Work with a chemistry set", category: 'I' },
    { id: 18, text: "Solve math problems", category: 'I' },
    { id: 19, text: "Do research", category: 'I' },
    { id: 20, text: "Study genetics", category: 'I' },
  
    // Artistic (A) - 10 questions
    { id: 21, text: "Sketch, draw, or paint", category: 'A' },
    { id: 22, text: "Take photographs", category: 'A' },
    { id: 23, text: "Write stories or articles", category: 'A' },
    { id: 24, text: "Play a musical instrument", category: 'A' },
    { id: 25, text: "Perform in a play", category: 'A' },
    { id: 26, text: "Sing in a choir", category: 'A' },
    { id: 27, text: "Create special effects for movies", category: 'A' },
    { id: 28, text: "Design artwork for magazines", category: 'A' },
    { id: 29, text: "Write movie scripts", category: 'A' },
    { id: 30, text: "Perform jazz or tap dance", category: 'A' },
  
    // Social (S) - 10 questions
    { id: 31, text: "Teach children how to read", category: 'S' },
    { id: 32, text: "Help people with personal problems", category: 'S' },
    { id: 33, text: "Take care of sick people", category: 'S' },
    { id: 34, text: "Help people with family problems", category: 'S' },
    { id: 35, text: "Teach adults to read", category: 'S' },
    { id: 36, text: "Work with mentally disabled children", category: 'S' },
    { id: 37, text: "Teach sign language", category: 'S' },
    { id: 38, text: "Help elderly people", category: 'S' },
    { id: 39, text: "Be a nurse", category: 'S' },
    { id: 40, text: "Give career guidance", category: 'S' },
  
    // Enterprising (E) - 10 questions
    { id: 41, text: "Sell restaurant franchises", category: 'E' },
    { id: 42, text: "Sell merchandise at a department store", category: 'E' },
    { id: 43, text: "Manage a clothing store", category: 'E' },
    { id: 44, text: "Sell houses", category: 'E' },
    { id: 45, text: "Run a toy store", category: 'E' },
    { id: 46, text: "Manage a restaurant", category: 'E' },
    { id: 47, text: "Sell computer equipment", category: 'E' },
    { id: 48, text: "Be an insurance agent", category: 'E' },
    { id: 49, text: "Start your own business", category: 'E' },
    { id: 50, text: "Negotiate business contracts", category: 'E' },
  
    // Conventional (C) - 10 questions
    { id: 51, text: "Develop a spreadsheet using computer software", category: 'C' },
    { id: 52, text: "Proofread records or forms", category: 'C' },
    { id: 53, text: "Use a computer program to generate reports", category: 'C' },
    { id: 54, text: "Keep shipping and receiving records", category: 'C' },
    { id: 55, text: "Calculate the wages of employees", category: 'C' },
    { id: 56, text: "Take inventory of supplies", category: 'C' },
    { id: 57, text: "Maintain employee records", category: 'C' },
    { id: 58, text: "Budget expenses for an organization", category: 'C' },
    { id: 59, text: "Keep accounts payable/receivable", category: 'C' },
    { id: 60, text: "Schedule conferences for an organization", category: 'C' }
  ];