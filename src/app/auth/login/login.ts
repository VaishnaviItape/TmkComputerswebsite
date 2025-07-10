
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Good to include for ngIf, etc.
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink], // Add CommonModule if needed
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginData = { username: '', password: '' };
  users: any[] = [];
  errorMessage = '';
  isLoading = false;

 constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('public/data/user.json').subscribe({
      next: (data) => (this.users = data),
      error: (err) => {
        console.error('Failed to load user.json', err);
        this.users = [];
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    setTimeout(() => {
      const user = this.users.find(
        u =>
          u.username === this.loginData.username &&
          u.password === this.loginData.password
      );

      if (user) {
        // alert('Login successful');
        // console.log('✅ Login Success:', user);
         this.router.navigate(['/admin/dashboard']); // ✅ Redirect
      } else {
        this.errorMessage = 'Invalid username or password';
      }

      this.isLoading = false;
    }, 1000);
  }
}
