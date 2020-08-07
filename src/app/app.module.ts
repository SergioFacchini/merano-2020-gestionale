import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ElderComponent } from './client/elder.component';
import {DataFetcherService} from "./data-fetcher.service";

@NgModule({
  declarations: [
    AppComponent,
    ElderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{provide: DataFetcherService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
