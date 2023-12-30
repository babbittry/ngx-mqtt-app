import { Component } from '@angular/core';
import {SettingsComponent} from "../settings/settings.component";

@Component({
  selector: 'app-downlink',
  templateUrl: './downlink.component.html',
  styleUrls: ['./downlink.component.css']
})
export class DownlinkComponent {
    public isConnected:boolean = (localStorage.getItem('isConnected') === 'true');
    deviceList = [
        {ID: 1, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: false, relayState: false},
        {ID: 2, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: true, relayState: false},
        {ID: 3, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: false, relayState: false},
        {ID: 4, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: false, relayState: false},
        {ID: 5, EUIStr: '00-80-E1-15-00-44-99-15', EUI: '0080E11500449915', joinState: false, relayState: false},
    ];

    changeState(ID:number) {
        console.log("第" + ID + "个设备被点击，当前状态为" + this.deviceList[ID - 1].relayState);
        console.log(SettingsComponent);
    }
}
