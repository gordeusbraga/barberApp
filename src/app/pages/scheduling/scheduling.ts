
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Header } from 'app/components/header/header';
import { CreateServiceService } from 'app/services/create-service';
import { SchedulingService } from 'app/services/scheduling';
import { ProfileService } from 'app/services/profileService';
import { take } from 'rxjs/operators';


interface CalendarioDia {
  numero: number;
  valido: boolean;
  desabilitado: boolean;
}

@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [CommonModule, RouterLink, Header],
  templateUrl: './scheduling.html',
})
export class Scheduling implements OnInit {

  isLoading = true;
  servico: any = null;


  dataBase = new Date();
  diasDoMes: CalendarioDia[] = [];
  mesAtualStr: string = '';
  diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  dataSelecionada: Date | null = null;
  horariosDisponiveis: string[] = [];
  horarioSelecionado: string | null = null;

  private servicoId: string | null = null;
  private clienteId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private createService: CreateServiceService,
    private schedulingService: SchedulingService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {

    const hoje = new Date();
    this.dataSelecionada = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());


    this.profileService.getCurrentProfile().pipe(take(1)).subscribe(profile => {
      if (profile) {
        this.clienteId = profile.id;
      }
    });


    this.route.paramMap.pipe(take(1)).subscribe(params => {
      this.servicoId = params.get('id');
      if (this.servicoId) {

        this.createService.getServicoById(this.servicoId).subscribe(data => {
          this.servico = data;
          this.isLoading = false;
        });
      }
    });


    this.gerarCalendario();
    this.carregarHorarios();
  }


  mudarMes(offset: number): void {

    this.dataBase.setDate(1);
    this.dataBase.setMonth(this.dataBase.getMonth() + offset);

    this.gerarCalendario();
  }


  gerarCalendario(): void {
    this.diasDoMes = [];
    const ano = this.dataBase.getFullYear();
    const mes = this.dataBase.getMonth();


    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);


    this.mesAtualStr = this.dataBase.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    this.mesAtualStr = this.mesAtualStr.charAt(0).toUpperCase() + this.mesAtualStr.slice(1);

    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();


    for (let i = 0; i < primeiroDiaSemana; i++) {
      this.diasDoMes.push({ numero: 0, valido: false, desabilitado: true });
    }


    for (let i = 1; i <= ultimoDiaMes; i++) {
      const diaAtual = new Date(ano, mes, i);

      const desabilitado = diaAtual < hoje;

      this.diasDoMes.push({
        numero: i,
        valido: true,
        desabilitado: desabilitado
      });
    }
  }


  isMesAtual(): boolean {
    const hoje = new Date();
    return this.dataBase.getFullYear() === hoje.getFullYear() &&
      this.dataBase.getMonth() === hoje.getMonth();
  }


  carregarHorarios(): void {

    this.horariosDisponiveis = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];
  }


  selecionarDia(dia: CalendarioDia): void {

    if (!dia.valido || dia.desabilitado) return;

    this.dataSelecionada = new Date(
      this.dataBase.getFullYear(),
      this.dataBase.getMonth(),
      dia.numero
    );
    this.carregarHorarios();
    this.horarioSelecionado = null;
  }

  selecionarHorario(horario: string): void {
    this.horarioSelecionado = horario;
  }

  isDiaSelecionado(dia: CalendarioDia): boolean {
    if (!dia.valido || !this.dataSelecionada) return false;
    return dia.numero === this.dataSelecionada.getDate() &&
      this.dataBase.getMonth() === this.dataSelecionada.getMonth() &&
      this.dataBase.getFullYear() === this.dataSelecionada.getFullYear();
  }

  async onSubmit(): Promise<void> {
    if (!this.servicoId || !this.clienteId || !this.dataSelecionada || !this.horarioSelecionado) {
      alert("Por favor, selecione um dia e um horário.");
      return;
    }

    this.isLoading = true;

    const [horas, minutos] = this.horarioSelecionado.split(':');
    const dataHoraFinal = new Date(this.dataSelecionada);
    dataHoraFinal.setHours(parseInt(horas, 10));
    dataHoraFinal.setMinutes(parseInt(minutos, 10));

    const agendamentoData = {
      client_id: this.clienteId,
      service_id: this.servicoId,
      appointment_time: dataHoraFinal.toISOString()
    };

    try {
      await this.schedulingService.createAgendamento(agendamentoData).toPromise();
      alert('Agendamento realizado com sucesso!');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      alert('Erro ao realizar agendamento. Tente novamente.');
    } finally {
      this.isLoading = false;
    }
  }

}