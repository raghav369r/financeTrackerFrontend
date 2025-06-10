import { Routes } from '@angular/router';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { AddTransactionComponent } from './pages/add-transaction/add-transaction.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: TransactionComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  {
    path: 'addtransaction',
    pathMatch: 'full',
    component: AddTransactionComponent,
  },
];
