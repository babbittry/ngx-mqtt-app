import {Component, ViewChild} from '@angular/core';
import {IClientSubscribeOptions} from "mqtt";
import {IMqttMessage} from "ngx-mqtt";
import {Subscription} from "rxjs";
import {MyMqttService} from "../../my-mqtt.service";
import * as timers from "timers";
import {ReceiveDataFormat} from "../../receive-data-format";
import { Chart, ChartConfiguration, ChartOptions, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
    selector: 'app-uplink',
    templateUrl: './uplink.component.html',
    styleUrls: ['./uplink.component.css'],
})


export class UplinkComponent {
    constructor(public myMqttService: MyMqttService) {
    }

    qosList :{label: string, value: number}[] = [
        { label: 'QoS 0', value: 0 },
        { label: 'QoS 1', value: 1 },
        { label: 'QoS 2', value: 2 },
    ];

    subscription: { topic: string, qos: number } = {
        topic: '/milesight/uplink',
        qos: 0,
    };

    // 订阅主题

    doSubscribe() {
        const {topic, qos} = this.subscription;
        console.log('do subscribe', this.subscription)
        try {
            this.myMqttService.curSubscription = this.myMqttService.client?.observe(topic, {qos} as IClientSubscribeOptions).subscribe((message: IMqttMessage) => {
                console.log('Subscribe to topics res')
                const messageJsonObject = JSON.parse(message.payload.toString());
                console.log(messageJsonObject);
                const newReceiveDataObject: ReceiveDataFormat = {
                    deviceName: messageJsonObject.deviceName,
                    deviceEUI: messageJsonObject.devEUI,
                    data: base64ToHex(messageJsonObject.data),  // decode base64
                    RSSI: messageJsonObject.rxInfo[0].rssi,
                    SNR: messageJsonObject.rxInfo[0].loRaSNR,
                    frequency: messageJsonObject.txInfo.frequency,
                    time: getCurrentDateTime(),
                };
                console.log(newReceiveDataObject);
                this.myMqttService.receiveDataList.push(newReceiveDataObject);
                this.myMqttService.UplinkCount ++;
                if(newReceiveDataObject.data.slice(0, 2) === '63'){
                    this.myMqttService.lineChartData.labels?.push(newReceiveDataObject.time);
                    const chipTemp:number = parseInt('0x' + newReceiveDataObject.data.slice(4, 6), 16);
                    this.myMqttService.lineChartData.datasets[0].data.push(chipTemp);
                    console.log("芯片温度:", chipTemp);
                    this.deviceInfoChart?.update();
                }
                if(newReceiveDataObject.data.slice(0, 2) === '65'){
                    this.myMqttService.lineChartData.labels?.push(newReceiveDataObject.time);
                    const sensorTemp :number= parseInt('0x' + newReceiveDataObject.data.slice(4, 8), 16) / 10;
                    this.myMqttService.lineChartData.datasets[1].data.push(sensorTemp);
                    console.log("探头温度:", sensorTemp);
                    const settingTemp:number=parseInt('0x' + newReceiveDataObject.data.slice(8, 12), 16) /10;
                    this.myMqttService.lineChartData.datasets[2].data.push(settingTemp);
                    console.log("设定温度:", settingTemp);
                    this.deviceInfoChart?.update();
                }
            })
            this.myMqttService.subscribeSuccess = true
            console.log('Subscribe succeeded!');
        } catch {
            console.log('Subscribe failed!');
        }
    }

    // 取消订阅
    doUnSubscribe(): void {
        this.myMqttService.curSubscription?.unsubscribe();
        this.myMqttService.subscribeSuccess = false;
        console.log('Unsubscribe succeeded!');
    }

    public lineChartOptions: ChartOptions<'line'> = {
        responsive: false
    };
    public lineChartLegend = true;
    @ViewChild(BaseChartDirective) deviceInfoChart?: BaseChartDirective;
}

function base64ToHex(base64String: string): string {
    const binaryString:string = atob(base64String);
    let hexResult:string = '';
    for (let i:number = 0; i < binaryString.length; i++) {
        const hex = binaryString.charCodeAt(i).toString(16);
        hexResult += hex.length === 2 ? hex : '0' + hex;
    }
    return hexResult;
}

function getCurrentDateTime(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hour = currentDate.getHours().toString().padStart(2, '0');
    const minute = currentDate.getMinutes().toString().padStart(2, '0');
    const second = currentDate.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}



