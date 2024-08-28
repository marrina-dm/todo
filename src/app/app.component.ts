import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TaskType} from "../types/task.type";
import {FormControl} from "@angular/forms";
import {TaskService} from "./services/task.service";
import {combineLatest, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public tasks$?: Observable<TaskType[]>;
  public filterTasksControl = new FormControl('all');
  public taskValue: string = '';
  public countLeft$?: Observable<number>;
  public someCompleted$?: Observable<boolean>;
  public isDisplayActions$?: Observable<boolean>;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.tasks$;
    this.someCompleted$ = this.taskService.isSomeCompleted$;
    this.countLeft$ = this.taskService.countLeftTasks$;
    this.isDisplayActions$ = combineLatest(this.tasks$, this.someCompleted$, this.countLeft$,
      (tasks, someCompleted, countLeft) => tasks.length > 0 || !!countLeft || someCompleted);
  }

  addTask(): void {
    if (this.taskValue) {
      this.taskService.addTask(this.taskValue);
      this.taskValue = '';
    }
  }

  toggleAllTasks(): void {
    this.taskService.toggleAllTasks();
  }

  clearCompleted(): void {
    this.taskService.clearCompleted();
  }

  filterTasks(): void {
    if (this.filterTasksControl.value) {
      this.tasks$ = this.filterTasksControl.value === 'all' ? this.taskService.tasks$ :
        (this.filterTasksControl.value === 'active' ? this.taskService.activeTasks$ : this.taskService.completedTasks$);
    }
  }
}
