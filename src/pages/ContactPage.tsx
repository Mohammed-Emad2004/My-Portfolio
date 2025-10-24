import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Clock,
  CheckCircle,
  MessageSquare,
} from "lucide-react";

const ContactPage: React.FC = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "mohammedemadhamdy142@gmail.com",
      href: "mailto:mohammedemadhamdy142@gmail.com",
      description: "Primary communication channel",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+201003703980",
      href: "tel:+201003703980",
      description: "Available for urgent matters",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/Mohammed Emad",
      href: "https://www.linkedin.com/in/mohammed-emad-66414028b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", // Added URL
      description: "Professional networking",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@Mohamed-Emad2004", // Updated username
      href: "https://github.com/Mohammed-Emad2004", // Added URL
      description: "View my code repositories",
    },
  ];

  const responseInfo = [
    { icon: Clock, label: "Response Time", value: "Within 24 hours" },
    { icon: CheckCircle, label: "Availability", value: "Open for projects" },
    {
      icon: MessageSquare,
      label: "Preferred Contact",
      value: "Email or LinkedIn",
    },
  ];


  return (
    <div className="min-h-screen">
      {" "}
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Get In Touch
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I'm excited to contribute to AI projects and explore new
              opportunities. Let’s connect and turn innovative ideas into
              impactful solutions!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {responseInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-card-bg rounded-lg p-6 border border-card-border text-center transition-colors duration-300"
                >
                  <Icon
                    size={32}
                    className="text-blue-500 mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {info.label}
                  </h3>
                  <p className="text-gray-300">{info.value}</p>
                </div>
              );
            })}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Ready to Collaborate?
                </h2>
                <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                  <p>
                    Open to exciting AI projects, data challenges, and
                    creative problem-solving. If you’re looking to turn
                    ideas into impactful solutions, let’s connect and make
                    it happen.
                  </p>
                  <p>
                    Whether you have a question, a project proposal, or
                    just want to discuss the latest in AI, my inbox is
                    always open. Feel free to reach out via email or
                    connect with me on LinkedIn for a more immediate
                    response.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="block bg-card-bg rounded-lg p-6 border border-card-border hover:border-primary/50 transition-colors duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-500 p-3 rounded-lg">
                        <Icon
                          size={24}
                          className="text-primary-foreground"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {info.label}
                        </h3>
                        <p className="text-primary font-medium mb-2">
                          {info.value}
                        </p>
                        <p className="text-gray-300">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;