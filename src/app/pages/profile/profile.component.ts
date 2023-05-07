import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  currentUser?: User;

  constructor(){

  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') as string);
  }
}
