import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TempReading} from '../../shared/models/temp-reading';
import {RestModel} from '../../shared/models/rest-model';
import {BaseChartDirective} from 'ng2-charts';
import {DatePipe} from '@angular/common';
import {IMqttMessage, IOnConnectEvent, IOnMessageEvent, MqttService} from 'ngx-mqtt';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.sass']
})
export class GraphsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public message: string;


  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType = 'line';
  public barChartLegend = true;

  public barChartData: any[] = [{
    data: [], label: 'Temperatures'
  }];

  constructor( private http: HttpClient,
               public datepipe: DatePipe,
               private _mqttService: MqttService) { }

  ngOnInit() {
    this._mqttService.onConnect.subscribe((e: IOnConnectEvent) => {
      this.subscription = this._mqttService.observe('new-temp').subscribe((message: IOnMessageEvent) => {
        this.message = message.payload.toString();
        this.updateData();
      });
    });


    this.updateData();
  }

  updateData() {
    this.http.get<RestModel>('https://restapi2-ost.herokuapp.com/tempsensors')
      .subscribe(restData => {
        const data = [];
        const dataChartLabels = [];
        restData.rows.forEach(reading => {
          dataChartLabels.push(this.datepipe.transform(reading.createdAt, 'yy-MM-dd'));
          data.push(reading.value);
        });
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;

        const clone2 = JSON.parse(JSON.stringify(dataChartLabels));
        this.barChartLabels = clone2;

      });
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
