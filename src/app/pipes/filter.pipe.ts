import { Pipe, PipeTransform } from '@angular/core';
import Transaction from '../types/Transaction';
import { DEFAULT_PAGE_SIZE } from '../config/constants';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  private size = DEFAULT_PAGE_SIZE;
  transform(transactions: Transaction[], ...args: number[]): Transaction[] {
    const [page] = args;
    return transactions.slice(
      page * this.size,
      Math.min(transactions.length, (page + 1) * this.size)
    );
  }
}
