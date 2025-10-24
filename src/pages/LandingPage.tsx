import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import ParticleBackground from "../components/ParticleBackground";
import TypewriterText from "../components/TypewriterText";

const LandingPage: React.FC = () => {
  const [showEnterButton, setShowEnterButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEnterButton(true);
    }, 4000); // 4 ثواني قبل ظهور الزر

    return () => clearTimeout(timer);
  }, []);

  const handleEnterPortfolio = () => {
    navigate("/about");
  };

  return (
    // تعديل 1: استخدام قيم الهكس للخلفية والنص
    <div className="relative min-h-screen bg-[#000000] text-[#ffffff] overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <span className="block sm:inline">Mohammed Emad</span>{" "}
            <span className="block sm:inline">Hamdy</span>
          </motion.h1>

          {/* تعديل 2: استخدام قيمة الهكس لـ text-gray-300 */}
          <motion.div
            className="text-xl md:text-2xl text-[#d1d5db] mb-8 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <TypewriterText
              texts={[
                "AI Engineer",
                "Machine Learning Engineer",
                "Data Analyst",
              ]}
              delay={2000}
            />
          </motion.div>

          <motion.div
            className="flex justify-center space-x-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
          >
            {/* تعديل 3: استخدام قيم الهكس للأيقونات (gray-400 و blue-400) */}
            <motion.a
              href="mailto:mohammedemadhamdy142@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9ca3af] hover:text-[#60a5fa] transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={32} />
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9ca3af] hover:text-[#60a5fa] transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={32} />
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9ca3af] hover:text-[#60a5fa] transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={32} />
            </motion.a>
          </motion.div>

          {showEnterButton && (
            // تعديل 4: استخدام قيم الهكس للزر (white, black, gray-100)
            <motion.button
              onClick={handleEnterPortfolio}
              className="group bg-[#ffffff] text-[#000000] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#f3f4f6] transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore My Work
              <motion.div
                className="inline-block ml-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronDown className="inline" size={20} />
              </motion.div>
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* تعديل 5: استخدام قيمة الهكس للسهم السفلي (gray-400) */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#9ca3af]"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </div>
  );
};

export default LandingPage;