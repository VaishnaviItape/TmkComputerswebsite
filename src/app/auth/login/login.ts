
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Good to include for ngIf, etc.
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonModule], // Add CommonModule if needed
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginData = { username: '', password: '' };
  users: any[] = [];
  errorMessage = '';
  isLoading = false;
    loginForm: FormGroup;

 constructor(private http: HttpClient,private router: Router,    private fb: FormBuilder,
    private api: ApiService,) {
      this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
 }

  ngOnInit(): void {
    // this.http.get<any[]>('public/data/user.json').subscribe({
    //   next: (data) => (this.users = data),
    //   error: (err) => {
    //     console.error('Failed to load user.json', err);
    //     this.users = [];
    //   }
    // });
  }


    onSubmit() {
    if (this.loginForm.invalid) {
      Swal.fire('Warning!', 'Please enter valid username and password', 'warning');
      return;
    }

    const credentials = this.loginForm.value;

    this.api.postDataApi('api/Auth/login', credentials).subscribe({
      next: (res: any) => {
        // ✅ Store the token (adjust key based on your response structure)
        const token = res?.token?.result || res?.token || res?.result;
        if (token) {
          sessionStorage.setItem('authToken', token);
          Swal.fire('Success!', 'Login Successful', 'success');
          this.router.navigate(['/admin/dashboard']);
          this.loginForm.reset();
        } else {
          Swal.fire('Error!', 'Token not found in response!', 'error');
        }
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'Login failed. Please try again.';
        Swal.fire('Error!', errorMessage, 'error');
      }
    });
  }

  // onSubmit(form: NgForm) {
  //   if (form.invalid) return;

  //   this.isLoading = true;
  //   this.errorMessage = '';

  //   setTimeout(() => {
  //     const user = this.users.find(
  //       u =>
  //         u.username === this.loginData.username &&
  //         u.password === this.loginData.password
  //     );

  //     if (user) {
  //        this.router.navigate(['/admin/dashboard']); // ✅ Redirect
  //     } else {
  //       this.errorMessage = 'Invalid username or password';
  //     }

  //     this.isLoading = false;
  //   }, 1000);
  // }
}
