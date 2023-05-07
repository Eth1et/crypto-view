import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  currentUser?: User;

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') as string) as User;
    console.log(this.currentUser, !(this.currentUser));
  }
}
