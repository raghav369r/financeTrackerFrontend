import {
  Component,
  input,
  InputSignal,
  OnChanges,
  output,
  OutputEmitterRef,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import Transaction from '../../types/Transaction';

@Component({
  selector: 'app-add-transaction',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css',
})
export class AddTransactionComponent implements OnChanges {
  constructor(
    private readonly tservice: TransactionService,
    private readonly router: Router
  ) {}

  closePopup = output<void>();
  transactionToEdit: InputSignal<Transaction> | InputSignal<null> = input(null);
  updateUI: OutputEmitterRef<Transaction> = output<Transaction>();
  submissionError = '';
  transactionDetails = new FormGroup({
    id: new FormControl(this.transactionToEdit()?.id || 0),
    amount: new FormControl(this.transactionToEdit()?.amount || '', [
      Validators.required,
      Validators.min(1),
    ]),
    type: new FormControl(this.transactionToEdit()?.type || null, [
      Validators.required,
    ]),
    category: new FormControl(this.transactionToEdit()?.category || null, [
      Validators.required,
    ]),
    description: new FormControl(this.transactionToEdit()?.description || '', [
      Validators.required,
    ]),
    date: new FormControl(this.transactionToEdit()?.date || '', [
      Validators.required,
    ]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['transactionToEdit'] &&
      changes['transactionToEdit'].currentValue
    ) {
      const tx = changes['transactionToEdit'].currentValue as Transaction;
      this.transactionDetails.patchValue({
        id: tx.id,
        amount: tx.amount,
        type: tx.type,
        category: tx.category,
        description: tx.description,
        date: tx.date,
      });
    }
  }

  handleSave() {
    this.submissionError = '';
    if (this.transactionToEdit() == null) this.addTransaction();
    else this.updateTransaction();
  }
  addTransaction() {
    this.tservice.addTransaction(this.transactionDetails.value).subscribe({
      next: (res) => {
        this.updateUI.emit(res);
        this.handleClose();
      },
      error: (ex) => {
        if (ex.status == 401)
          this.submissionError =
            'Token missing or expired Login and try again!!';
        else if (ex.status == 400)
          this.submissionError = 'Fill all required fields!!';
        else this.submissionError = 'Unknown error try again!!';
        console.log(ex);
      },
    });
  }
  updateTransaction() {
    this.tservice
      .updateTransaction(this.transactionDetails.value as Transaction)
      .subscribe({
        next: (res) => {
          this.updateUI.emit(res);
          this.handleClose();
        },
        error: (ex) => {
          if (ex.status == 401)
            this.submissionError =
              'Token missing or expired Login and try again!!';
          else if (ex.status == 400)
            this.submissionError = 'Fill all required fields!!';
          else this.submissionError = 'Unknown error try again!!';
          console.log(ex);
        },
      });
  }
  handleClose() {
    this.closePopup.emit();
  }
  preventEnter(event: Event) {
    event.preventDefault();
  }
}
