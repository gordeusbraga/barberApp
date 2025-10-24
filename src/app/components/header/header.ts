import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../services/authService';
@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Header {

  public isMenuOpen: boolean = false;
  public isModalOpen: boolean = false;

  public cliente: User | undefined;

  constructor(private authService: AuthService) {
    this.cliente = this.authService.getUserByCpf(this.authService.userLoggedCpf);
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


  public toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }
}