import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function mustAgreeToTerms(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { mustAgreeToTerms: true };
      }
      return null;
    };
  }
  