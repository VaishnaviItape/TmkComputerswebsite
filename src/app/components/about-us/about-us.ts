import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../service/theme.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-about-us',
  imports: [RouterModule, CommonModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {
  constructor(private fb: FormBuilder, public themeService: ThemeService) { }

  activeSection = 'about';

  onSectionChange(sectionId: string) {
    this.activeSection = sectionId;
  }
}
