import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {
  isSidebarCollapsed = false;
  constructor(private router: Router) { }
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  logout() {
    localStorage.removeItem('authToken'); // or sessionStorage.removeItem('token');
    this.router.navigate(['/login']); // Redirect to login
  }
    switchToWebsite() {
    // If website is part of same Angular app
    this.router.navigate(['/']); 
  }
}
