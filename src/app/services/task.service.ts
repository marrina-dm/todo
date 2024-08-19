import {Injectable} from '@angular/core';
import {TaskType} from "../../types/task.type";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    public tasks$: Subject<TaskType[]> = new Subject();
    private tasks: TaskType[] = [];

    constructor() {
    }

    addTask(title: string): void {
        this.tasks.push({
            title: title,
            complete: false
        });
        this.tasks$.next(this.tasks);
    }

    getTasks(filter: string = 'all'): TaskType[] {
        if (filter === 'active') {
            return this.tasks.filter((item: TaskType) => !item.complete);
        }

        if (filter === 'completed') {
            return this.tasks.filter((item: TaskType) => item.complete);
        }

        return this.tasks;
    }

    removeTask(task: TaskType): void {
        this.tasks = this.tasks.filter((item: TaskType) => item !== task);
        this.tasks$.next(this.tasks);
    }

    clearCompleted(filterValue: string): void {
        this.tasks = this.tasks.filter((item: TaskType) => !item.complete);
        this.tasks$.next(this.getTasks(filterValue));
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
}
