import {Component, OnInit} from '@angular/core';
import {TaskType} from "../types/task.type";
import {FormControl} from "@angular/forms";
import {TaskService} from "./services/task.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public tasks?: Observable<TaskType[]>;
  public filterTasksControl = new FormControl('all');
  public taskValue: string = '';
  public countLeft?: Observable<number>;
  public allCompleted: boolean = false;
  public someCompleted?: Observable<boolean>;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  addTask(): void {
    if (this.taskValue) {
      this.taskService.addTask(this.taskValue);

      this.taskValue = '';
      this.countLeftTasks();
    }
  }

  removeTask(task: TaskType): void {
    this.tasks = this.taskService.removeTask(task);
  }

  toggleAllTasks(): void {
    this.allCompleted = this.taskService.toggleAllTasks(this.allCompleted);
    this.countLeftTasks();
  }

  clearCompleted(): void {
    this.tasks = this.taskService.clearCompleted();
    this.someCompleted = this.taskService.isSomeCompleted();
    this.filterTasks();
  }

  countLeftTasks(): void {
    this.countLeft = this.taskService.getCountLeftTasks();

    this.someCompleted = this.taskService.isSomeCompleted();
    this.filterTasks();
  }

  filterTasks(): void {
    if (this.filterTasksControl.value) {
      this.tasks = this.taskService.getTasks(this.filterTasksControl.value);
    }
  }
}
