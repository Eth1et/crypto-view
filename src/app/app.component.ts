import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { User } from './shared/models/User';
import { Subscription } from 'rxjs';
import { UserService } from './shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  
  loggedInUser?: User | null;
  userLoggedInSubscription?: Subscription;
  getUserSubscription?: Subscription;

  constructor(private router: Router, private authService: AuthService, private userService: UserService, private snackBar: MatSnackBar){}

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav){
    if (event === true){
      sidenav.close();
    }
  }

  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {duration: 3000});
  }

  logout(_?: boolean){
    this.authService.logout().then(() =>{
      console.log("Logged out successfully!");

      localStorage.setItem('user', JSON.stringify(null));
      this.loggedInUser = null;
      this.openSnackBar('Logged out successfully!', 'close');
    }).catch(err => {
      console.error(err);
    }).finally(() => {

    });
  }

  ngOnInit(): void {
    this.userLoggedInSubscription =  this.authService.isUserLoggedIn().subscribe({
      next: user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userService.readById(user?.uid as string).subscribe({
          next: snapshot => {
            if(snapshot.data()){
              this.loggedInUser = snapshot.data();
              localStorage.setItem('user', JSON.stringify(snapshot.data()));
            }else{
              localStorage.setItem('user', JSON.stringify(null));
            }
          },
          error: error => {
            console.error(error);
            localStorage.setItem('user', JSON.stringify(null));
          }
        })
      }, 
      error: error =>{
        console.error(error);
        localStorage.setItem('user', JSON.stringify(null));
      }
    });
  }

  ngOnDestroy(){
    this.userLoggedInSubscription?.unsubscribe();
    this.getUserSubscription?.unsubscribe();
  }
}
