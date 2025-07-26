import * as XLSX from 'xlsx';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import Report from '../../types/Report';
import { Chart, ChartItem } from 'chart.js/auto';
import { MONTH } from '../../config/constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
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

    const filteredReport = Array.from({ length: 31 }, (_, i) => ({
      date: i + 1,
      expense: 0,
      income: 0,
    }));
    this.report?.monthlySummary.forEach((e) => {
      filteredReport[new Date(e.date).getDate() - 1].expense = e.expense;
      filteredReport[new Date(e.date).getDate() - 1].income = e.income;
    });
    new Chart(document.getElementById('forBar') as ChartItem, {
      type: 'bar',
      data: {
        labels: filteredReport.map((r) => r.date),
        datasets: [
          {
            label: 'Income',
            data: filteredReport.map((r) => r.income),
          },
          {
            label: 'Expense',
            data: filteredReport.map((r) => r.expense),
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
  
  download() {
    const expenseSummary = XLSX.utils.json_to_sheet(this.report?.expenseSummary!);
    const monthlySummary = XLSX.utils.json_to_sheet(this.report?.monthlySummary!);
    const overallSummary = XLSX.utils.json_to_sheet(this.report?.overallSummary!);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, expenseSummary, 'ExpenseSummary');
    XLSX.utils.book_append_sheet(workbook, monthlySummary, 'MonthlySummary');
    XLSX.utils.book_append_sheet(workbook, overallSummary, 'OverallSummary');
    XLSX.writeFile(workbook, 'data1.xlsx');
  }
}
