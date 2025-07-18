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
      title: 'Expertise Across  Industries',
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
      id: 'cutting-edge technology',
      icon: 'assets/Thunder.svg',
      title: 'Cutting-Edge Technology',
      description: 'We harness the power of the latest tools, platforms, and innovations to keep your business ahead of the curve. Whether its industrial automation, advanced flooring materials, IoT-ready infrastructure.'
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
      id: 'Custom software development',
      icon: 'assets/pc.svg',
      title: 'Custom Software Development',
      description: 'We build scalable, secure, and custom software solutions tailored to your business needs, enhancing operational efficiency, automation, and digital transformation with innovative technology and expert coding practices.'
    },
    {
      id: 'Custom  application development',
      icon: 'assets/switch.svg',
      title: 'Custom  Application Development',
      description: 'Create high-performance, user-friendly mobile and web applications customized to your business goals. We design, develop, and deploy apps that streamline your processes and improve user engagement.'
    },
    {
      id: 'Website development',
      icon: 'assets/rocketIcon.svg',
      title: 'Website Development',
      description: 'Get responsive, SEO-optimized, and visually stunning websites designed for performance and lead generation. From static sites to dynamic portals, we develop websites that grow your online presence.'
    },
    {
      id: 'Digital marketing',
      icon: 'assets/money.svg',
      title: 'Digital marketing',
      description: 'Promote your brand online using SEO, social media marketing, Google Ads, and email campaigns. We drive traffic, boost visibility, and convert clicks into loyal customers effectively.'
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
