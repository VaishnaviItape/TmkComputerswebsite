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
      id: 'expertise',
      icon: 'assets/Star.svg',
      title: 'Expertise Across Industries',
      description: 'We’ve successfully delivered technology and infrastructure solutions to clients across diverse sectors — from manufacturing and automotive to pharmaceuticals, logistics, and beyond.'
    },
    {
      id: 'end-to-end',
      icon: 'assets/Idea.svg',
      title: 'End-to-End Services',
      description: 'We provide comprehensive, start-to-finish solutions that eliminate the hassle of dealing with multiple vendors. From the initial consultation and planning to execution and post-installation support, we manage every phase of your project with precision and accountability.'
    },
    {
      id: 'creative-strategy',
      icon: 'assets/Cursor.svg',
      title: 'Creative & Strategic Thinking',
      description: 'We don’t just deliver solutions — we create smart strategies backed by bold ideas. Our team combines creative design thinking with deep industry knowledge to craft solutions that are not only visually compelling but also strategically effective.'
    },
    {
      id: 'results-driven',
      icon: 'assets/Mobile.svg',
      title: 'Results-Driven Approach',
      description: 'We believe in outcomes, not just outputs. Every project we take on is executed with one goal in mind: to deliver measurable results that grow your business..'
    },
    {
      id: 'cutting-edge',
      icon: 'assets/Thunder.svg',
      title: 'Cutting-Edge Technology',
      description: 'We harness the power of the latest tools, platforms, and innovations to keep your business ahead of the curve. Whether its industrial automation, advanced flooring materials, IoT-ready infrastructure, or secure cloud solutions — we integrate next-gen technology into every project we deliver.'
    },
    {
      id: 'client-centric',
      icon: 'assets/Utility.svg',
      title: 'Client-Centric Process',
      description: 'At the heart of everything we do is you — the client. We take the time to understand your unique needs, challenges, and goals before proposing solutions.'
    }
  ];

  services = [
    {
      id: 'Digital Marketing',
      icon: 'assets/pc.svg',
      title: 'IT Consultation',
      description: 'Expert advice to align your IT strategy with business goals. We optimize your infrastructure for efficiency and growth.'
    },
    {
      id: 'Website Development',
      icon: 'assets/switch.svg',
      title: 'Market Research',
      description: 'Data-driven insights into your audience. Make informed decisions and stay ahead of competitors.'
    },
    {
      id: 'Custom Software Development',
      icon: 'assets/rocketIcon.svg',
      title: 'Startup Consultation',
      description: 'Turn your idea into a viable business with planning, product strategy, and go-to-market support.'
    },
    {
      id: 'Mobile App Development',
      icon: 'assets/money.svg',
      title: 'Private Equity & Venture Capital',
      description: 'Get connected with the right investors. We help you pitch and scale.'
    },
    // {
    //   id: 'crowdfunding',
    //   icon: 'assets/crowd.svg',
    //   title: 'Crowdfunding Services',
    //   description: 'Launch confidently. From strategy to outreach, we guide your campaign.'
    // },
    // {
    //   id: 'media-streaming',
    //   icon: 'assets/media.svg',
    //   title: 'Media & Streaming Platform',
    //   description: 'Create secure, scalable platforms for video, audio, or live content.'
    // }
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
