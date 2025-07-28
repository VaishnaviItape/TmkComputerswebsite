import { Component } from '@angular/core';
import { ThemeService } from '../../service/theme.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-career-details',
  imports: [RouterModule, CommonModule],
  templateUrl: './career-details.html',
  styleUrl: './career-details.css'
})
export class CareerDetails {
  constructor(public themeService: ThemeService) { }

  activeSection = 'career';

  onSectionChange(sectionId: string) {
    this.activeSection = sectionId;
  }
}
