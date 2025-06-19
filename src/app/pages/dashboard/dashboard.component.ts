import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import Report from '../../types/Report';
import { Chart, ChartItem } from 'chart.js/auto';
import { MONTH } from '../../config/constants';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  report: Report | null = null;
  currentMonth = MONTH[new Date().getMonth()];
  public constructor(private readonly reportService: ReportsService) {}
  fetchError = '';
  data: { label: string; value: number }[] = [];
  async addCharts() {
    this.report?.expenseSummary.forEach((expense) => {
      this.data.push({ label: expense.category, value: expense.expense });
    });
    new Chart(document.getElementById('forPie') as ChartItem, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: this.data.map((d) => d.value),
          },
        ],
        labels: this.data.map((d) => d.label),
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: 'left',
            labels: {
              color: '#333',
              font: {
                size: 14,
              },
              padding: 20,
              usePointStyle: true,
            },
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });

    new Chart(document.getElementById('forBar') as ChartItem, {
      type: 'bar',
      data: {
        labels: this.report?.monthlySummary.map((r) =>
          new Date(r.date).getDate()
        ),
        datasets: [
          {
            data: this.report?.monthlySummary.map((r) => r.expense),
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  async ngOnInit(): Promise<void> {
    this.fetchError = '';
    this.reportService.getReports().subscribe({
      next: async (res) => {
        this.report = res;
        await this.addCharts();
      },
      error: (ex) => {
        if (ex.status == 401)
          this.fetchError = 'Token missing or expired Login and try again!!';
        else if (ex.status == 400)
          this.fetchError = 'Fill all required fields!!';
        else this.fetchError = 'Unknown error try again!!';
      },
    });
  }
}
