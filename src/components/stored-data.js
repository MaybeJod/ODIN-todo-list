import { addTask, addProject } from "./add-task-and-project";

const savedTasks = localStorage.getItem("tasks");

const parsedTasks = JSON.parse(savedTasks);

export function sampleContent() {
    if((!parsedTasks) || (parsedTasks.length === 0)) {
        addProject("Tasks");
        addProject("Website");
        addProject("Japan Trip");

        addTask("Task 1", "Task 1 Notes", "2021-10-01", "High", "Japan Trip");

        addTask("Task 4", "Task 4 Notes", "2021-10-01", "High", "Japan Trip");

        addTask("Task 2", "Task 2 Notes", "2021-10-11", "High", "Website");



        return;
    }

    parsedTasks.forEach(task => {
        addTask(task.title, task.notes, task.deadline, task.priority, task.project);
    });
}