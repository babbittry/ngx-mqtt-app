import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    IMqttMessage,
    IMqttServiceOptions,
    MqttService,
    IPublishOptions,
} from 'ngx-mqtt';
import { IClientSubscribeOptions } from 'mqtt-browser';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit{
    constructor(private _mqttService: MqttService, private message: NzMessageService) {
        this.client = this._mqttService;
    }
    deviceList = [
        {ID: 1, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: false, relayState: false},
        {ID: 2, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: true, relayState: false},
        {ID: 3, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: false, relayState: false},
        {ID: 4, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: false, relayState: false},
        {ID: 5, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: false, relayState: false},
    ];

    changeState(ID:number) {
        console.log("第" + ID + "个设备被点击，当前状态为" + this.deviceList[ID - 1].relayState);
    }
    private curSubscription: Subscription | undefined;
    connection = {
        hostname: '10.48.102.35',
        port: 8083,
        path: '/mqtt',
        clean: true, // 保留会话
        connectTimeout: 4000, // 超时时间
        reconnectPeriod: 4000, // 重连时间间隔
        // 认证信息
        clientId: 'mqttx_59c70a46f4',
        username: '',
        password: '',
        protocol: 'ws',
    }
    subscription:{topic:string, qos:number} = {
        topic: 'topic/mqtt',
        qos: 0,
    };
    publish = {
        topic: 'topic/browser',
        qos: 0,
        payload: '{ "msg": "Hello, I am browser." }',
    };
    receiveNews = '';
    qosList = [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
    ];
    client: MqttService | undefined;
    public isConnection:boolean = false;
    subscribeSuccess:boolean = false;

    // 创建连接
    createConnection() {
        // 连接字符串, 通过协议指定使用的连接方式
        // ws 未加密 WebSocket 连接
        // wss 加密 WebSocket 连接
        // mqtt 未加密 TCP 连接
        // mqtts 加密 TCP 连接
        // wxs 微信小程序连接
        // alis 支付宝小程序连接
        try {
            console.log(this.connection);
            this.client?.connect(this.connection as IMqttServiceOptions)
        } catch (error) {
            console.log('mqtt.connect error', error);
        }
        this.client?.onConnect.subscribe(() => {
            this.isConnection = true
            console.log('Connection succeed!');
        });
        this.client?.onError.subscribe((error: any) => {
            this.isConnection = false
            console.log('Connection failed', error);
            this.message.error("连接失败！");
        });
        this.client?.onMessage.subscribe((packet: any) => {
            this.receiveNews = this.receiveNews.concat(packet.payload.toString())
            console.log(`Received message ${packet.payload.toString()} from topic ${packet.topic}`)
        })
    }

    // 订阅主题
    doSubscribe() {
        const { topic, qos } = this.subscription;
        console.log('do subscribe', this.subscription)
        try {
            this.curSubscription = this.client?.observe(topic, { qos } as IClientSubscribeOptions).subscribe((message: IMqttMessage) => {
                // console.log('Subscribe to topics res', message.payload.toString())
            })
            this.subscribeSuccess = true
            console.log('Subscribe succeeded!');
        } catch {
            console.log('Subscribe failed!');
        }
    }
    // 取消订阅
    doUnSubscribe() {
        this.curSubscription?.unsubscribe()
        this.subscribeSuccess = false
    }
    // 发送消息
    doPublish() {
        const { topic, qos, payload } = this.publish
        console.log(this.publish)
        this.client?.unsafePublish(topic, payload, { qos } as IPublishOptions)
    }
    // 断开连接
    destroyConnection() {
        try {
            this.client?.disconnect(true)
            this.isConnection = false;
            console.log('Successfully disconnected!')
            this.message.success("断开成功！");
        } catch (error: any) {
            console.log('Disconnect failed', error.toString())
        }
    }

    ngOnInit() {
    }


}
