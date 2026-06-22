import { isValidTitle } from "./Helper.js";

export const PRIORITY = {NONE:"none", LOW: "low", MEDIUM: "medium", HIGH: "high"}
export function createTodo(title = "Untitled",savedData = {}) {
    const id = savedData.id || crypto.randomUUID();
    let trimmedtitle = savedData.title || (isValidTitle(title) ? title.trim() : "Untitled");
    let date = savedData.date || new Date();
    let priority = savedData.priority || PRIORITY.NONE;
    let note = savedData.note || "";
    let completed = savedData.completed || false;    
    
    return {    
        //getter functions
        getId() {
            return id;
        },
        getTitle() {
            return trimmedtitle;
        },
        getDate() {
            return date;
        },
        getPriority() {
            return priority;
        },
        getNote() {
            return note;
        },
        getCompleted() {
            return completed;
        },
        //setter functions
        setTitle(newTitle) {
            if (isValidTitle(newTitle)) {
                trimmedtitle = newTitle.trim(); 
            }
        },
        setDate(newDate) {
            date = newDate;
        },
        setPriority(newPriority) {
            priority = newPriority;
        },
        setNote(newNote) {
            note = newNote;
        },
        toggleCompleted() { 
            completed = !completed;
        }, 
        toJSON() {
            return {
                id,
                title: trimmedtitle,
                date,
                priority,
                note,
                completed
            }
        }
    }
}  
    
    
    
 


    

