import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../types/Alert';
import { CommonModule } from '@angular/common';
import { ALERT_DISPLAY_SECONDS, COLORS } from '../../config/constants';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent implements OnInit {
  constructor(public readonly alertService: AlertService) {}

  private removeCurrAndAddTimerToNext = () => {
    this.alerts.shift();
    this.timerRef = null;
    clearInterval(this.intervalRef);
    if (this.alerts.length) {
      this.timerRef = setTimeout(
        this.removeCurrAndAddTimerToNext,
        ALERT_DISPLAY_SECONDS
      );
      this.remainingSeconds = ALERT_DISPLAY_SECONDS / 1000;
      clearInterval(this.intervalRef);
      this.intervalRef = setInterval(() => this.remainingSeconds--, 1000);
    }
  };

  ngOnInit(): void {
    this.alertService.getAlerts().subscribe((_alert) => {
      this.alerts.push(_alert);
      if (this.timerRef == null) {
        this.timerRef = setTimeout(
          this.removeCurrAndAddTimerToNext,
          ALERT_DISPLAY_SECONDS
        );
        this.remainingSeconds = ALERT_DISPLAY_SECONDS / 1000;
        clearInterval(this.intervalRef);
        this.intervalRef = setInterval(() => this.remainingSeconds--, 1000);
      }
    });
  }
  color = COLORS;
  alerts: Alert[] = [];
  timerRef: any = null;
  intervalRef: any = null;
  remainingSeconds = 0;
  closeAlert(index: number) {
    if (!index) {
      this.alerts.shift();
      clearTimeout(this.timerRef);
      clearInterval(this.intervalRef);
      this.timerRef = null;
      if (this.alerts.length) {
        this.timerRef = setTimeout(
          this.removeCurrAndAddTimerToNext,
          ALERT_DISPLAY_SECONDS
        );
        this.remainingSeconds = ALERT_DISPLAY_SECONDS / 1000;
        clearInterval(this.intervalRef);
        this.intervalRef = setInterval(() => this.remainingSeconds--, 1000);
      }
    } else this.alerts = this.alerts.filter((_, ind) => ind != index);
  }
}
