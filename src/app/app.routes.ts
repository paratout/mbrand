import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { InsightsManagerComponent } from './components/insights-manager/insights-manager.component';
import { MediaManagerComponent } from './components/media-manager/media-manager.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [adminGuard],
        children: [
            { path: '', redirectTo: 'insights', pathMatch: 'full' },
            { path: 'insights', component: InsightsManagerComponent },
            { path: 'media', component: MediaManagerComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];
