import {Injectable} from '@angular/core';
import {TaskType} from "../../types/task.type";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public tasks$: BehaviorSubject<TaskType[]> = new BehaviorSubject<TaskType[]>([]);
  public getCountLeftTasks$: Observable<number> = this.tasks$.pipe(map((tasks: TaskType[]) => tasks.filter((item: TaskType) => !item.complete).length));
  public isSomeCompleted$: Observable<boolean> = this.tasks$.pipe(map((tasks: TaskType[]) => tasks.some((item: TaskType) => item.complete)));
  public getActiveTasks$: Observable<TaskType[]> = this.tasks$.pipe(map((tasks: TaskType[]) => tasks.filter((item: TaskType) => !item.complete)));
  public getCompletedTasks$: Observable<TaskType[]> = this.tasks$.pipe(map((tasks: TaskType[]) => tasks.filter((item: TaskType) => item.complete)));

  addTask(title: string): void {
    const oldTasks: TaskType[] = this.tasks$.getValue();
    const newTask: TaskType = {
      id: Date.now(),
      title: title,
      complete: false
    };
    this.tasks$.next([...oldTasks, newTask]);
  }

  updateTask(id: number, title: string, complete: boolean): void {
    const oldTasks: TaskType[] = this.tasks$.getValue();
    const task: TaskType | undefined = oldTasks.find((item: TaskType) => item.id === id);
    if (task) {
      if (!title) {
        this.removeTask(task);
      } else {
        task.title = title;
        task.complete = complete;

        this.tasks$.next(oldTasks);
      }
    }
  }

  removeTask(task: TaskType): void {
    const oldTasks: TaskType[] = this.tasks$.getValue();
    const oldTasksIndex: number = oldTasks.findIndex((item: TaskType) => item.id === task.id);
    oldTasks.splice(oldTasksIndex, 1);
    this.tasks$.next(oldTasks);
  }

  clearCompleted(): void {
    this.tasks$.next(this.tasks$.getValue().filter((item: TaskType) => !item.complete));
  }

  toggleAllTasks(): void {
    const oldTasks: TaskType[] = this.tasks$.getValue();
    const someCompleted = oldTasks.some((item: TaskType) => !item.complete);
    oldTasks.map(item => item.complete = someCompleted);
    this.tasks$.next(oldTasks);
  }
}
