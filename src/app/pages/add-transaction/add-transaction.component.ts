import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-transaction',
  imports: [ReactiveFormsModule],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css',
})
export class AddTransactionComponent {
  constructor(private readonly tservice: TransactionService, private readonly router:Router) {}

  transaction = new FormGroup({
    date: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    amount: new FormControl(0, Validators.required),
    category: new FormControl('', Validators.required),
    userId:new FormControl(1)
  });
  handleAdd() {
    console.log(this.transaction.value)
    this.tservice
      .addTransaction(this.transaction.value)
      .subscribe({next:()=>this.router.navigateByUrl("/"),error:()=>alert("Someting went wrong try again")});
  }
}
