import { isValidTitle } from "./Helper.js";
import { createTodo } from "./todo.js";
export function createProject(title = "Untitled",savedData = {}) {
    const id = savedData.id || crypto.randomUUID();
    let trimmedtitle = savedData.title || (isValidTitle(title) ? title.trim() : "Untitled");
        let todos = (savedData.todos || []).map(todoData => createTodo(todoData.title,todoData));


    
    
    
    
    
    return {
        getId() {
            return id;
        },
        getTitle() {
            return trimmedtitle;
        },
        addTodo(todo){
            todos.push(todo);
        },
        removeTodo(todo){
            todos = todos.filter(arrtodo => arrtodo.getId() !== todo.getId())
        },
        gettodos() {
            return todos;
        },
        toJSON() {
            return {
                id,
                title: trimmedtitle,
                todos
            }
        }
    }
}