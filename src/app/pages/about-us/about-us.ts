import { Component } from '@angular/core';
import { Header } from 'app/components/header/header';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-about-us',
  imports: [Header, RouterLink],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {

}
