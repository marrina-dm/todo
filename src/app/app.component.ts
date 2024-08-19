import {Component, OnInit} from '@angular/core';
import {TaskType} from "../types/task.type";
import {FormControl} from "@angular/forms";
import {TaskService} from "./services/task.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public allTasks: TaskType[] = [];
  public tasks: TaskType[] = [];
  public filterTasksControl = new FormControl('all');
  public taskValue: string = '';
  public countLeft: number = 0;
  public allCompleted: boolean = false;
  public someCompleted: boolean = false;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.tasks$.subscribe((tasks: TaskType[]) => {
      this.tasks = tasks;
      this.allTasks = this.taskService.getTasks();
    });
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
    this.taskService.clearCompleted(this.filterTasksControl.value!);
    this.someCompleted = this.allTasks.some((item: TaskType) => item.complete);
  }

  countLeftTasks(): void {
    this.countLeft = this.allTasks.filter((item: TaskType) => !item.complete).length;
    if (this.countLeft === 0) {
      this.allCompleted = true;
    }

    this.someCompleted = this.allTasks.some((item: TaskType) => item.complete);
    this.filterTasks();
  }

  filterTasks(): void {
    this.tasks = this.taskService.getTasks(this.filterTasksControl.value!);
  }
}
