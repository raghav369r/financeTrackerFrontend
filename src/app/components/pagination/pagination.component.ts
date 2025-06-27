import { Component, Input, input } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '../../config/constants';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  page = 0;
  items = DEFAULT_PAGE_SIZE;
  total = input.required<number>();
  prevPage() {
    this.page--;
  }
  nextPage() {
    this.page++;
  }
  min(num1: number, num2: number) {
    return Math.min(num1, num2);
  }
}
