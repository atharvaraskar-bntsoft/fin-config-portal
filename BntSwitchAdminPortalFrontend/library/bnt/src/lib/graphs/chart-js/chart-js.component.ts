import { Component, AfterContentInit, ElementRef, Input } from '@angular/core';
import moment from 'moment';
import { presets } from './chart-js.presets';
import { CookieService } from 'ngx-cookie-service';

declare var Chart: any;

@Component({
  selector: 'rv-chart-js',
  styles: [],
  template: `
    <div>
      <canvas></canvas>
    </div>
  `,
})
export class ChartJsComponent implements AfterContentInit {
  @Input() public data: any;
  public type: string;
  @Input() width: string;
  @Input() position: string;
  @Input() height: string;

  constructor(private el: ElementRef, private _cookieService: CookieService) { }

  ngAfterContentInit() {
    import('chart.js').then((chartJs: any) => {
      this.render();
    });
  }

  render() {
    const ctx = this.getCtx();
    const data = this.data;
    ctx.canvas.height = this.height;
    ctx.canvas.width = this.width;
    if (data) {
      data.content.type = data.content.type === 'donut' ? 'doughnut' : data.content.type;
      this.type = data.content.type;
      const output = this._dataTransform(data);
      if (output) {
        if (this.position) {
          presets[this.type].options.legend.position = this.position;
        }
        const chart = new Chart(ctx, {
          data: output,
          options: presets[this.type] ? presets[this.type].options : {},
          type: this.type,
        });
        chart.update();
      }
    }
  }

  private _dataTransform(data) {
    let chartdata;
    switch (data.content.type) {
      case 'line':
        chartdata = this._lineChart(data);
        break;
      case 'doughnut':
        chartdata = this._donutChart(data);
        break;
    }
    return chartdata;
  }

  private _donutChart(data) {
    const output = {
      datasets: [
        {
          backgroundColor: [
            'rgb(0,128,0)',
            'rgb(255,0,0)',
            'rgba(151,187,205,1)',
            'rgb(75, 192, 192)',
            'rgb(229, 204, 255)',
            'rgb(153, 102, 255)',
            'rgb(231,233,237)',
            'rgb(160,160,160)',
            'rgb(138,43,226)',
            'rgb(32,178,170)',
          ],
          borderColor: '#fff',
          data: [],
          hoverBackgroundColor: [
            'rgb(0,128,0)',
            'rgb(255,0,0)',
            'rgba(151,187,205,0.8)',
            'rgb(75, 192, 192)',
            'rgb(229, 204, 255)',
            'rgb(153, 102, 255)',
            'rgb(231,233,237)',
            'rgb(160,160,160)',
            'rgb(138,43,226)',
            'rgb(32,178,170)',
          ],
        },
      ],
      labels: [],
    };
    data.content.coordinates.forEach(item => {
      // output.labels.push(item.text + ': ' + item.value);
      output.labels.push(item.text);
      output.datasets[0].data.push(item.value);
    });
    return output;
  }

  convert(timestamp: string | number | Date) {
    const ctimezone = JSON.parse(this._cookieService.get('timezone'));
    let uTCDatetime = moment.tz(timestamp, ctimezone.name).format('MMM DD, YYYY, HH:mm:ss');
    return uTCDatetime;
  }

  private _lineChart(data) {
    const chartColors = [
      'rgb(30,144,255)',
      'rgb(0,128,0)',
      'rgb(255,0,0)',
      'rgb(75, 192, 192)',
      'rgb(229, 204, 255)',
      'rgb(153, 102, 255)',
      'rgb(231,233,237)',
      'rgb(123,104,238)',
      'rgb(138,43,226)',
      'rgb(32,178,170)',
    ];

    const output = {
      datasets: [] as any,
      labels: [] as any,
    };
    data.content.coordinates.forEach((item, index) => {
      output.labels = item.xcoordinats;
      output.labels = output.labels.map((item: string | number | Date) => {
        return this.convert(item);
      });
      const result = {
        backgroundColor: chartColors[index],
        borderColor: chartColors[index],
        data: '',
        fill: false,
        label: '',
        lineTension: 0,
      };
      result.label = item.text;
      result.data = item.ycoordinats;
      output.datasets.push(result);
    });
    return output;
  }

  private getCtx() {
    return this.el.nativeElement.querySelector('canvas').getContext('2d');
  }
}
