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
  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  loginForm: FormGroup;

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  async login() {
    console.log("Login attempt");

    if (this.loginForm.invalid) {
      console.log("Form is invalid");
      this.loginForm.markAllAsTouched();
      return; // Pare aqui
    }

    // 6. Se for válido, COMECE O LOADING


    try {
      // Pega as credenciais
      const credentials: Credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      console.log(credentials);

      // 7. CHAME O SERVIÇO (o que estava faltando)
      await this.authService.login(credentials);
      // Se o login for bem-sucedido, o service vai navegar

    } catch (error) {
      console.error("Login failed:", error);
      // 8. Se der erro, mostre ao usuário (opcional)
      // E pare o loading
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}