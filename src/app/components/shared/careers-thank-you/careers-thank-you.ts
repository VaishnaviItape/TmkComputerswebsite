import { Component } from '@angular/core';
import { ThemeService } from '../../../service/theme.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-careers-thank-you',
   imports: [RouterModule, CommonModule],
  templateUrl: './careers-thank-you.html',
  styleUrl: './careers-thank-you.css'
})
export class CareersThankYou {

  constructor(private fb: FormBuilder, public themeService: ThemeService, private router: Router) { }

  ngOnInit() {
  }

  activeSection = 'Career';

  onSectionChange(sectionId: string) {
    this.activeSection = sectionId;
  }

  goToCareer() {
    this.router.navigate(['/']);
  }
}
