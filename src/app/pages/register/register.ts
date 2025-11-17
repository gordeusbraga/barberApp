
import { AuthService } from './../../services/authService';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../services/authService';
@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register implements OnInit {

  constructor(private authService: AuthService, private fb: FormBuilder
  ) { }
  registerForm!: FormGroup;
  isLoading: boolean = false;

  ngOnInit() {
    this.registerForm = this.fb.group({
      cpf: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }



  async Register(): Promise<void> {


    if (this.registerForm.invalid) {
      console.log("Formulário inválido.");
      this.registerForm.markAllAsTouched();
      return;
    }


    this.isLoading = true;

    try {

      await this.authService.register(this.registerForm.value);


    } catch (error) {
      console.error("Erro ao registrar:", error);

    } finally {
      this.isLoading = false;
    }
  }


  get f() {
    return this.registerForm.controls;
  }
}
