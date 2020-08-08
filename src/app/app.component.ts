import { Component } from '@angular/core';
import {DataFetcherService} from "./data-fetcher.service";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  devices$: Observable<string[]>;

  constructor(private fetcher: DataFetcherService) {
    this.devices$ =
      this.fetcher.devicesChanged.pipe(
        map(names => {
          return names.sort((a, b) => {
            if (a === 'CC:74:2F:87:DC:17') {
              return -1;
            } else if (b === 'CC:74:2F:87:DC:17') {
              return 1;
            } else {
              return a.localeCompare(b);
            }
          })
        })
      );
  }


}
