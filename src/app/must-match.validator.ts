import { FormGroup } from '@angular/forms';

export function mustMatch(controlName: string, matchingControlName: string) {
  return (registrationForm: FormGroup) => {
    const control = registrationForm.controls["password"];
    const matchingControl = registrationForm.controls["confirmPassword"];

    if (matchingControl.errors && !matchingControl.errors?.['mustMatch']) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
