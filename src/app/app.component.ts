import {Component, OnInit} from '@angular/core';
import {TaskType} from "../types/task.type";
import {FormControl} from "@angular/forms";
import {TaskService} from "./services/task.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public tasks$?: BehaviorSubject<TaskType[]>;
  public filterTasksControl = new FormControl('all');
  public taskValue: string = '';
  public countLeft: number = 0;
  public allCompleted: boolean = false;
  public someCompleted: boolean = false;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.tasks$ = this.taskService.tasks$;
  }

  addTask(): void {
    if (this.taskValue) {
      this.taskService.addTask(this.taskValue);

      this.taskValue = '';
      this.countLeft++;
    }
  }

  toggleAllTasks(): void {
    this.allCompleted = this.taskService.toggleAllTasks();
    this.countLeftTasks();
  }

  clearCompleted(): void {
    this.taskService.clearCompleted();
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
      this.tasks$ = this.taskService.getTasks(this.filterTasksControl.value);
    }
  }
}
