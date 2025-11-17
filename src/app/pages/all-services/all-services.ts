import { Component } from '@angular/core';
import { CreateServiceService } from '../../services/create-service';
import { CommonModule } from '@angular/common';
import { Header } from 'app/components/header/header';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-create-service',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    RouterLink
  ],
  templateUrl: './all-services.html',
})
export class AllServices {

  isLoading = false;


  servicosCadastrados: any[] = [];

  constructor(

    private createService: CreateServiceService
  ) { }

  ngOnInit(): void {

    this.loadServicos();
  }


  loadServicos(): void {
    this.createService.getServicos().subscribe(data => {
      this.servicosCadastrados = data;
    });
  }

}
