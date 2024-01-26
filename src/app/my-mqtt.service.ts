import { Injectable } from '@angular/core';
import {
    IMqttMessage,
    IMqttServiceOptions,
    MqttService,
    IPublishOptions,
} from 'ngx-mqtt';
import {Subscription} from "rxjs";
import {ReceiveDataFormat} from "./receive-data-format";
import {ChartConfiguration} from "chart.js";

@Injectable({
  providedIn: 'root'
})
export class MyMqttService {
    client: MqttService | undefined;
    isConnection:boolean = false;
    subscribeSuccess: boolean = false;
    curSubscription: Subscription | undefined;
    receiveDataList: ReceiveDataFormat[] = [];
    UplinkCount: number = 0;
    DownlinkCount: number = 0;

    DownlinkDeviceList = [
        {ID: 1, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: true, relayState: false},
        {ID: 2, EUIStr: '00-80-E1-15-00-44-70-95', EUI: '0080E11500447095', joinState: true, relayState: false},
        {ID: 3, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: false, relayState: false},
        {ID: 4, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: false, relayState: false},
        {ID: 5, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: false, relayState: false},
    ];
    lineChartData: ChartConfiguration<'line'>['data'] = {
        labels: [

        ],
        datasets: [
            {
                data: [  ],
                label: '探头温度',
                fill: true,
                tension: 0.5,
                borderColor: 'red',
                backgroundColor: 'rgba(255,0,0,0.3)'
            },
            {
                data: [  ],
                label: '设定温度',
                fill: true,
                tension: 0.5,
                borderColor: 'green',
                backgroundColor: 'rgba(0,255,0,0.3)'
            },
        ]
    };
  constructor(private _mqttService: MqttService) {
      this.client = this._mqttService;
  }
}


