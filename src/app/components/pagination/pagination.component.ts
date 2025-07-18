import {
  Component,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnChanges {
  pageInput = input.required<number>();
  totalInput = input.required<number>();
  noofItemsInput = input.required<number>();
  setPage = output<number>();
  page!: number;
  total!: number;
  noofItems!: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageInput']) this.page = changes['pageInput'].currentValue;
    if (changes['totalInput']) this.total = changes['totalInput'].currentValue;
    if (changes['noofItemsInput'])
      this.noofItems = changes['noofItemsInput'].currentValue;
  }

  prevPage() {
    this.setPage.emit(this.page - 1);
  }
  nextPage() {
    this.setPage.emit(this.page + 1);
  }
  min(num1: number, num2: number) {
    return Math.min(num1, num2);
  }
}
