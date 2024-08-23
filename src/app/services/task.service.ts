import {Injectable} from '@angular/core';
import {TaskType} from "../../types/task.type";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public tasks$: BehaviorSubject<TaskType[]> = new BehaviorSubject<TaskType[]>([]);
  public countLeft$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public isSomeCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  addTask(title: string): void {
    const oldTasks: TaskType[] = this.tasks$.getValue();
    const newTask: TaskType = {
      id: Date.now(),
      title: title,
      complete: false
    };
    this.tasks$.next([...oldTasks, newTask]);
  }

  getTasks(filters: string = 'all'): BehaviorSubject<TaskType[]> {
    let tasks = this.tasks$.getValue();
    tasks = filters === 'all' ? tasks : tasks.filter((item: TaskType) => filters === 'active' ? !item.complete : item.complete);
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

  toggleAllTasks(): void {
    const oldTasks: TaskType[] = this.tasks$.getValue();
    const someCompleted = oldTasks.some((item: TaskType) => !item.complete);
    oldTasks.map(item => item.complete = someCompleted);
  }

  getCountLeftTasks(): void {
    this.countLeft$.next(this.tasks$.getValue().filter((item: TaskType) => !item.complete).length);
  }

  isSomeCompleted(): void {
    this.isSomeCompleted$.next(this.tasks$.getValue().some((item: TaskType) => item.complete));
  }
}
