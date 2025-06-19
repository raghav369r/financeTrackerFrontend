import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from '../types/Alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}
  private alertSubject = new Subject<Alert>();
  private alert = this.alertSubject.asObservable();

  setAlert(alert: Alert) {
    this.alertSubject.next(alert);
  }

  getAlerts() {
    return this.alert;
  }
}
