import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from '../types/Alert';
import { ALERT_DISPLAY_SECONDS } from '../config/constants';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}
  private alertSubject = new Subject<Alert | null>();
  private alert = this.alertSubject.asObservable();

  setAlert(alert: Alert) {
    this.alertSubject.next(alert);
    setTimeout(() => {
      this.removeAlert();
    }, ALERT_DISPLAY_SECONDS);
  }

  removeAlert() {
    this.alertSubject.next(null);
  }

  getAlerts() {
    return this.alert;
  }
}
