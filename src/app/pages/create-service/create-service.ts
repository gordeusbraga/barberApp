
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreateServiceService } from '../../services/create-service';
import { CommonModule } from '@angular/common';
import { Header } from 'app/components/header/header';
@Component({
  selector: 'app-create-service',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Header
  ],
  templateUrl: './create-service.html',
})
export class CreateService implements OnInit {

  serviceForm!: FormGroup;
  isLoading = false;


  servicosCadastrados: any[] = [];

  constructor(
    private fb: FormBuilder,
    private createService: CreateServiceService
  ) { }

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: ['', [Validators.required]],
      barber_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      duration_minutes: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });


    this.loadServicos();
  }


  loadServicos(): void {
    this.createService.getServicos().subscribe(data => {
      this.servicosCadastrados = data;
    });
  }


  get f() {
    return this.serviceForm.controls;
  }

  async onSubmit() {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    try {

      const novoServico = await this.createService.createServico(this.serviceForm.value).toPromise();

      alert('Serviço cadastrado com sucesso!');
      this.serviceForm.reset();
      this.servicosCadastrados.push(novoServico);

    } catch (error) {
      console.error('Erro ao cadastrar serviço:', error);
      alert('Erro ao cadastrar serviço. Tente novamente.');
    } finally {
      this.isLoading = false;
    }


  }
  async deleteService(serviceId: number) {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) {
      return;
    }
    this.isLoading = true;

    try {
      await this.createService.deleteServico(serviceId).toPromise();
      this.servicosCadastrados = this.servicosCadastrados.filter(servico => servico.id !== serviceId);
      alert('Serviço excluído com sucesso!');
    }
    catch (error) {
      console.error('Erro ao excluir serviço:', error);
      alert('Erro ao excluir serviço. Tente novamente.');
    } finally {
      this.isLoading = false;
    }
  }

}