import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
