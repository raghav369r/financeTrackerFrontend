import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import Transaction from '../../types/Transaction';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction',
  imports: [RouterLink,CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit{
  transactions:Transaction[]=[]
  constructor(private readonly tService:TransactionService){}
  ngOnInit(): void {
    this.tService.getAllTransactions().subscribe({next:(res)=>this.transactions=res})
  }
}
