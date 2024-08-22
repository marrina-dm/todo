import {Injectable} from '@angular/core';
import {TaskType} from "../../types/task.type";
import {map, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Observable<TaskType[]> = of([]);

  constructor() {
  }

  addTask(title: string): void {
    this.tasks.pipe(tap(data => {
        data.push({
          title: title,
          complete: false
        });
        return data;
      }
    )).subscribe();
  }

  getTasks(filters: string = 'all'): Observable<TaskType[]> {
    let tasks = this.tasks;
    if (filters === 'active') {
      tasks = this.tasks.pipe(
        map(data => data.filter((item: TaskType) => !item.complete))
      );
    }

    if (filters === 'completed') {
      tasks = this.tasks.pipe(
        map(data => data.filter((item: TaskType) => item.complete))
      );
    }

    return tasks;
  }

  removeTask(task: TaskType): Observable<TaskType[]> {
    this.tasks = this.tasks.pipe(
      map(data => data.filter((item: TaskType) => item !== task))
    );

    this.tasks.pipe(
      tap(data => {
        if (data.length === 0) {
          this.tasks = of([]);
        }
      })
    ).subscribe();

    return this.tasks;
  }

  clearCompleted(): Observable<TaskType[]> {
    this.tasks = this.tasks.pipe(
      map(data => data.filter((item: TaskType) => !item.complete))
    );

    this.tasks.pipe(
      tap(data => {
        if (data.length === 0) {
          this.tasks = of([]);
        }
      })
    ).subscribe();

    return this.tasks;
  }

  toggleAllTasks(isAllCompleted: boolean = false): boolean {
    this.tasks.pipe(
      map(data => {
        if (!isAllCompleted) {
          data.map(item => item.complete = true);
        } else {
          data.map(item => item.complete = false);
        }

        return data;
      })
    ).subscribe();

    return !isAllCompleted;
  }

  getCountLeftTasks(): Observable<number> {
    return this.tasks.pipe(
      map(data => data.filter((item: TaskType) => !item.complete).length));
  }

  isSomeCompleted(): Observable<boolean> {
    return this.tasks.pipe(
      map(data => data.some((item: TaskType) => item.complete))
    );
  }
}
