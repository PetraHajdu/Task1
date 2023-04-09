import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  
  loginForm!: FormGroup;

  users: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.http.get('http://localhost:3000/users').subscribe(users => this.users = users);

  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  
    const username = this.username?.value;
    const password = this.password?.value;
    
    if (Array.isArray(this.users)) {
      const user = this.users.find((u: any) => u.username === username && u.password === password);
  
      if (user) {
        console.log('Login successful');
      } else {
        console.log('Login failed');
      }
    } else {
      console.log('No users found');
    }
  }
  

}

