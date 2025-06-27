import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import Transaction from '../../types/Transaction';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { DEFAULT_PAGE_SIZE, HIGHLIGHT_SECONDS } from '../../config/constants';
import { AlertService } from '../../services/alert.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-transaction',
  imports: [
    CommonModule,
    FormsModule,
    AddTransactionComponent,
    PaginationComponent,
    FilterPipe,
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  constructor(
    private readonly tService: TransactionService,
    private readonly alertService: AlertService
  ) {}

  date: Date | null = null;
  type = 'All Types';
  category = 'All Categories';
  deletePopUp = 0;
  updatePopUp = 0;
  addTransactionPopUp = false;
  fetchError = '';
  addedOrUpdated = false;
  page = 0;
  noofItems = DEFAULT_PAGE_SIZE;
  loading = false;
  setPage(pageNumber: number) {
    this.page = pageNumber;
  }
  fetchTransactions(): void {
    this.loading = true;
    this.page = 0;
    let queryParams: any = {};
    if (this.date) queryParams.date = this.date;
    if (this.type != 'All Types') queryParams.type = this.type;
    if (this.category != 'All Categories') queryParams.category = this.category;

    this.tService.getAllTransactions(queryParams).subscribe({
      next: (res) => {
        this.loading = false;
        this.transactions = res;
      },
      error: (ex) => {
        this.loading = false;
        this.alertService.setAlert({
          type: 'error',
          message: 'Error fetching Transactions!!',
        });
        if (ex.status == 401)
          this.fetchError = 'Token missing or expired Login and try again!!';
        else if (ex.status == 400)
          this.fetchError = 'Fill all required fields!!';
        else this.fetchError = 'Unknown error try again!!';
        console.log(ex);
      },
    });
  }

  ngOnInit(): void {
    this.fetchTransactions();
  }
  handleUpdate(index: number) {
    this.updatePopUp = index + 1;
  }
  handleDelete(index: number) {
    this.deletePopUp = index + 1;
    let transactionId = this.transactions[index].id;
    this.tService.deleteTransaction(transactionId as number).subscribe({
      next: (res) => {
        this.alertService.setAlert({
          type: 'success',
          message: 'Transaction Deleted Suceessfully.',
        });
        this.transactions = this.transactions.filter(
          (t) => t.id != transactionId
        );
      },
      error: (ex) => {
        this.alertService.setAlert({
          type: 'error',
          message: 'Error Deleting Transaction!!',
        });
      },
    });
  }
  handleAddTransaction() {
    this.addTransactionPopUp = !this.addTransactionPopUp;
  }
  handleclose() {
    this.deletePopUp = 0;
    this.updatePopUp = 0;
    this.addTransactionPopUp = false;
  }
  updateUI(isNew: boolean, transaction: Transaction) {
    this.addedOrUpdated = true;
    setTimeout(() => (this.addedOrUpdated = false), HIGHLIGHT_SECONDS);
    if (isNew) this.transactions = [transaction, ...this.transactions];
    else
      this.transactions = [
        transaction,
        ...this.transactions.filter((t) => t.id != transaction.id),
      ];
  }
}
