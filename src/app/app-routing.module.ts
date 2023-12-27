import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DownlinkComponent } from './pages/downlink/downlink.component';
import { UplinkComponent } from './pages/uplink/uplink.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, title: 'dashboard' },
    { path: 'downlink', component: DownlinkComponent, title: 'downlink' },
    { path: 'uplink', component: UplinkComponent, title: 'uplink' },
    { path: 'settings', component: SettingsComponent, title: 'settings' },
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
