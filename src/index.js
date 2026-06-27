import "./styles.css";
import { database } from "../storage.js";
import { createProject } from "../project.js";
import { createTodo } from "../todo.js";
import { renderProjects, renderTodos } from "../ui.js";

let projects = database.loadProjects();
let activeProjectIndex = projects.length > 0 ? 0 : -1;

function updateUI() {
    renderProjects(projects, activeProjectIndex);
    renderTodos(activeProjectIndex >= 0 ? projects[activeProjectIndex] : null);
}

function saveData() {
    database.saveProjects(projects);
}

// -----------------------------------------
// EVENT LISTENERS
// -----------------------------------------

// Add Project
document.getElementById("add-project-btn").addEventListener("click", () => {
    const input = document.getElementById("new-project-input");
    if (input.value.trim() === "") return;

    const newProj = createProject(input.value);
    projects.push(newProj);
    activeProjectIndex = projects.length - 1; // select the newly created project
    
    input.value = "";
    saveData();
    updateUI();
});

// Project List Interactions (Clicking to select or delete)
// We use Event Delegation here: attaching one listener to the parent UL
document.getElementById("project-list").addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const index = parseInt(li.dataset.index);

    // If they clicked the delete button
    if (e.target.classList.contains("delete-project-btn")) {
        projects.splice(index, 1);
        // Reset active index safely
        activeProjectIndex = projects.length > 0 ? 0 : -1;
        saveData();
        updateUI();
        return;
    }

    // Otherwise they just clicked the project to select it
    activeProjectIndex = index;
    updateUI();
});

// Add Todo
document.getElementById("add-todo-btn").addEventListener("click", () => {
    const input = document.getElementById("new-todo-input");
    if (input.value.trim() === "") return;

    const newTodo = createTodo(input.value);
    // You can try implementing priority and date inputs later if you feel up to it!
    
    projects[activeProjectIndex].addTodo(newTodo);
    
    input.value = "";
    saveData();
    updateUI();
});

// Todo List Interactions (Toggle or Delete)
document.getElementById("todo-list").addEventListener("click", (e) => {
    if (activeProjectIndex < 0) return;
    
    const activeProject = projects[activeProjectIndex];
    
    if (e.target.classList.contains("delete-todo-btn")) {
        const todoIndex = parseInt(e.target.dataset.index);
        const todoObj = activeProject.gettodos()[todoIndex];
        activeProject.removeTodo(todoObj);
        saveData();
        updateUI();
    } 
    else if (e.target.classList.contains("toggle-todo-btn")) {
        const todoIndex = parseInt(e.target.dataset.index);
        const todoObj = activeProject.gettodos()[todoIndex];
        todoObj.toggleCompleted();
        saveData();
        updateUI();
    }
});

// Initial Render
updateUI();