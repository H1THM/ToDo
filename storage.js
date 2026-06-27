import { createProject } from "./project.js";
const STORAGE_KEY = "projects";

export const database = {
    saveProjects(projects) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    },
    loadProjects() {
         
        let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return data.map(projectData => createProject(projectData.title,projectData));
    }
}

