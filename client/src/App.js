"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wouter_1 = require("wouter");
var react_query_1 = require("@tanstack/react-query");
var AssessmentPage_1 = require("./pages/AssessmentPage");
var ResultsPage_1 = require("./pages/ResultsPage");
var HomePage_1 = require("./pages/HomePage");
var queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});
function Router() {
    return (<wouter_1.Switch>
      <wouter_1.Route path="/" component={HomePage_1.default}/>
      <wouter_1.Route path="/assessment" component={AssessmentPage_1.default}/>
      <wouter_1.Route path="/results/:sessionId" component={ResultsPage_1.default}/>
      <wouter_1.Route>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <a href="/" className="text-primary hover:underline">Go Home</a>
          </div>
        </div>
      </wouter_1.Route>
    </wouter_1.Switch>);
}
function App() {
    return (<react_query_1.QueryClientProvider client={queryClient}>
      <Router />
    </react_query_1.QueryClientProvider>);
}
exports.default = App;
