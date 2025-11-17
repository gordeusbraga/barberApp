

import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Header } from '../../components/header/header';
import { CreateServiceService } from '../../services/create-service';
import { SchedulingService } from '../../services/scheduling';
import { ProfileService } from '../../services/profileService';
import { switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    Header,
    DatePipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  servicosCadastrados: any[] = [];
  isLoadingServicos: boolean = true;

  agendamentos: any[] = [];
  isLoadingAgendamentos: boolean = true;

  constructor(
    private createService: CreateServiceService,
    private schedulingService: SchedulingService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {

    this.createService.getServicos().subscribe(
      (data) => {
        this.servicosCadastrados = data;
        this.isLoadingServicos = false;
      },
      (error) => {
        console.error('Erro ao buscar serviços:', error);
        this.isLoadingServicos = false;
      }
    );


    this.isLoadingAgendamentos = true;
    this.profileService.getCurrentProfile().pipe(
      take(1),
      switchMap(profile => {

        if (!profile) {
          return of([]);
        }

        return this.schedulingService.getAgendamentosPorCliente(profile.id);
      })
    ).subscribe(
      (data) => {
        this.agendamentos = data;
        this.isLoadingAgendamentos = false;
      },
      (error) => {
        console.error('Erro ao buscar agendamentos:', error);
        this.isLoadingAgendamentos = false;
      }
    );
  }
  cancelar(agendamento: any): void {


    agendamento.isLoading = true;


    this.schedulingService.updateAgendamentoStatus(agendamento.id, 'cancelado').subscribe(
      () => {

        this.agendamentos = this.agendamentos.filter(item => item.id !== agendamento.id);


      },
      (error) => {

        console.error('Erro ao cancelar agendamento:', error);
        agendamento.isLoading = false;

      }
    );
  }
}