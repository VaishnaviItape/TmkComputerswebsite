import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './service/theme.service';
import { CommonModule } from '@angular/common';
import { ObserveSectionDirective } from './service/observe-section.directive';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 
}
