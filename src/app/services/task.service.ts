import {Injectable} from '@angular/core';
import {TaskType} from "../../types/task.type";
import {BehaviorSubject, map, Observable} from "rxjs";

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
    this.tasks$.next([...oldTasks, newTask]);
  }

  getTasks(filters: string = 'all'): Observable<TaskType[]> {
    return this.tasks$.pipe(
      map(tasks => filters === 'all' ? tasks : tasks.filter((item: TaskType) => filters === 'active' ? !item.complete : item.complete))
    );
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

  getCountLeftTasks(): Observable<number> {
    return this.tasks$.pipe(
      map((tasks: TaskType[]) => tasks.filter((item: TaskType) => !item.complete).length)
    );
  }

  isSomeCompleted(): Observable<boolean> {
    return this.tasks$.pipe(
      map((tasks: TaskType[]) => tasks.some((item: TaskType) => item.complete))
    );
  }
}
