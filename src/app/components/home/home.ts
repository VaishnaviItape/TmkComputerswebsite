import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ObserveSectionDirective } from '../../service/observe-section.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, CommonModule, ObserveSectionDirective, ReactiveFormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  protected title = 'TMK_COMPUTERS_MAIN';
  journeyItems = [
    {
      icon: 'assets/Star.svg',
      title: 'Expertise Across Industries',
      description: 'We deliver proven solutions for all business types, from startups to enterprises.'
    },
    {
      icon: 'assets/Idea.svg',
      title: 'End-to-End Services',
      description: 'All your digital needs handled under one roof.'
    },
    {
      icon: 'assets/Cursor.svg',
      title: 'Creative & Strategic Thinking',
      description: 'We mix design flair with smart strategies that work.'
    },
    {
      icon: 'assets/Mobile.svg',
      title: 'Results-Driven Approach',
      description: 'We focus on outcomes that grow your business.'
    },
    {
      icon: 'assets/Thunder.svg',
      title: 'Cutting-Edge Technology',
      description: 'We use the latest tools to keep you ahead of the curve.'
    },
    {
      icon: 'assets/Utility.svg',
      title: 'Client-Centric Process',
      description: 'Your goals guide every step we take.'
    }
  ];


  services = [
    {
      id: 'it-consultation',
      icon: 'assets/pc.svg',
      title: 'IT Consultation',
      description: 'Expert advice to align your IT strategy with business goals. We optimize your infrastructure for efficiency and growth.'
    },
    {
      id: 'market-research',
      icon: 'assets/switch.svg',
      title: 'Market Research',
      description: 'Data-driven insights into your audience. Make informed decisions and stay ahead of competitors.'
    },
    {
      id: 'startup-consultation',
      icon: 'assets/rocketIcon.svg',
      title: 'Startup Consultation',
      description: 'Turn your idea into a viable business with planning, product strategy, and go-to-market support.'
    },
    {
      id: 'private-equity',
      icon: 'assets/money.svg',
      title: 'Private Equity & Venture Capital',
      description: 'Get connected with the right investors. We help you pitch and scale.'
    },
    {
      id: 'crowdfunding',
      icon: 'assets/crowd.svg',
      title: 'Crowdfunding Services',
      description: 'Launch confidently. From strategy to outreach, we guide your campaign.'
    },
    {
      id: 'media-streaming',
      icon: 'assets/media.svg',
      title: 'Media & Streaming Platform',
      description: 'Create secure, scalable platforms for video, audio, or live content.'
    }
  ];

  activeSection = 'home';
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, public themeService: ThemeService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      service: ['', Validators.required],
      company: [''],
      message: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      alert('Form Submitted Successfully!');
      this.contactForm.reset();
    } else {
      alert('Please fill all required fields.');
    }
  }



  onSectionChange(sectionId: string) {
    this.activeSection = sectionId;
  }
}
