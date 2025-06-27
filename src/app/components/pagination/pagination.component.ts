import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  page = input.required<number>();
  total = input.required<number>();
  noofItems = input.required<number>();
  setPage = output<number>();
  prevPage() {
    this.setPage.emit(this.page() - 1);
  }
  nextPage() {
    this.setPage.emit(this.page() + 1);
  }
  min(num1: number, num2: number) {
    return Math.min(num1, num2);
  }
}
