
import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PatientDetailsComponent } from './features/patient-details/patient-details.component';

export const appRoutes: Routes = [
  { path: '', component: DashboardComponent }, // Route mặc định
  { path: 'patient-details/:id', component: PatientDetailsComponent },
  { path: '**', redirectTo: '' } // Redirect các route không hợp lệ về Dashboard
];
