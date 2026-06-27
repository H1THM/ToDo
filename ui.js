// This file handles updating the DOM (User Interface)

export function renderProjects(projects, activeIndex) {
    const list = document.getElementById("project-list");
    list.innerHTML = ""; // clear old list

    projects.forEach((project, index) => {
        const li = document.createElement("li");
        li.textContent = project.getTitle();
        li.style.fontWeight = index === activeIndex ? "bold" : "normal";
        li.style.cursor = "pointer";
        
        // Add a data attribute so we know which project was clicked
        li.dataset.index = index;
        
        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.className = "delete-project-btn";
        deleteBtn.style.marginLeft = "10px";
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}

export function renderTodos(project) {
    const list = document.getElementById("todo-list");
    const title = document.getElementById("active-project-title");
    const todoContainer = document.getElementById("create-todo-container");

    list.innerHTML = ""; // clear old list

    if (!project) {
        title.textContent = "Select a Project";
        todoContainer.style.display = "none";
        return;
    }

    title.textContent = project.getTitle();
    todoContainer.style.display = "block"; // show the form to add todos

    project.gettodos().forEach((todo, index) => {
        const li = document.createElement("li");
        li.style.textDecoration = todo.getCompleted() ? "line-through" : "none";
        
        // Checkbox for completion
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.getCompleted();
        checkbox.className = "toggle-todo-btn";
        checkbox.dataset.index = index;
        
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(" " + todo.getTitle()));

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-todo-btn";
        deleteBtn.dataset.index = index;
        deleteBtn.style.marginLeft = "10px";
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}
