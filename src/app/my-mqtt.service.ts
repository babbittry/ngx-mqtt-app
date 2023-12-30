import { Injectable } from '@angular/core';
import {
    IMqttMessage,
    IMqttServiceOptions,
    MqttService,
    IPublishOptions,
} from 'ngx-mqtt';

@Injectable({
  providedIn: 'root'
})
export class MyMqttService {
    client: MqttService | undefined;
    isConnection:boolean = false;

  constructor(private _mqttService: MqttService) {
      this.client = this._mqttService;
  }
}
