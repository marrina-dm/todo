import {
  AfterContentChecked,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {TaskType} from "../../../types/task.type";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit, AfterContentChecked {
  @Input() task?: TaskType;
  @ViewChild('inputElement') inputElement?: ElementRef;
  public displayInput: boolean = false;
  public title: string = '';

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    if (this.task) {
      this.title = this.task.title;
    }
  }

  ngAfterContentChecked(): void {
    if (this.displayInput) {
      this.inputElement?.nativeElement.focus();
    } else {
      this.inputElement?.nativeElement.blur();
    }
  }

  changeStateTask(): void {
    if (this.task) {
      this.taskService.updateTask(this.task.id, this.title, !this.task.complete);
    }
  }

  removeTask(): void {
    if (this.task) {
      this.taskService.removeTask(this.task);
    }
  }

  focusInput(): void {
    this.displayInput = true;
  }

  blurInput(): void {
    this.displayInput = false;
    if (this.task) {
      this.title = this.task.title;
    }
  }

  updateTask(): void {
    if (this.task) {
      this.taskService.updateTask(this.task.id, this.title, this.task.complete);
    }

    this.blurInput();
  }
}
