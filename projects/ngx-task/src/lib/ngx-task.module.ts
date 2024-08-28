import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxTaskComponent} from "./ngx-task.component";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
      NgxTaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
      NgxTaskComponent
  ]
})
export class NgxTaskModule { }
