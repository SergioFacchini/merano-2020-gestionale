import { Component } from '@angular/core';
import {DataFetcherService} from "./data-fetcher.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  devices$: Subject<string[]>;

  constructor(private fetcher: DataFetcherService) {
    this.devices$ = this.fetcher.devicesChanged;
  }


}
