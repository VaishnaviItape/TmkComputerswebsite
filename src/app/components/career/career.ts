import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../service/theme.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-career',
  imports: [RouterModule, CommonModule],
  templateUrl: './career.html',
  styleUrl: './career.css'
})
export class Career {
  constructor(private fb: FormBuilder, public themeService: ThemeService) { }

  activeSection = 'career';

  onSectionChange(sectionId: string) {
    this.activeSection = sectionId;
  }
}
