import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxTaskComponent} from "./ngx-task.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
      NgxTaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
      NgxTaskComponent
  ]
})
export class NgxTaskModule { }
