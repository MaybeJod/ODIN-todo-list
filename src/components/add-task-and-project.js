import { sampleContent } from "./stored-data";

//task array
export let tasksArray = [];
//project array
export let projectsArray = [];

//task constructor
class Task {
    constructor(taskTitle, taskNotes, deadline, priority, location) {
        this.title = taskTitle;
        this.notes = taskNotes;
        this.deadline = deadline;
        this.priority = priority;
        this.location = location;
    }
}

//project constructor
class Project {
    constructor(projectName) {
        this.name = projectName;
        this.tasks = [];
    }
}

//add task
export function addTask(taskTitle, taskNotes, deadline, priority, location) {
    let task = new Task(taskTitle, taskNotes, deadline, priority, location); 

    if(location === "Tasks") {
        tasksArray.push(task);
        saveTasksToLocalStorage(tasksArray);
        } else {
            let projectLocation = projectsArray.find(project => project.name === location);
            if(projectLocation) {
                projectLocation.tasks.push(task);
                saveProjectsToLocalStorage(projectsArray);
            }
        }  
}

//add project
export function addProject(projectName) {
    let project = new Project(projectName);        
    projectsArray.push(project);
    saveProjectsToLocalStorage(projectsArray);
}
    
//save tasks array to local storage    
export function saveTasksToLocalStorage(tasksArray) {
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

//save projects array to local storage
export function saveProjectsToLocalStorage(projectsArray) {
    localStorage.setItem("projects", JSON.stringify(projectsArray));
}

sampleContent();