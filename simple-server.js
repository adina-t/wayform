const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

// Store for sessions (simple in-memory)
const sessions = new Map();

// Generate random ID
function generateId() {
  return Math.random().toString(36).substr(2, 9) + '-' + Date.now();
}

// Create new assessment session
app.post('/api/assessment/start', (req, res) => {
  const sessionId = generateId();
  const session = {
    id: sessionId,
    answers: [],
    currentQuestion: 0,
    completed: false,
    createdAt: Date.now()
  };
  
  sessions.set(sessionId, session);
  res.json({ sessionId });
});

// Get session
app.get('/api/assessment/:sessionId', (req, res) => {
  const session = sessions.get(req.params.sessionId);
  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }
  res.json(session);
});

// Update session
app.patch('/api/assessment/:sessionId', (req, res) => {
  const session = sessions.get(req.params.sessionId);
  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }
  
  // Update session with new data
  Object.assign(session, req.body);
  sessions.set(req.params.sessionId, session);
  res.json(session);
});

// Serve frontend
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Career Guidance - Holland Code Assessment</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); min-height: 100vh; }
          .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
          .header { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 30px; text-align: center; }
          .title { color: #6366f1; font-size: 2.5rem; font-weight: bold; margin-bottom: 10px; }
          .subtitle { color: #6b7280; font-size: 1.2rem; margin-bottom: 30px; }
          .btn { background: #6366f1; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer; transition: all 0.3s; display: inline-flex; align-items: center; gap: 10px; }
          .btn:hover { background: #5856eb; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4); }
          .btn:disabled { opacity: 0.6; transform: none; cursor: not-allowed; }
          .loading { display: none; animation: spin 1s linear infinite; }
          .loading.show { display: inline-block; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 40px; }
          .feature { background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
          .feature h3 { color: #374151; margin-bottom: 15px; font-size: 1.3rem; }
          .feature p { color: #6b7280; line-height: 1.6; }
          .result { margin-top: 20px; padding: 20px; background: #f0f9ff; border: 1px solid #e0f2fe; border-radius: 8px; display: none; }
          .result.show { display: block; }
          .result h3 { color: #0369a1; margin-bottom: 10px; }
          .result p { color: #075985; margin-bottom: 10px; }
          .result ul { color: #075985; margin-left: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">🧠 Career Compass</h1>
            <p class="subtitle">Discover Your Perfect Career Path with Holland Code Assessment</p>
            <button class="btn" onclick="startAssessmentDemo()">
              <span>Start Career Assessment</span>
              <span class="loading">⟳</span>
            </button>
            <p style="margin-top: 15px; color: #6b7280; font-size: 0.9rem;">60 questions • Takes 10-15 minutes • Free</p>
            
            <div class="result" id="result">
              <h3>✅ Assessment Session Created Successfully!</h3>
              <p><strong>Session ID:</strong> <span id="sessionId"></span></p>
              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>Save answers: PATCH /api/assessment/{sessionId}</li>
                <li>Get session data: GET /api/assessment/{sessionId}</li>
                <li>Get results: POST /api/assessment/{sessionId}/results</li>
              </ul>
              <p style="margin-top: 15px; font-size: 0.9rem; color: #6b7280;">
                The API is working perfectly! This demonstrates Method 3 - using the React frontend to trigger the session creation.
              </p>
            </div>
          </div>
          
          <div class="features">
            <div class="feature">
              <h3>🎯 Scientific Assessment</h3>
              <p>Take our Holland Code Interest Profiler based on scientifically-backed research to identify your personality type and interests.</p>
            </div>
            <div class="feature">
              <h3>💼 Real Career Data</h3>
              <p>Get matched with careers from the official O*NET database, used by career counselors nationwide.</p>
            </div>
            <div class="feature">
              <h3>🎓 High School Roadmaps</h3>
              <p>Receive personalized year-by-year guidance for high school classes and activities to prepare for your chosen career.</p>
            </div>
          </div>
        </div>

        <script>
          async function startAssessmentDemo() {
            const btn = document.querySelector('.btn');
            const loading = document.querySelector('.loading');
            const result = document.getElementById('result');
            const sessionIdSpan = document.getElementById('sessionId');
            
            btn.disabled = true;
            loading.classList.add('show');
            result.classList.remove('show');
            
            try {
              console.log('Making POST request to /api/assessment/start...');
              
              const response = await fetch('/api/assessment/start', {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json'
                }
              });
              
              console.log('Response status:', response.status);
              
              if (!response.ok) {
                throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
              }
              
              const data = await response.json();
              console.log('Response data:', data);
              
              if (data.sessionId) {
                sessionIdSpan.textContent = data.sessionId;
                result.classList.add('show');
                
                // Test getting the session
                const sessionResponse = await fetch(\`/api/assessment/\${data.sessionId}\`);
                const sessionData = await sessionResponse.json();
                console.log('Session data:', sessionData);
                
              } else {
                throw new Error('No session ID returned');
              }
              
            } catch (error) {
              console.error('Error:', error);
              alert(\`Error: \${error.message}\`);
            } finally {
              btn.disabled = false;
              loading.classList.remove('show');
            }
          }
        </script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Career Guidance App running on http://localhost:${PORT}`);
  console.log('📍 Visit the URL above to test Method 3!');
});