import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {TaskType} from "./types/task.type";
import {NgxTaskService} from "./ngx-task.service";

@Component({
  selector: 'ngx-task',
  templateUrl: './ngx-task.component.html',
  styleUrl: './ngx-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxTaskComponent implements OnInit, AfterContentChecked {
  @Input() task?: TaskType;
  @ViewChild('inputElement') inputElement?: ElementRef;
  public isDisplayInput: boolean = false;
  public isCompleted: boolean = false;
  public title: string = '';

  constructor(private taskService: NgxTaskService) {
  }

  ngOnInit(): void {
    if (this.task) {
      this.title = this.task.title;
      this.isCompleted = this.task.complete;
    }
  }

  ngAfterContentChecked(): void {
    if (this.isDisplayInput) {
      this.inputElement?.nativeElement.focus();
    } else {
      this.inputElement?.nativeElement.blur();
    }
  }

  updateTask(): void {
    if (this.task) {
      this.taskService.updateTask({
        ...this.task,
        title: this.title,
        complete: this.isCompleted
      });
    }
  }

  removeTask(): void {
    if (this.task) {
      this.taskService.removeTask(this.task);
    }
  }

  focusInput(): void {
    this.isDisplayInput = true;
  }

  blurInput(): void {
    this.isDisplayInput = false;
    if (this.task) {
      this.title = this.task.title;
    }
  }
}
