import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Header } from '../../components/header/header';
import { CreateServiceService } from '../../services/create-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    Header
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {


  servicosCadastrados: any[] = [];
  isLoading: boolean = true;

  agendamentos: any[] = [];


  constructor(private createService: CreateServiceService) { }


  ngOnInit(): void {

    this.createService.getServicos().subscribe(
      (data) => {
        this.servicosCadastrados = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao buscar serviços:', error);
        this.isLoading = false;
      }
    );


  }
}