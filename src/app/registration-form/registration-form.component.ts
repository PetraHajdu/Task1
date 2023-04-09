import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { mustMatch } from '../must-match.validator';
import { mustAgreeToTerms } from '../terms-conditions.validator';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm!: FormGroup;

  users: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      checkbox: [false, mustAgreeToTerms()]
    },
    {
      validator: mustMatch('password', 'confirmPassword'),
  
    });

    this.http.get('http://localhost:3000/users').subscribe(users => this.users = users);
  }

  get firstname() {
    return this.registrationForm.get('firstname');
  }

  get lastname() {
    return this.registrationForm.get('lastname');
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  get checkbox() {
    return this.registrationForm.get('checkbox');
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const formData = {
      firstname: this.firstname?.value,
      lastname: this.lastname?.value,
      username: this.username?.value,
      email: this.email?.value,
      password: this.password?.value
    };
  
    this.http.post('http://localhost:3000/registration', formData).subscribe(
      response => {
        console.log('Registration successful');
        this.registrationForm.reset();
      },
      error => {
        console.log('Registration failed');
      }
    );
  }

}

