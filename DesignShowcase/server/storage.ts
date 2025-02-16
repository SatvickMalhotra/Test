import { projects, type Project, type InsertProject } from "@shared/schema";

export interface IStorage {
  getAllProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: InsertProject): Promise<Project>;
  deleteProject(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  currentId: number;

  constructor() {
    this.projects = new Map();
    this.currentId = 1;

    // Add some sample projects
    const sampleProjects: InsertProject[] = [
      {
        title: "E-commerce Platform",
        description: "A full-stack e-commerce solution with React and Node.js",
        thumbnail: "https://images.unsplash.com/photo-1557821552-17105176375c",
        liveUrl: "https://example.com/ecommerce",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        tags: ["React", "Node.js", "PostgreSQL"],
        fullDescription: "Built a complete e-commerce platform with features including product catalog, shopping cart, user authentication, and payment processing."
      },
      {
        title: "Weather App",
        description: "Real-time weather application using OpenWeather API",
        thumbnail: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b",
        liveUrl: null,
        videoUrl: null,
        tags: ["JavaScript", "API", "CSS"],
        fullDescription: "Created a weather application that provides real-time weather data and forecasts for any location worldwide."
      }
    ];

    // Initialize with sample projects
    sampleProjects.forEach(project => {
      const id = this.currentId++;
      this.projects.set(id, { ...project, id });
    });
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentId++;
    const newProject = { ...project, id };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: number, project: InsertProject): Promise<Project> {
    if (!this.projects.has(id)) {
      throw new Error("Project not found");
    }
    const updatedProject = { ...project, id };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<void> {
    if (!this.projects.has(id)) {
      throw new Error("Project not found");
    }
    this.projects.delete(id);
  }
}

export const storage = new MemStorage();