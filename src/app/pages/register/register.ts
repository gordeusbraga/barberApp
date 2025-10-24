
import { AuthService } from './../../services/authService';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../services/authService';
@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register {
  constructor(private authService: AuthService) { }


  public cpf: string = ""
  public name: string = ""
  public email: string = ""
  public phone: string = ""
  public password: string = ""


  public registrar(): void {


    const dataUser: User = {
      cpf: this.cpf,
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password
    };


    if (dataUser.name === "" || dataUser.cpf === "" || dataUser.email === "" || dataUser.phone === "" || dataUser.password === "") {
      console.log("Por favor, preencha todos os campos obrigatórios.");
      return;
    }


    this.authService.register(dataUser);



  }

}
