import React from "react";
import { PlayCircleIcon, ClockIcon, UserIcon } from "lucide-react";
interface Tutorial {
  id: number;
  title: string;
  description: string;
  duration: string;
  author: string;
  level: string;
  image: string;
}
export const TutorialsContent = () => {
  const tutorials: Tutorial[] = [
    {
      id: 1,
      title: "Getting Started with Our Platform",
      description:
        "Learn the basics of our platform and how to navigate the dashboard.",
      duration: "5 min",
      author: "Sarah Johnson",
      level: "Beginner",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      title: "Advanced Data Analysis",
      description:
        "Dive deeper into analyzing your data with our advanced tools.",
      duration: "15 min",
      author: "Michael Chen",
      level: "Advanced",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      title: "Customizing Your Workspace",
      description:
        "Learn how to personalize your workspace for maximum productivity.",
      duration: "8 min",
      author: "Alex Rodriguez",
      level: "Intermediate",
      image:
        "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      title: "Integrating Third-Party Apps",
      description: "Connect your favorite apps and services with our platform.",
      duration: "12 min",
      author: "Jessica Kim",
      level: "Intermediate",
      image:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
  ];
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Video Tutorials
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={tutorial.image}
                alt={tutorial.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <PlayCircleIcon size={48} className="text-white opacity-80" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    tutorial.level === "Beginner"
                      ? "bg-green-100 text-green-800"
                      : tutorial.level === "Intermediate"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {tutorial.level}
                </span>
              </div>
              <h3 className="font-medium text-lg text-gray-800 mb-2">
                {tutorial.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {tutorial.description}
              </p>
              <div className="flex items-center text-gray-500 text-sm">
                <ClockIcon size={16} className="mr-1" />
                <span className="mr-4">{tutorial.duration}</span>
                <UserIcon size={16} className="mr-1" />
                <span>{tutorial.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
