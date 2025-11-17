import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { authGuard } from './services/authGuard';
import { CreateService } from './pages/create-service/create-service';
import { AllServices } from './pages/all-services/all-services';
import { Scheduling } from './pages/scheduling/scheduling';
import { AboutUs } from './pages/about-us/about-us';
import { Reports } from './pages/reports/reports';
import { ManageSchedulesComponent } from './pages/manage-schedules/manage-schedules';
export const routes: Routes = [
    { path: '', component: Login },
    { path: 'register', component: Register },
    { path: 'home', component: Home, canActivate: [authGuard] },
    { path: 'create-service', component: CreateService, canActivate: [authGuard] },
    { path: 'services', component: AllServices, canActivate: [authGuard] },
    { path: 'agendar/:id', component: Scheduling, canActivate: [authGuard] },
    { path: 'about-us', component: AboutUs },
    { path: 'reports', component: Reports, canActivate: [authGuard] },
    { path: 'manage-schedules', component: ManageSchedulesComponent, canActivate: [authGuard] }


];
