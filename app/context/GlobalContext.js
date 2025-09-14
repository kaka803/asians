"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Context create karna
const ProjectsContext = createContext();

// Provider
export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [projectloading, setprojectloading] = useState(true)
  const [open, setOpen] = useState(false);
    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(false);

  // API call kar ke projects fetch karna
  const getProjects = async () => {
    try {
      const res = await fetch("/api/getprojects"); 
      const data = await res.json();
console.log(data);

      setprojectloading(false)
      setProjects(data); 
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
      const fetchDevelopers = async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/developers");
          const data = await res.json();
          setDevelopers(data);
        } catch (err) {
          console.error("Fetch error:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchDevelopers();
    }, []);

  return (
    <ProjectsContext.Provider value={{ projects, getProjects, projectloading, open, setOpen, developers, loading }}>
      {children}
    </ProjectsContext.Provider>
  );
};

// Custom hook
export const useProjectsContext = () => useContext(ProjectsContext);
