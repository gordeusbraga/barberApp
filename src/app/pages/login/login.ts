import { AuthService } from './../../services/authService';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Credentials } from '../../services/authService';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  constructor(private authService: AuthService) { }
  public email: string = '';
  public password: string = '';
  public login(): void {

    const credentials: Credentials = {
      email: this.email,
      password: this.password
    };
    this.authService.login(credentials);


  }



}
