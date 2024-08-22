import {Injectable} from '@angular/core';
import {TaskType} from "../../types/task.type";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public tasks$: BehaviorSubject<TaskType[]> = new BehaviorSubject<TaskType[]>([]);

  addTask(title: string): void {
    const oldTasks: TaskType[] = this.tasks$.getValue();
    const newTask: TaskType = {
      id: Date.now(),
      title: title,
      complete: false
    };
    console.log(this.tasks$);
    this.tasks$.next([...oldTasks, newTask]);
  }

  getTasks(filters: string = 'all'): BehaviorSubject<TaskType[]> {
    let tasks = this.tasks$.getValue();
    if (filters === 'active') {
      tasks = tasks.filter((item: TaskType) => !item.complete);
    }

    if (filters === 'completed') {
      tasks = tasks.filter((item: TaskType) => item.complete);
    }

    return new BehaviorSubject<TaskType[]>(tasks);
  }

  removeTask(task: TaskType): void {
    const oldTasks: TaskType[] = this.tasks$.getValue();
    const oldTasksIndex: number = oldTasks.findIndex((item: TaskType) => item.id === task.id);
    oldTasks.splice(oldTasksIndex, 1);
    this.tasks$.next(oldTasks);
  }

  clearCompleted(): void {
    const oldTasks: TaskType[] = this.tasks$.getValue();
    const newTasks: TaskType[] = oldTasks.filter((item: TaskType) => !item.complete);
    this.tasks$.next(newTasks);
  }

  toggleAllTasks(): boolean {
    const oldTasks: TaskType[] = this.tasks$.getValue();
    if (oldTasks.some((item: TaskType) => !item.complete)) {
      oldTasks.map(item => item.complete = true);
      return true;
    } else {
      oldTasks.map(item => item.complete = false);
      return false;
    }
  }

  getCountLeftTasks(): number {
    return this.tasks$.getValue().filter((item: TaskType) => !item.complete).length;
  }

  isSomeCompleted(): boolean {
    return this.tasks$.getValue().some((item: TaskType) => item.complete);
  }
}
