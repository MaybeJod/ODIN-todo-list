import { countAllTasks } from "./counter";

export function resetData() {
    localStorage.clear();
    location.reload();
    countAllTasks();
} 