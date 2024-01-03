import { Component } from '@angular/core';
import {IPublishOptions} from "ngx-mqtt";
import {MyMqttService} from "../../my-mqtt.service";

@Component({
  selector: 'app-downlink',
  templateUrl: './downlink.component.html',
  styleUrls: ['./downlink.component.css']
})
export class DownlinkComponent {

    constructor(public myMqttService: MyMqttService) {
    }
    deviceList = [
        {ID: 1, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: true, relayState: false},
        {ID: 2, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: false, relayState: false},
        {ID: 3, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: false, relayState: false},
        {ID: 4, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: false, relayState: false},
        {ID: 5, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: false, relayState: false},
    ];

    publish = {
        topic: '/milesight/downlink/0080E11500449915',
        qos: 0,
        payload: '{"confirmed": true,"fport": 2,"data": "AgE="}',
    };

    changeState(ID:number) {
        console.log("第" + ID + "个设备被点击，当前状态为" + this.deviceList[ID - 1].relayState);
        this.publish.topic = "/milesight/downlink/" + this.deviceList[ID - 1].EUI;
        this.publish.payload = this.deviceList[ID - 1].relayState
                                ? '{"confirmed": true,"fport": 2,"data": "AgA="}'
                                : '{"confirmed": true,"fport": 2,"data": "AgE="}';
        this.doPublish();
    }
    // 发送消息
    doPublish() {
        const { topic, qos, payload } = this.publish
        console.log(this.publish)
        this.myMqttService.client?.unsafePublish(topic, payload, { qos } as IPublishOptions)
    }
}
