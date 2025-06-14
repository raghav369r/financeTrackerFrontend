import { Routes } from '@angular/router';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ChildGuard } from './guards/child.guard';

export const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    canActivateChild: [ChildGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TransactionComponent,
      },
      {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardComponent,
      },
    ],
  },
];

[
  {
    path: '',
    pathMatch: 'full',
    component: TransactionComponent,
    canActivate: [AuthGuard],
    redirectTo: '/login',
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    redirectTo: '/login',
  },
];
