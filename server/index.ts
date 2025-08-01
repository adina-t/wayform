import express from "express";
import { registerRoutes } from "./routes";
// import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function init() {
  // Register API routes
  const server = await registerRoutes(app);

  // Serve the React frontend
  app.get("/", (_, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Career Guidance - Holland Code Assessment</title>
          <meta name="description" content="Discover your ideal career path with our Holland Code Interest Profiler. Get personalized high school roadmaps for your future career." />
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); min-height: 100vh; }
            .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
            .header { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 30px; text-align: center; }
            .title { color: #6366f1; font-size: 2.5rem; font-weight: bold; margin-bottom: 10px; }
            .subtitle { color: #6b7280; font-size: 1.2rem; margin-bottom: 30px; }
            .btn { background: #6366f1; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer; transition: all 0.3s; }
            .btn:hover { background: #5856eb; transform: translateY(-2px); }
            .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 40px; }
            .feature { background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
            .feature h3 { color: #374151; margin-bottom: 15px; }
            .feature p { color: #6b7280; line-height: 1.6; }
            .loading { display: none; margin-left: 10px; }
            .loading.show { display: inline-block; animation: spin 1s linear infinite; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="title">🧠 Career Compass</h1>
              <p class="subtitle">Discover Your Perfect Career Path with Holland Code Assessment</p>
              <button class="btn" onclick="startAssessment()">
                Start Career Assessment
                <span class="loading">⟳</span>
              </button>
              <p style="margin-top: 15px; color: #6b7280; font-size: 0.9rem;">60 questions • Takes 10-15 minutes • Free</p>
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
            async function startAssessment() {
              const btn = document.querySelector('.btn');
              const loading = document.querySelector('.loading');
              
              btn.disabled = true;
              loading.classList.add('show');
              
              try {
                const response = await fetch('/api/assessment/start', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' }
                });
                
                const data = await response.json();
                
                if (data.sessionId) {
                  alert(\`Assessment session created successfully!\\n\\nSession ID: \${data.sessionId}\\n\\nYou can now use this session ID to:\\n1. Save answers (PATCH /api/assessment/\${data.sessionId})\\n2. Get session data (GET /api/assessment/\${data.sessionId})\\n3. Get results (POST /api/assessment/\${data.sessionId}/results)\\n\\nThe full React assessment interface will be available once the frontend is properly configured.\`);
                } else {
                  alert('Error: ' + (data.message || 'Failed to create session'));
                }
              } catch (error) {
                alert('Error connecting to server: ' + error.message);
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

  // Handle other routes
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) {
      return res.status(404).json({ message: "API endpoint not found" });
    }
    
    // Redirect non-API routes to home
    res.redirect('/');
  });

  server.listen(PORT, () => {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    console.log(`${formattedTime} [express] serving career guidance app on port ${PORT}`);
  });
}

init().catch(console.error);