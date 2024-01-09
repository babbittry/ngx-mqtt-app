import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    IMqttMessage,
    IMqttServiceOptions,
    MqttService,
} from 'ngx-mqtt';
import { IClientSubscribeOptions } from 'mqtt-browser';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import {MyMqttService} from "../../my-mqtt.service";
import {ReceiveDataFormat} from "../../receive-data-format";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
    constructor(private message: NzMessageService, public myMqttService: MyMqttService) {

    }

    connection = {
        hostname: '10.48.102.35',
        port: 8083,
        path: '/mqtt',
        clean: true, // 保留会话
        connectTimeout: 4000, // 超时时间
        reconnectPeriod: 4000, // 重连时间间隔
        clientId: 'mqttx_59c70a46f4',    // 认证信息
        username: '',
        password: '',
        protocol: 'ws',
    }

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
            this.myMqttService.client?.connect(this.connection as IMqttServiceOptions)
        } catch (error) {
            console.log('mqtt.connect error', error);
        }
        this.myMqttService.client?.onConnect.subscribe(() => {
            this.myMqttService.isConnection = true
            console.log('Connection succeed!');
        });
        this.myMqttService.client?.onError.subscribe((error: any) => {
            this.myMqttService.isConnection = false
            console.log('Connection failed', error);
            this.message.error("连接失败！");
        });
        this.myMqttService.client?.onMessage.subscribe((packet: any) => {
        })
    }

    // 断开连接
    destroyConnection() {
        try {
            this.myMqttService.client?.disconnect(true)
            this.myMqttService.isConnection = false
            console.log('Successfully disconnected!')
            this.message.success("断开成功！");
        } catch (error: any) {
            console.log('Disconnect failed', error.toString())
        }
    }

}

