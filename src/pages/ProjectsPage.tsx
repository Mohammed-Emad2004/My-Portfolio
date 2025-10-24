import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Brain, Heart, Shield, Code, Github } from "lucide-react"; // Import Github icon

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();

  const projects = [
        {
      title: "Movie Portfolio Project",
      description:
        "Developed a Python-based data analysis project to explore and visualize movie datasets. The project covers data collection, cleaning, and exploratory data analysis (EDA) to uncover insights into movie performance, ratings, and trends. It highlights the use of data visualization to tell compelling stories and is structured as a project for demonstrating analytics capabilities.",
      category: "Data Analysis",
      technologies: [
        "Python",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn",
        "Statsmodels",
        "Plotly",
      ],
      features: [
        "Data cleaning and preprocessing for reliable analysis",
        "Exploratory data analysis (EDA) of movie revenues, budgets, ratings, and genres",
        "Visualization of key trends with Matplotlib and Seaborn",
        "Insights into relationships such as budget vs. revenue and genre-based performance",
        "Portfolio-ready notebook for showcasing data storytelling",
      ],
      icon: Brain, // Changed Icon
      status: "Completed",
       github: "#", // Added GitHub link
    },
    {
      title: "Automated API Data Extraction & Appending",
      description:
        "A data engineering project focused on building an automated pipeline to extract data from APIs, transform it, and append it to existing datasets for continuous integration. This project ensures real-time data availability, reduces manual intervention, and supports scalable analytics by automating the entire data ingestion and transformation process.",
      category: "Data Engineering",
      technologies: [
        "Python",
        "Pandas",
        "Scheduling (Cron/Task Scheduler)",
        "APIs (REST/JSON)",
        "Data Cleaning & Transformation",
      ],
      features: [
        "Automated API extraction for dynamic datasets",
        "Implemented logic to append new records to existing data without duplication",
        "Applied robust error handling and logging for reliability",
        "Designed modular scripts for reusability across multiple APIs",
        "Ensured data consistency and readiness for downstream analytics",
      ],
      icon: Code, // Changed Icon
      status: "Completed",
       github: "#", // Added GitHub link
    },
    {
      title: "Fitbit Health",
      description:
        "Comprehensive analysis of Fitbit fitness tracker data to understand daily activity patterns, sleep quality, and overall health trends. The project focuses on deriving actionable insights for healthier lifestyles through data exploration and visualization.",
      category: "Data Analysis",
      technologies: [
        "Power BI",
        "Power Query",
        "DAX",
        "CSV",
        "SQL",
        "Data Modeling & Visualization ",
      ],
      features: [
        "Cleaned and organized raw Fitbit dataset",

        "Visualized daily steps, calories burned, and activity intensity",
        "Analyzed sleep patterns and their relation to activity levels",

        "Discovered trends for optimizing fitness and wellness goals",
      ],
      icon: Heart,
      status: "Completed",
       github: "#", // Added GitHub link
    },
     {
      title: "IMDB Top 250 Movies Analysis",
      description:
        "Data analysis project exploring IMDB’s Top 250 movies to uncover trends in genres, ratings, release years, and audience preferences. The project highlights insights into what makes a movie critically acclaimed and popular among viewers.",
      category: "Data Analysis",
      technologies: [
        "Power BI",
        "Power Query",
        "DAX",
        "APIs",
        "Data Modeling & Visualization",
      ],
      features: [
        "Cleaned and processed IMDB dataset",

        "Visualized rating distributions and genre trends",

        "Identified top directors and actors in the Top 250 list",

        "Analyzed correlations between ratings, votes, and release years",
      ],
      icon: Shield,
      status: "Completed",
       github: "#", // Added GitHub link
    },
        {
      title: "Amazon Web Scraping",
      description:
        "Developed a Python-based web scraping tool to extract product details, prices, and ratings from Amazon for price monitoring and market analysis. The project automates data collection to save time and ensure up-to-date insights.",
      category: "Data Analysis",
      technologies: [
        "Python",
        "Pandas",
        "Scikit-learn",
        "BeautifulSoup",
        "Requests",
      ],
      features: [
        "Automated extraction of product names, prices, and ratings",

        "Data cleaning and organization for further analysis",
        "Capability to monitor price changes over time",
        "Easily adaptable to different product categories",
      ],
      icon: Code,
      status: "Completed",
       github: "#", // Added GitHub link
    },
    {
      title: "Telecom Customer Churn Analysis",
      description:
        "Comprehensive data science project analyzing customer churn patterns in telecommunications. Utilizes machine learning techniques to predict customer retention and identify key factors contributing to churn, enabling proactive strategies to improve customer loyalty.",
      category: "Data Science",
      technologies: [
        "Python",
        "Pandas",
        "Scikit-learn",
        "Matplotlib", // Added visualization libraries
        "Seaborn",
        "Data Cleaning",
        "Feature Engineering",
      ],
      features: [
        "Analyzed customer demographics, usage patterns, and service details",
        "Developed predictive models (e.g., Logistic Regression, Random Forest)",
        "Identified key drivers of churn using feature importance analysis",
        "Created visualizations to illustrate churn trends and model performance",
        "Assessed model performance using ROC-AUC, precision-recall, F1 score, and confusion matrix",
      ],
      icon: Brain, // Changed Icon
      status: "Completed",
       github: "#", // Added GitHub link
    },
     {
      title: "Sales Analysis",
      description:
        "Conducted an in-depth analysis of sales data to uncover trends, measure performance, and identify key growth opportunities. Leveraged data visualization and statistical methods to support data-driven decision-making for optimizing sales strategies and forecasting.",
      category: "Data Analysis",
      technologies: ["Python", "Pandas", "Matplotlib", "Seaborn", "Excel"],
      features: [
        "Analyzed sales performance across different regions, products, and time periods",
        "Identified top-performing products and sales channels",
        "Visualized sales trends using bar charts, line graphs, and heatmaps",
        "Provided actionable insights for improving sales efficiency and targeting",
        "Utilized time series analysis for basic sales forecasting",
      ],
      icon: Code, // Changed Icon
      status: "Completed",
       github: "#", // Added GitHub link
    },
    // { // Keeping this commented out as it was marked 'In Progress'
    //   title: "Mental Health Chatbot",
    //   description: "AI-powered chatbot designed to provide mental health support...",
    //   category: "NLP & AI",
    //   technologies: ["Python", "NLP", "Machine Learning", "PyTorch", "Chatbot Development"],
    //   features: ["Natural language understanding", ...],
    //   icon: Heart,
    //   status: "In Progress",
    //   github: "#", // Add link when ready
    // },
    // Removed Market Basket Analysis as requested in the screenshot implicitly
  ];

  return (
    <div className="min-h-screen"> {/* Base colors from App.tsx */}
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Featured Projects
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
             Showcasing strong technical expertise, analytical thinking, and creative problem-solving to deliver impactful results.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  // Use theme colors for card
                  className="bg-card-bg rounded-lg border border-card-border overflow-hidden transition-colors duration-300"
                >
                  {/* Card Header */}
                  <div className="p-6 border-b border-card-border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 p-2 rounded-lg"> {/* Use theme color */}
                          <Icon size={20} className="text-primary-foreground" /> {/* Use theme color */}
                        </div>
                        <div>
                          <span className="text-sm text-gray-300"> {/* Use theme color */}
                            {project.category}
                          </span>
                          <h2 className="text-xl font-bold text-foreground"> {/* Use theme color */}
                            {project.title}
                          </h2>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Completed' ? 'bg-green-600 text-white' : 'bg-yellow-500 text-black' // Example status colors
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-300">{project.description}</p> {/* Use theme color */}
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Technologies */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-foreground mb-3"> {/* Use theme color */}
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                             // Use secondary button styles for tags
                            className="px-3 py-1 bg-button-secondary-bg text-button-secondary-foreground rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-foreground mb-3"> {/* Use theme color */}
                        Key Features
                      </h3>
                      <div className="space-y-2">
                        {project.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div> {/* Adjusted mt */}
                            <span className="text-gray-300 text-sm"> {/* Use theme color */}
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                     {project.github && project.github !== '#' && ( // Only show button if link exists
                      <div className="flex space-x-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                           // Use primary button styles
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-500-hover text-primary-foreground rounded-lg font-medium transition-colors duration-300 text-sm"
                        >
                          <Github size={16} />
                          <span>View Code</span>
                        </a>
                        {/* Add other links like Live Demo if needed */}
                      </div>
                     )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }} // Adjust delay based on number of projects
            className="text-center mt-16"
          >
            <div className="bg-card-bg rounded-lg p-8 border border-card-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Interested in My Work?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                A selection of projects that highlight the power of AI and data
                science in solving real-world challenges. Excited to explore new
                ideas and turn them into impactful solutions together.
              </p>
              <button
                onClick={() => navigate("/contact")}
                 // Use primary button styles
                className="bg-blue-500 hover:bg-blue-500-hover text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Let's Build Together
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;