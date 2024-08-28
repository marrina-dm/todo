import {Injectable} from '@angular/core';
import {TaskType} from "../../types/task.type";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public tasks$: BehaviorSubject<TaskType[]> = new BehaviorSubject<TaskType[]>([]);
  public countLeftTasks$: Observable<number> = this.tasks$.pipe(map((tasks: TaskType[]) => tasks.filter((item: TaskType) => !item.complete).length));
  public isSomeCompleted$: Observable<boolean> = this.tasks$.pipe(map((tasks: TaskType[]) => tasks.some((item: TaskType) => item.complete)));
  public activeTasks$: Observable<TaskType[]> = this.tasks$.pipe(map((tasks: TaskType[]) => tasks.filter((item: TaskType) => !item.complete)));
  public completedTasks$: Observable<TaskType[]> = this.tasks$.pipe(map((tasks: TaskType[]) => tasks.filter((item: TaskType) => item.complete)));

  addTask(title: string): void {
    this.tasks$.next([...this.tasks$.getValue(), {
      id: Date.now(),
      title: title,
      complete: false
    }]);
  }

  updateTask(task: TaskType): void {
    let oldTasks: TaskType[] = this.tasks$.getValue();
    const tasksIndex: number = oldTasks.findIndex((item: TaskType) => item.id === task.id);
    if (tasksIndex !== -1) {
      if (!task.title) {
        oldTasks.splice(tasksIndex, 1);
        this.tasks$.next(oldTasks);
      } else {
        this.tasks$.next(oldTasks.map(item => task.id === item.id ? task : item));
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
    this.tasks$.next(oldTasks.map(item => {
      return {...item, complete: someCompleted};
    }));
  }
}
