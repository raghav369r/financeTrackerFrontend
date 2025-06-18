import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../types/Alert';
import { CommonModule } from '@angular/common';
import { COLORS } from '../../config/constants';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent implements OnInit {
  constructor(public readonly alertService: AlertService) {}
  ngOnInit(): void {
    this.alertService.getAlerts().subscribe((_alert) => (this.alert = _alert));
  }
  color = COLORS;
  alert: Alert | null = null;

  closeAlert() {
    this.alertService.removeAlert();
  }
}
