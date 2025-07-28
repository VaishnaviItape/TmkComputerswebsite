import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ThemeService } from '../../service/theme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-career-thank-you',
   imports: [RouterModule, CommonModule],
  templateUrl: './career-thank-you.component.html',
  styleUrls: ['./career-thank-you.component.css']
})
export class CareerThankYouComponent implements OnInit {

 constructor(private fb: FormBuilder, public themeService: ThemeService) { }

  ngOnInit() {
  }

   activeSection = 'Career';

  onSectionChange(sectionId: string) {
    this.activeSection = sectionId;
  }

}
