import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Brain,
  BarChart3,
  Award,
  CheckCircle,
} from "lucide-react";

const SkillsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("ai");

  // تعريف الفئات والمهارات (كما هي في الكود الأصلي)
    const skillCategories = {
    ai: {
      title: "AI, LLMs & Computer Vision",
      icon: Brain,
      skills: [
        {
          name: "Computer Vision & OCR",
          description: "Image understanding, document intelligence, and custom OCR pipelines for IDs, meters, prescriptions, and more",
          technologies: ["OpenCV", "Azure Vision AI", "YOLO", "Tesseract"],
        },
        {
          name: "LLMs & Language Agents",
          description: "Context-aware assistants, PDF/chat agents, and RAG pipelines for production",
          technologies: ["LangChain", "Llama", "Ollama", "FastAPI", "Pinecone"],
        },
        {
          name: "Speech & Multimodal AI",
          description: "Text-to-speech, sign language recognition, and AI-based accessibility features",
          technologies: ["gTTS", "MediaPipe", "LSTM", "Pygame"],
        },
        {
          name: "AI Deployment & Workflows",
          description: "FastAPI-based AI systems, cloud deployment, and automated pipelines",
          technologies: ["FastAPI", "Uvicorn", "Docker", "Streamlit"],
           
        },
      ],
    },
    data: {
      title: "Data Analytics & Workflows",
      icon: BarChart3,
      skills: [
        {
          name: "Data Analysis & Dashboards",
          description: "Interactive reports, performance insights, and Excel/Power BI dashboards",
          technologies: ["Pandas", "NumPy", "Matplotlib", "Excel", "Power BI", "Tableau", "SQL Server"],
           
        },
        {
          name: "ML Pipelines & Deployment",
          description: "End-to-end pipelines for model training, evaluation, and deployment",
          technologies: ["Scikit-learn", "MLflow", "Airflow", "XGBoost"],
           
        },
      ],
    },
    programming: {
      title: "Programming & Engineering",
      icon: Code,
      skills: [
        {
          name: "Problem Solving",
          description: "Building logical, efficient solutions through structured thinking and algorithmic approaches. Experience in solving diverse challenges using a variety of computational techniques and optimization strategies.",
          technologies: ["Competitive programming basics", "Algorithm & analysis", "Time & space complexity optimization"],
           experience: "2+ years",
        },
        {
          name: "Core Fundamentals",
          description: "Solid foundation in computer science principles ensuring scalable, maintainable, and efficient code.",
          technologies: ["Data Structures", "Algorithms ", "OOP", "Code modularity & clean architecture principles"],
           experience: "2+ years",
        },
         {
           name: "Programming Languages",
           description: "Proficient in multiple languages for diverse application development.", // Added description
           technologies: ["C++", "C#", "Python", "Java"],
            experience: "2+ years",
         },
         {
           name: "Frameworks & Libraries",
            description: "Experience with backend frameworks for building web applications.", // Added description
           technologies: ["ASP.NET Core", "Django"],
           
         },
         {
           name: "Databases",
           description: "Knowledge of both relational and NoSQL databases.", // Added description
           technologies: ["MongoDB", "MySQL", "SQL Server"],
            
         },
      ],
    },
  };

   const certifications = [
    {
      title: "Career Essentials in Generative AI by Microsoft and LinkedIn",
      issuer: "Microsoft",
      year: "2025",
    },
    {
      title: "Generative AI: Working with Large Language Models",
      issuer: "LinkedIn",
      year: "2025",
    },
    {
      title: "Google Analytics Certification",
      issuer: "Google",
      year: "2025",
    },
    {
      title: "AI Knowledge Badge", // Updated name
      issuer: "SAS",
      year: "2025",
    },
    {
      title:
        "Microsoft Azure AI Essentials Professional Certificate by Microsoft and LinkedIn",
      issuer: "Microsoft",
      year: "2025",
    },
    {
      title: "Introduction to Data Science ", // Corrected title
      issuer: "Cisco Networking Academy",
      year: "2025",
    },
    // { // Removed duplicate NVIDIA cert
    //   title: "Applied Deep Learning",
    //   issuer: "NVIDIA",
    //   year: "2025",
    // },
  ];

  return (
    // الخلفية الأساسية تأتي من App.tsx
    <div className="min-h-screen">
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
             {/* CORRECT: Use text-foreground */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Technical Skills
            </h1>
             {/* CORRECT: Use bg-blue-500 */}
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
             {/* CORRECT: Use text-gray-300 */}
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive technical expertise across AI, Problem solving, Data
              science & Cloud deployment
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {[
              { label: "Projects Completed", value: "20+", icon: CheckCircle },
              { label: "Technologies Mastered", value: "35+", icon: Code },
              { label: "Certifications", value: "15+", icon: Award },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  {/* CORRECT: Use card colors */}
                  <div className="bg-card-bg rounded-lg p-6 border border-card-border">
                    <Icon size={32} className="text-primary mx-auto mb-4" /> {/* Icon color */}
                    <h3 className="text-3xl font-bold text-foreground mb-2"> {/* Stat value color */}
                      {stat.value}
                    </h3>
                    <p className="text-gray-300">{stat.label}</p> {/* Stat label color */}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Category Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {Object.entries(skillCategories).map(([key, category]) => {
              const Icon = category.icon;
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  // CORRECT: Use theme colors for active/inactive states
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg border transition-colors duration-300 ${
                    isActive
                      ? "bg-blue-500 text-primary-foreground border-primary"
                      : "bg-card-bg text-gray-300 border-card-border hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{category.title}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Active Category Skills */}
          <motion.div
            key={activeCategory} // Key ensures re-animation on category change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
             {/* CORRECT: Use card colors */}
            <div className="bg-card-bg rounded-lg p-8 border border-card-border">
              <div className="flex items-center mb-8">
                {React.createElement(skillCategories[activeCategory as keyof typeof skillCategories].icon, {
                  size: 32,
                  className: "text-primary mr-4", // Icon color
                })}
                 {/* CORRECT: Use foreground */}
                <h2 className="text-3xl font-bold text-foreground">
                  {skillCategories[activeCategory as keyof typeof skillCategories].title}
                </h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {skillCategories[activeCategory as keyof typeof skillCategories].skills.map((skill) => (
                  <div
                    key={skill.name}
                    // CORRECT: Use background (slightly different from card-bg) and card border for nested cards
                    className="bg-background rounded-lg p-6 border border-card-border"
                  >
                     {/* CORRECT: Use foreground */}
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {skill.name}
                    </h3>
                     {/* CORRECT: Use muted-foreground */}
                    <p className="text-gray-300 mb-4">{skill.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          // CORRECT: Use primary colors for tech tags
                          className="px-3 py-1 bg-blue-500 text-primary-foreground rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
             {/* CORRECT: Use foreground */}
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Professional Certifications
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                   // CORRECT: Use card colors
                  className="bg-card-bg rounded-lg p-6 border border-card-border"
                >
                  <div className="flex items-center">
                    <Award size={24} className="text-primary mr-3 flex-shrink-0" /> {/* Icon color */}
                    <div>
                       {/* CORRECT: Use foreground */}
                      <h3 className="font-semibold text-foreground leading-tight">
                        {cert.title}
                      </h3>
                       {/* CORRECT: Use muted-foreground */}
                      <p className="text-gray-300 text-sm mt-1">
                        {cert.issuer} • {cert.year}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;