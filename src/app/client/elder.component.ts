import {Component, Input, OnInit} from '@angular/core';
import {DataFetcherService, Statistics} from "../data-fetcher.service";

@Component({
  selector: 'app-elder',
  templateUrl: './elder.component.html',
  styleUrls: ['./elder.component.css']
})
export class ElderComponent implements OnInit {
  @Input() deviceMac: string;

  mac: string;
  battery: number;
  bpm: number;
  timestamp: number;
  statistics: Statistics;

  constructor(private fetcher: DataFetcherService) {}

  ngOnInit(): void {
    this.fetcher.listenOnDevice(this.deviceMac).subscribe(value => {
      this.mac = value.mac;
      this.battery = value.battery;
      this.bpm = value.bpm;
      this.timestamp = value.timestamp;
      this.statistics = value.statistics;
    })
  }

}
