import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'ngx-chartjs-line',
  template: `
    <chart type="line" [data]="lineData" [options]="lineOptions" *ngIf="data"></chart>
  `,
})
export class ChartjsLineComponent implements OnInit, OnDestroy {
  @Input() data: any;

  lineData;
  lineOptions;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const chartjs: any = config.variables.chartjs;

      this.lineOptions = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
              scaleLabel: function (value) {
                return '  ' + value;
              },
              scaleStepWidth: 10,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        layout: {
          padding: {
            left: 10,
          },
        },
      };
    });
  }
  ngOnInit() {
    this.lineData = this.data;
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
