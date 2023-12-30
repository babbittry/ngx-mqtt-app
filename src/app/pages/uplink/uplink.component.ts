import { Component } from '@angular/core';
import {IClientSubscribeOptions} from "mqtt";
import {IMqttMessage} from "ngx-mqtt";
import {Subscription} from "rxjs";
import {MyMqttService} from "../../my-mqtt.service";
import * as timers from "timers";

@Component({
  selector: 'app-uplink',
  templateUrl: './uplink.component.html',
  styleUrls: ['./uplink.component.css']
})


export class UplinkComponent {
    constructor(public myMqttService: MyMqttService) {
    }
    private curSubscription: Subscription | undefined;
    subscribeSuccess:boolean = false;
    subscription:{topic:string, qos:number} = {
        topic: '/milesight/uplink',
        qos: 0,
    };

    public receiveDataList: receiveDataFormat[] = [{
        deviceName: '',
        deviceEUI:'',
        data: '',
        RSSI: 0,
        SNR: 0,
        frequency: 0,
        time: '',
    }];
    // 订阅主题

    doSubscribe() {
        const { topic, qos } = this.subscription;
        console.log('do subscribe', this.subscription)
        try {
            this.curSubscription = this.myMqttService.client?.observe(topic, { qos } as IClientSubscribeOptions).subscribe((message: IMqttMessage) => {
                console.log('Subscribe to topics res', message.payload.toString())
                console.log(typeof(message));
                console.log(message);
                console.log(typeof(message.payload));
            })
            this.subscribeSuccess = true
            console.log('Subscribe succeeded!');
        } catch {
            console.log('Subscribe failed!');
        }
    }
    // 取消订阅
    doUnSubscribe():void {
        this.curSubscription?.unsubscribe();
        this.subscribeSuccess = false;
        console.log('Unsubscribe succeeded!');
    }

}

interface receiveDataFormat {
    readonly deviceName: string
    readonly deviceEUI: string;
    readonly data: string;
    readonly RSSI: number;
    readonly SNR: number;
    readonly frequency: number;
    readonly time: string;
}

