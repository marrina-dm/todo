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
  public tasks: Observable<TaskType[]> | null = null;
  public filterTasksControl = new FormControl('all');
  public taskValue: string = '';
  public countLeft: number = 0;
  public allCompleted: boolean = false;
  public someCompleted: boolean = false;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  addTask(): void {
    if (this.taskValue) {
      this.taskService.addTask(this.taskValue);

      this.taskValue = '';
      this.countLeft++;
      this.filterTasks();
    }
  }

  removeTask(task: TaskType): void {
    this.taskService.removeTask(task);
  }

  toggleAllTasks(): void {
    this.allCompleted = this.taskService.toggleAllTasks();
    this.countLeftTasks();
  }

  clearCompleted(): void {
    this.taskService.clearCompleted();
    this.filterTasks();
    this.someCompleted = false;
  }

  countLeftTasks(): void {
    this.countLeft = this.taskService.getCountLeftTasks();
    this.allCompleted = this.countLeft === 0;

    this.someCompleted = this.taskService.isSomeCompleted();
    this.filterTasks();
  }

  filterTasks(): void {
    if (this.filterTasksControl.value) {
      this.tasks = this.taskService.getTasks(this.filterTasksControl.value);
    }
  }
}
