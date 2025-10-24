import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Import useTheme
import {
  Home,
  User,
  Code,
  FolderOpen,
  GraduationCap,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // Get theme state and toggle function

  const navItems = [
    { id: "/", label: "Home", icon: Home },
    { id: "/about", label: "About", icon: User },
    { id: "/skills", label: "Skills", icon: Code },
    { id: "/projects", label: "Projects", icon: FolderOpen },
    { id: "/education", label: "Education", icon: GraduationCap },
    { id: "/contact", label: "Contact", icon: Mail },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.nav
        // Use theme-aware classes for background and border
        className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-card-border transition-colors duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" onClick={closeMobileMenu} className="block">
              <div className="text-2xl font-bold text-foreground">Mohammed Emad Hamdy</div> {/* Use text-foreground */}
            </Link>

            {/* Desktop Navigation & Theme Toggle */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.id;
                return (
                  <Link
                    key={item.id}
                    to={item.id}
                    // Use theme-aware classes for links and active state
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                      isActive
                        ? "bg-blue-500 text-primary-foreground" // Active link uses primary colors
                        : "text-muted-foreground hover:text-foreground hover:bg-card-bg" // Inactive uses muted/foreground/card
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
              {/* Theme Toggle Button - Desktop */}
              <button
                onClick={toggleTheme}
                // Use theme-aware classes for the toggle button
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card-bg transition-colors duration-300 ml-2"
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
               // Use theme-aware classes for mobile toggle
              className="lg:hidden p-2 rounded-lg bg-card-bg hover:bg-card-border/50 transition-colors duration-300 text-foreground"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              // Use theme-aware classes for mobile menu background and border
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background shadow-xl z-50 lg:hidden overflow-y-auto border-l border-card-border"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-card-border">
                  <h2 className="text-xl font-bold text-foreground">Navigation</h2>
                  {/* Theme Toggle Button - Mobile */}
                  <button
                    onClick={toggleTheme}
                     className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card-bg transition-colors duration-300 mr-2"
                     aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                   >
                     {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                   </button>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-lg hover:bg-card-bg transition-colors duration-300 text-foreground"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Mobile Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item) => {
                     const Icon = item.icon;
                     const isActive = location.pathname === item.id;
                     return (
                       <Link
                         key={item.id}
                         to={item.id}
                         onClick={closeMobileMenu}
                         // Use theme-aware classes for mobile links
                         className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-300 ${
                           isActive
                            ? "bg-blue-500 text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-card-bg"
                         }`}
                       >
                         <Icon size={20} />
                         <span className="font-medium">{item.label}</span>
                       </Link>
                     );
                   })}
                 </div>
                 {/* Mobile Menu Footer */}
                 <div className="mt-8 pt-6 border-t border-card-border">
                   <div className="text-center">
                     <div className="text-lg font-bold text-foreground mb-2">
                       Mohammed Emad Hamdy
                     </div>
                     <p className="text-sm text-muted-foreground">
                       AI Engineer & Data Analyst
                     </p>
                   </div>
                 </div>
               </div>
             </motion.div>
           </>
         )}
       </AnimatePresence>
     </>
   );
 };

 export default Navigation;