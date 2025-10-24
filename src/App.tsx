import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext"; // Import ThemeProvider

import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import EducationPage from "./pages/EducationPage";
import ContactPage from "./pages/ContactPage";
import Navigation from "./components/Navigation";
import "./index.css"; // Import the CSS file

function AppContent() {
  const location = useLocation();
  // Keep hideNavOn logic if you need it for specific routes like the landing page
   const hideNavOn = ["/"]; // Adjust if your landing page path is different

  return (
    // Use the theme-aware classes defined in tailwind.config.js
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Conditionally render Navigation */}
      {!hideNavOn.includes(location.pathname) && <Navigation />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider> {/* Wrap the entire application */}
      <Router basename="/My-Portfolio"> {/* Ensure correct basename */}
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;