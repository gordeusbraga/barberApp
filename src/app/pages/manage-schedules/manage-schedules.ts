import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Header } from 'app/components/header/header';
import { SchedulingService } from 'app/services/scheduling';


@Component({
  selector: 'app-manage-schedules',
  standalone: true,
  imports: [CommonModule, RouterLink, Header, DatePipe],
  templateUrl: './manage-schedules.html',
})
export class ManageSchedulesComponent implements OnInit {


  agendamentos: any[] = [];
  isLoading = true;

  constructor(private agendamentoService: SchedulingService) { }

  ngOnInit(): void {
    this.loadAgendamentos();
    console.log(this.agendamentos);
  }

  loadAgendamentos(): void {
    this.isLoading = true;
    this.agendamentoService.getAllAgendamentos().subscribe(data => {
      this.agendamentos = data.sort((a, b) =>
        new Date(b.appointment_time).getTime() - new Date(a.appointment_time).getTime()
      );
      this.isLoading = false;
    });
  }

  finalizar(agendamento: any): void {
    agendamento.isLoading = true;
    this.agendamentoService.updateAgendamentoStatus(agendamento.id, 'concluido').subscribe(() => {
      agendamento.status = 'concluido';
      agendamento.isLoading = false;
    });
  }

  cancelar(agendamento: any): void {
    agendamento.isLoading = true;
    this.agendamentoService.updateAgendamentoStatus(agendamento.id, 'cancelado').subscribe(() => {
      agendamento.status = 'cancelado';
      agendamento.isLoading = false;
    });
  }
}