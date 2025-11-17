
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



  async Register(): Promise<void> { // Tornamos ela async

    // 7. Validação PRIMEIRO
    if (this.registerForm.invalid) {
      console.log("Formulário inválido.");
      this.registerForm.markAllAsTouched(); // Mostra todos os erros
      return; // Para aqui
    }

    // 8. Se for válido, inicie o loading
    this.isLoading = true;

    try {
      // O 'this.registerForm.value' JÁ É um objeto 'User' 
      // (desde que os formControlNames sejam iguais )
      await this.authService.register(this.registerForm.value);
      // O service (que já refatoramos) cuida de navegar

    } catch (error) {
      console.error("Erro ao registrar:", error);
      // TODO: Mostrar um erro para o usuário
    } finally {
      this.isLoading = false; // Pare o loading
    }
  }

  // 8. O "atalho" para o HTML
  get f() {
    return this.registerForm.controls;
  }
}
