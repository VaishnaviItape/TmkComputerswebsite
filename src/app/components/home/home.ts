import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ObserveSectionDirective } from '../../service/observe-section.directive';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThemeService } from '../../service/theme.service';
import Swal from 'sweetalert2';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-home',
  imports: [ CommonModule, ObserveSectionDirective, ReactiveFormsModule, FormsModule, RouterModule],
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

  servicesList: string[] = [
    'Epoxy Flooring and Coating',
    'Epoxy Coving & Pencil coving',
    'Polyurethane Flooring',
    'Polyurethane Coating',
    'Car Parking Flooring',
    'Anti Corrosion Coatings',
    'Anti Fungal wall Paints',
    'Under Water tank Coatings'
  ];

  activeSection = 'home';
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, public themeService: ThemeService, private api: ApiService,) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      service: ['', Validators.required],
      // service: this.fb.array([], Validators.required),
      message: ['', Validators.required],
      companyId: [1],
      companyCode: ['tmk computers'],
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      Swal.fire('Error', 'Please fill all required fields correctly.', 'error');
      return;
    }
    const rawValue = this.contactForm.value;

    // const payload = {
    //   ...rawValue,
    //   service: rawValue.service.join(', ') // ✅ create string without extra quotes
    // };
    this.api.postDataApi('api/ContactUs/create', rawValue).subscribe({
      next: () => {
        Swal.fire('Success', 'Message sent successfully!', 'success');
        this.contactForm.reset();
      },
      error: (err: any) => {
        const message = err?.error?.message || 'Something went wrong.';
        Swal.fire('Error', message, 'error');
      }
    });
  }

  onSectionChange(sectionId: string) {
    this.activeSection = sectionId;
  }


  selectedServices: string[] = [];

  get serviceArray(): FormArray {
    return this.contactForm.get('service') as FormArray;
  }

  onCheckboxChange(event: any): void {
    const serviceArray = this.serviceArray;
    const value = event.target.value;

    if (event.target.checked) {
      serviceArray.push(this.fb.control(value));
    } else {
      const index = serviceArray.controls.findIndex(x => x.value === value);
      if (index >= 0) {
        serviceArray.removeAt(index);
      }
    }
  }
}
