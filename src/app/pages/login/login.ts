import { AuthService } from './../../services/authService';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../../services/authService';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  loginForm: FormGroup;
  isLoading = false;
  authError: string | null = null;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    console.log("Login attempt");
    this.isLoading = true;
    this.authError = null;

    if (this.loginForm.invalid) {
      console.log("Form is invalid");
      this.loginForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }

    try {
      const credentials: Credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      console.log(credentials);

      await this.authService.login(credentials);


    } catch (error: any) {
      console.error("Login failed:", error.message);

      if (error.message === 'Invalid login credentials') {
        this.authError = 'E-mail ou senha inválidos. Tente novamente.';
      } else {
        this.authError = 'Ocorreu um erro inesperado. Tente mais tarde.';
      }
    } finally {
      this.isLoading = false;
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}