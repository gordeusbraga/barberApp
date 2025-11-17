import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authService';

import { User as SupabaseUser } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class Header implements OnInit {

  public isMenuOpen: boolean = false;
  public isModalOpen: boolean = false;

  public user$!: Observable<SupabaseUser | null | undefined>;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }


  public logout(): void {
    this.authService.logout();
    this.isModalOpen = false;
  }
}