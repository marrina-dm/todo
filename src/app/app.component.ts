import {Component, OnInit} from '@angular/core';
import {TaskType} from "../types/task.type";
import {FormControl} from "@angular/forms";
import {TaskService} from "./services/task.service";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public tasks$?: BehaviorSubject<TaskType[]>;
  public filterTasksControl = new FormControl('all');
  public taskValue: string = '';
  public countLeft$?: BehaviorSubject<number>;
  public someCompleted$?: Observable<boolean>;
  public isDisplayActions$?: Observable<boolean>;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.tasks$ = this.taskService.tasks$;
    this.someCompleted$ = this.taskService.isSomeCompleted$;
    this.countLeft$ = this.taskService.countLeft$;
    this.isDisplayActions$ = combineLatest(this.tasks$, this.someCompleted$, this.countLeft$, (tasks, someCompleted, countLeft) => tasks.length > 0 || !!countLeft || someCompleted);
  }

  addTask(): void {
    if (this.taskValue) {
      this.taskService.addTask(this.taskValue);

      this.taskValue = '';
      this.countLeftTasks();
    }
  }

  toggleAllTasks(): void {
    this.taskService.toggleAllTasks();
    this.countLeftTasks();
  }

  clearCompleted(): void {
    this.taskService.clearCompleted();
    this.taskService.isSomeCompleted();
    this.filterTasks();
  }

  countLeftTasks(): void {
    this.taskService.getCountLeftTasks();
    this.taskService.isSomeCompleted();
    this.filterTasks();
  }

  filterTasks(): void {
    if (this.filterTasksControl.value) {
      this.tasks$ = this.taskService.getTasks(this.filterTasksControl.value);
    }
  }
}
