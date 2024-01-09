import { Component } from '@angular/core';
import {MyMqttService} from "../../my-mqtt.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    constructor(public myMqttService: MyMqttService) {
    }
    onlineDevice: number = this.myMqttService.isConnection ? 2 : 0;

}
