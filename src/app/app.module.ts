import { QuestionComponent } from './questions/question.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdlModule } from '@angular-mdl/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './loginViews/loginView.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdlSelectModule } from '@angular-mdl/select';
import { MdlPopoverModule } from '@angular-mdl/popover';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MdlModule,
    MdlSelectModule,
    MdlPopoverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
