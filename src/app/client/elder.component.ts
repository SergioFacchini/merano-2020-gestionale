import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {DataFetcherService, Statistics} from "../data-fetcher.service";
import {Color, Label} from "ng2-charts";
import {ChartDataSets, ChartOptions, ChartPoint} from "chart.js";

@Component({
  selector: 'app-elder',
  templateUrl: './elder.component.html',
  styleUrls: ['./elder.component.css']
})
export class ElderComponent implements AfterContentInit {
  @Input() deviceMac: string;

  mac: string;
  battery: number;
  bpm: number;
  timestamp: number;
  statistics: Statistics;


  public lineChartData: ChartDataSets[] = [
    {data: [], showLine: true},
  ];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{id: 'x-axis-0', display: false}],
      yAxes: [{id: 'y-axis-0',},]
    },
    annotation: {annotations: [],},
    legend: {display: false},
    tooltips: {
      callbacks: {
        label: function(tooltipItem) {
          return tooltipItem.yLabel;
        }
      } as any
    }
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(245,75,75,0.74)',
      borderColor: 'rgb(220,59,59)',
      pointBackgroundColor: 'rgba(245,75,75,0)',
      pointBorderColor: 'rgba(245,75,75,0)',
      pointHoverBackgroundColor: '#ff0000',
      pointHoverBorderColor: 'rgb(175,11,11)'
    }
  ];
  public lineChartType = 'scatter';


  constructor(private fetcher: DataFetcherService) {}

  ngAfterContentInit(): void {
    this.fetcher.listenOnDevice(this.deviceMac).subscribe(value => {
      this.mac = value.mac;
      this.battery = value.battery;
      this.bpm = value.bpm;
      this.timestamp = value.timestamp;
      this.statistics = value.statistics;

      this.lineChartData[0].data.push({x: value.timestamp, y: value.bpm} as any)
    })
  }

}
