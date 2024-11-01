// Task constructor
export class Task {
    constructor(taskTitle, taskNotes, deadline, priority, location) {
        this.title = taskTitle;
        this.notes = taskNotes;
        this.deadline = deadline;
        this.priority = priority;
        this.projectName = location;
    }
}

// Project constructor
export class Project {
    constructor(projectName) {
        this.name = projectName;
        this.tasks = [];
    }
}