import { create } from "zustand";
import { Project } from "../types";

interface AppState {
  projects: Project[];
  currentProjectId: string | null;
  setProjects: (projects: Project[]) => void;
  setCurrentProjectId: (projectId: string | null) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  projects: [],
  currentProjectId: null,
  setProjects: (projects: Project[]) => {
    set({ projects });
    // Uncomment the following line when you've created the storage utility
    // saveToLocalStorage("projects", projects);
  },
  setCurrentProjectId: (projectId: string | null) =>
    set({ currentProjectId: projectId }),
  addProject: (project: Project) =>
    set((state) => {
      const newProject = {
        ...project,
      };
      const newProjects = [...state.projects, newProject];
      // saveToLocalStorage("projects", newProjects);
      return { projects: newProjects };
    }),
  updateProject: (updatedProject: Project) =>
    set((state) => {
      const newProjects = state.projects.map((p) =>
        p.id === updatedProject.id ? updatedProject : p
      );
      // Uncomment the following line when you've created the storage utility
      // saveToLocalStorage("projects", newProjects);
      return { projects: newProjects };
    }),
  deleteProject: (projectId: string) =>
    set((state) => {
      const newProjects = state.projects.filter((p) => p.id !== projectId);
      // Uncomment the following line when you've created the storage utility
      // saveToLocalStorage("projects", newProjects);
      return { projects: newProjects };
    }),
}));

// Uncomment and modify the following lines when you've created the storage utility
// const initialProjects = loadFromLocalStorage("projects") || [];
// useAppStore.setState({ projects: initialProjects });
