import { ValidationErrors } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    if(control.get('password')?.value && control.get('rePassword')?.value && 
        control.get('password')?.value !== control.get('rePassword')?.value){
      control.get('rePassword')?.setErrors({passwordsNotEqual: true});
      return {passwordsNotEqual: true};
    }
    return null;
  };
}