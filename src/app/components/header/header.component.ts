import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import User from '../../types/User';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user: null | User = null;
  public constructor(private readonly userService: UserService) {}
  ngOnInit(): void {
    this.userService.updateSubject();
    this.userService.userDetails.subscribe({
      next: (res) => (this.user = res),
    });
  }
  handleLogout(): void {
    this.userService.logout();
  }
}
