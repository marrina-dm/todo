import {
  AfterContentChecked, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {TaskType} from "../../../types/task.type";

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit, AfterContentChecked {
  @Input() task?: TaskType;
  @ViewChild('inputElement') inputElement?: ElementRef;
  @Output() remove = new EventEmitter<TaskType>();
  @Output() onChangeState = new EventEmitter<void>();
  public displayInput: boolean = false;
  public title: string = '';

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
      this.task.complete = !this.task.complete;
      this.onChangeState.emit();
    }
  }

  removeTask(): void {
    this.remove.emit(this.task);
    this.onChangeState.emit();
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
    if (!this.title) {
      this.removeTask();
    } else if (this.task) {
      this.task.title = this.title;
    }

    this.blurInput();
  }
}
