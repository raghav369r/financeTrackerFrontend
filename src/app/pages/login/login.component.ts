import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TOKEN } from '../../config/constants';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  isNewUser = false;
  fullName = '';
  submissionError = '';
  userDetails = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  handleUser = () => {
    this.isNewUser = !this.isNewUser;
  };
  handleSubmit = () => {
    this.submissionError = '';
    if (!this.userDetails.valid || (this.isNewUser && this.fullName.length < 5))
      return;
    if (this.isNewUser)
      this.userService
        .register({
          ...this.userDetails.value,
          fullName: this.fullName,
        })
        .subscribe({
          next: (res) => {
            localStorage.setItem(TOKEN, res.token);
            this.userService.updateSubject(res.token);
            this.router.navigateByUrl('/');
          },
          error: (err) => {
            if (err?.status == 400) this.submissionError = 'Validation Error!!';
            else if (err?.status == 401)
              this.submissionError = 'invalid userName of password!!';
            else this.submissionError = 'Unknown error try again!!';
          },
        });
    else
      this.userService.login(this.userDetails.value).subscribe({
        next: (res) => {
          localStorage.setItem(TOKEN, res.token);
          this.userService.updateSubject(res.token);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          if (err?.status == 400) this.submissionError = 'Validation Error!!';
          else if (err?.status == 401)
            this.submissionError =
              'Invalid userName and password Combination!!';
          else this.submissionError = 'Unknown error try again!!';
        },
      });
  };

  preventEnter(event: Event) {
    event.preventDefault();
  }
}
