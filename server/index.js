"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var routes_1 = require("./routes");
// import path from "path";
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var server;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, routes_1.registerRoutes)(app)];
                case 1:
                    server = _a.sent();
                    // Serve the React frontend
                    app.get("/", function (_, res) {
                        res.send("\n      <!DOCTYPE html>\n      <html lang=\"en\">\n        <head>\n          <meta charset=\"UTF-8\" />\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n          <title>Career Guidance - Holland Code Assessment</title>\n          <meta name=\"description\" content=\"Discover your ideal career path with our Holland Code Interest Profiler. Get personalized high school roadmaps for your future career.\" />\n          <script src=\"https://unpkg.com/react@18/umd/react.development.js\"></script>\n          <script src=\"https://unpkg.com/react-dom@18/umd/react-dom.development.js\"></script>\n          <script src=\"https://unpkg.com/@babel/standalone/babel.min.js\"></script>\n          <style>\n            * { margin: 0; padding: 0; box-sizing: border-box; }\n            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); min-height: 100vh; }\n            .container { max-width: 1200px; margin: 0 auto; padding: 20px; }\n            .header { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 30px; text-align: center; }\n            .title { color: #6366f1; font-size: 2.5rem; font-weight: bold; margin-bottom: 10px; }\n            .subtitle { color: #6b7280; font-size: 1.2rem; margin-bottom: 30px; }\n            .btn { background: #6366f1; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer; transition: all 0.3s; }\n            .btn:hover { background: #5856eb; transform: translateY(-2px); }\n            .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 40px; }\n            .feature { background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }\n            .feature h3 { color: #374151; margin-bottom: 15px; }\n            .feature p { color: #6b7280; line-height: 1.6; }\n            .loading { display: none; margin-left: 10px; }\n            .loading.show { display: inline-block; animation: spin 1s linear infinite; }\n            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }\n          </style>\n        </head>\n        <body>\n          <div class=\"container\">\n            <div class=\"header\">\n              <h1 class=\"title\">\uD83E\uDDE0 Career Compass</h1>\n              <p class=\"subtitle\">Discover Your Perfect Career Path with Holland Code Assessment</p>\n              <button class=\"btn\" onclick=\"startAssessment()\">\n                Start Career Assessment\n                <span class=\"loading\">\u27F3</span>\n              </button>\n              <p style=\"margin-top: 15px; color: #6b7280; font-size: 0.9rem;\">60 questions \u2022 Takes 10-15 minutes \u2022 Free</p>\n            </div>\n            \n            <div class=\"features\">\n              <div class=\"feature\">\n                <h3>\uD83C\uDFAF Scientific Assessment</h3>\n                <p>Take our Holland Code Interest Profiler based on scientifically-backed research to identify your personality type and interests.</p>\n              </div>\n              <div class=\"feature\">\n                <h3>\uD83D\uDCBC Real Career Data</h3>\n                <p>Get matched with careers from the official O*NET database, used by career counselors nationwide.</p>\n              </div>\n              <div class=\"feature\">\n                <h3>\uD83C\uDF93 High School Roadmaps</h3>\n                <p>Receive personalized year-by-year guidance for high school classes and activities to prepare for your chosen career.</p>\n              </div>\n            </div>\n          </div>\n\n          <script>\n            async function startAssessment() {\n              const btn = document.querySelector('.btn');\n              const loading = document.querySelector('.loading');\n              \n              btn.disabled = true;\n              loading.classList.add('show');\n              \n              try {\n                const response = await fetch('/api/assessment/start', {\n                  method: 'POST',\n                  headers: { 'Content-Type': 'application/json' }\n                });\n                \n                const data = await response.json();\n                \n                if (data.sessionId) {\n                  alert(`Assessment session created successfully!\\n\\nSession ID: ${data.sessionId}\\n\\nYou can now use this session ID to:\\n1. Save answers (PATCH /api/assessment/${data.sessionId})\\n2. Get session data (GET /api/assessment/${data.sessionId})\\n3. Get results (POST /api/assessment/${data.sessionId}/results)\\n\\nThe full React assessment interface will be available once the frontend is properly configured.`);\n                } else {\n                  alert('Error: ' + (data.message || 'Failed to create session'));\n                }\n              } catch (error) {\n                alert('Error connecting to server: ' + error.message);\n              } finally {\n                btn.disabled = false;\n                loading.classList.remove('show');\n              }\n            }\n          </script>\n        </body>\n      </html>\n    ");
                    });
                    // Handle other routes
                    app.get("*", function (req, res) {
                        if (req.path.startsWith("/api")) {
                            return res.status(404).json({ message: "API endpoint not found" });
                        }
                        // Redirect non-API routes to home
                        res.redirect('/');
                    });
                    server.listen(PORT, function () {
                        var formattedTime = new Date().toLocaleTimeString("en-US", {
                            hour12: false,
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        });
                        console.log("".concat(formattedTime, " [express] serving career guidance app on port ").concat(PORT));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
init().catch(console.error);
