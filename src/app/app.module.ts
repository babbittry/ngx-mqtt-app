import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
/* components */
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DownlinkComponent } from './pages/downlink/downlink.component';
import { UplinkComponent } from './pages/uplink/uplink.component';
import { SettingsComponent } from './pages/settings/settings.component';
/* ngx-mqtt */
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzCardModule } from 'ng-zorro-antd/card';
import {NzBackTopModule} from "ng-zorro-antd/back-top";
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NgChartsModule } from 'ng2-charts';
/* service */
import { MyMqttService } from  './my-mqtt.service';




const antDesignIcons = AllIcons as {
    [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

export const connection: IMqttServiceOptions = {
    hostname: 'broker.emqx.io',
    port: 8083,
    path: '/mqtt',
    clean: true, // 保留会话
    connectTimeout: 4000, // 超时时间
    reconnectPeriod: 4000, // 重连时间间隔
    // 认证信息
    clientId: 'mqttx_597046f4',
    username: 'emqx_test',
    password: 'emqx_test',
    protocol: 'ws',
    connectOnCreate: false,
}

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        DownlinkComponent,
        UplinkComponent,
        SettingsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule,
        NzIconModule,
        NzIconModule.forRoot(icons),
        MqttModule.forRoot(connection),
        NzFormModule,
        NzButtonModule,
        NzInputModule,
        NzGridModule,
        NzMessageModule,
        NzTableModule,
        NzSwitchModule,
        NzSelectModule,
        NzStatisticModule,
        NzCardModule,
        NzBackTopModule,
        NgChartsModule,
    ],
    providers: [
        { provide: NZ_I18N, useValue: zh_CN },
        MyMqttService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
