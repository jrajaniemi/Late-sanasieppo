import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  MdButtonModule,
          MdToolbarModule,
          MdCheckboxModule,
          MdMenuModule,
          MdIconModule,
          MdInputModule,
          MdCardModule,
          MdSelectModule
      } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import 'hammerjs';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MdMenuModule,
    MdButtonModule,
    MdIconModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdInputModule,
    FormsModule,
    MdSelectModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
