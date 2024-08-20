import {Injectable} from '@angular/core';
import {TaskType} from "../../types/task.type";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: TaskType[] = [];

    constructor() {
    }

    addTask(title: string): void {
        this.tasks.push({
            title: title,
            complete: false
        });
    }

    getTasks(filter: string = 'all'): Observable<TaskType[]> {
        let tasks = this.tasks;
        if (filter === 'active') {
            tasks = this.tasks.filter((item: TaskType) => !item.complete);
        }

        if (filter === 'completed') {
            tasks = this.tasks.filter((item: TaskType) => item.complete);
        }

        return new Observable<TaskType[]>(observer => {observer.next(tasks)});
    }

    removeTask(task: TaskType): void {
        this.tasks = this.tasks.filter((item: TaskType) => item !== task);
    }

    clearCompleted(): void {
        this.tasks = this.tasks.filter((item: TaskType) => !item.complete);
    }

    toggleAllTasks(): boolean {
        if (this.tasks.some((item: TaskType) => !item.complete)) {
            this.tasks.map(item => item.complete = true);
            return true;
        } else {
            this.tasks.map(item => item.complete = false);
            return  false;
        }
    }

    getCountLeftTasks(): number {
        return this.tasks.filter((item: TaskType) => !item.complete).length;
    }

    isSomeCompleted(): boolean {
        return this.tasks.some((item: TaskType) => item.complete);
    }
}
