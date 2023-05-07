import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { passwordMatchValidator } from 'src/app/shared/validators/passwords-match';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnDestroy{

  loading: boolean = false;

  usernameReadSubscription?: Subscription;

  signUpForm = new FormGroup({
    username: new FormControl('', [Validators.minLength(3), Validators.maxLength(30), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.maxLength(40), Validators.required]),
    rePassword: new FormControl('', [Validators.minLength(6), Validators.maxLength(40), Validators.required]),
    name: new FormGroup({
      firstname: new FormControl('', [Validators.minLength(3), Validators.maxLength(30), Validators.required]),
      lastname: new FormControl('', [Validators.minLength(3), Validators.maxLength(30), Validators.required])
    })
  }, [passwordMatchValidator()]);

  constructor(private router: Router, private authService: AuthService, private userService: UserService, private snackBar: MatSnackBar){

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 6500});
  }
    
  onSubmit(){
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;

    if(email === undefined || password === undefined || email === null || password === null || !this.signUpForm.valid){
      this.openSnackBar(this.signUpForm.getError("passwordsNotEqual")? "Passwords do not match!" : "Fill out all required fields!", 'close');
      return
    }

    let createdUser = false;

    this.usernameReadSubscription =  this.userService.readByUsername(this.signUpForm.value.username as string).subscribe({
      next: users => {
        if(users.length < 1){
          this.createUser(email, password);
          createdUser = true;
        }else if(!createdUser){
          console.error("The username is already in use!");
          this.openSnackBar("The username is already in use", "close");
        }
      },
      error: error => {
        console.error(error);
        this.openSnackBar(error, "close");
      }
    });
  }

  createUser(email: string, password: string){
    this.loading = true;
    this.authService.signup(email, password).then( cred => {
      const user: User = {
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value as string,
        username: this.signUpForm.get('username')?.value as string,
        name:{
          firstname: this.signUpForm.get('name.firstname')?.value as string,
          lastname: this.signUpForm.get('name.lastname')?.value as string
        }
      }

      this.userService.create(user).then(_ => {
        this.router.navigateByUrl('/exchange-rates');
      }).catch( error => {
        console.error(error);
        this.openSnackBar(error, 'close');
      });

    }).catch( err => {
      console.error(err);
      this.openSnackBar(err, 'close');

    }).finally( () => {
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.usernameReadSubscription?.unsubscribe();
  }
}
