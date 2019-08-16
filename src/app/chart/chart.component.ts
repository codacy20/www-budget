import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Expense } from '../Models/expense.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

  // tslint:disable-next-line: variable-name
  private _masterArray: Expense[];

  get masterArray() {
    return this._masterArray;
  }
  @Input()
  set masterArray(val: any) {
    this._masterArray = val;
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right'
    },
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true,
        display: true,
        ticks: {
          beginAtZero: true,
        }
      }],
    },
  };

  public chartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  constructor() { }

  ngOnInit() {
    this.dataSetter();
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.masterArray;
    if (currentItem.currentValue) {
      const currentValue: Expense[] = currentItem.currentValue;
      this._masterArray = currentValue;
    }
    this.dataSetter();
  }


  dataSetter() {
    // tslint:disable-next-line: prefer-const
    let data = [];
    this.barChartData = [];
    this.masterArray.forEach((el: Expense) => {
      const date = new Date(el.date.toString());
      const obj = {
        data: [el.price],
        data2: el.name,
        label: el.name,
        row: date.getMonth()
      };
      data.push(obj);
    });

    data.forEach((element) => {
      for (let index = 0; index < element.row; index++) {
        element.data.splice(0, 0, 0);
      }
    });
    this.barChartData = data;
  }
}
