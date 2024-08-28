import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxTaskModule} from "ngx-task";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    NgxTaskModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
