import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register {


  public nome: string = '';
  public cpf: string = '';
  public email: string = '';
  public celular: string = '';
  public password: string = '';

  constructor() { }

  public registrar(): void {


    const dadosUsuario = {
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      celular: this.celular,
      senha: this.password
    };

    console.log("Dados do novo usuário:", dadosUsuario);

  }

}
