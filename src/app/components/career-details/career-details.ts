import { Component } from '@angular/core';
import { ThemeService } from '../../service/theme.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-career-details',
  imports: [RouterModule, CommonModule],
  templateUrl: './career-details.html',
  styleUrl: './career-details.css'
})
export class CareerDetails {
  constructor(public themeService: ThemeService,private router: Router) { }

  activeSection = 'career';

  onSectionChange(sectionId: string) {
    this.activeSection = sectionId;
  }



  onApply() {
    Swal.fire({
      title: 'Application Submitted!',
      text: 'Thank you for applying at TMK COMPUTERS.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/career-thank-you']);
      }
    });
  }
}
