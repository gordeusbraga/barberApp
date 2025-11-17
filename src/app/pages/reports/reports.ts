import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Header } from 'app/components/header/header';
import { RelatorioService } from 'app/services/reports';
import { Chart } from 'chart.js/auto';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterLink, Header, CurrencyPipe],
  templateUrl: './reports.html',
})
export class Reports implements OnInit, AfterViewInit {

  @ViewChild('weeklyRevenueChart') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | undefined;

  faturamentoTotal: number = 0;
  agendamentosConcluidos: number = 0;
  isLoading = true;

  constructor(private relatorioService: RelatorioService) { }

  ngOnInit(): void {

    this.relatorioService.getMonthlySummary().pipe(
      catchError(err => {
        console.error('Erro ao buscar resumo mensal:', err);
        return of({ total_revenue: 0, total_completed: 0 });
      })
    ).subscribe(data => {
      this.faturamentoTotal = data.total_revenue;
      this.agendamentosConcluidos = data.total_completed;
    });
  }

  ngAfterViewInit(): void {

    this.relatorioService.getWeeklyRevenue().pipe(
      catchError(err => {
        console.error('Erro ao buscar faturamento semanal:', err);
        return of([]);
      })
    ).subscribe(data => {


      this.isLoading = false;


      setTimeout(() => {
        this.createChart(data);
      }, 0);

    });
  }


  createChart(data: any[]): void {
    if (this.chart) {
      this.chart.destroy();
    }
    const labels = data.map(d => d.week_label);
    const revenueData = data.map(d => d.revenue);


    const chartContext = this.chartCanvas.nativeElement.getContext('2d');
    if (!chartContext) return;

    this.chart = new Chart(chartContext, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Faturamento Semanal',
          data: revenueData,
          backgroundColor: 'rgba(129, 72, 196, 0.8)',
          borderColor: 'rgba(129, 72, 196, 1)',
          borderWidth: 1,
          borderRadius: 8,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const value = context.parsed?.y ?? context.raw ?? 0;
                return `R$ ${Number(value).toFixed(2)}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value: string | number) {
                return `R$ ${value}`;
              }
            }
          }
        }
      }
    });
  }
}