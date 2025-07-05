import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-details',
  imports: [],
  templateUrl: './service-details.html',
  styleUrl: './service-details.css'
})
export class ServiceDetails {
 serviceId = '';

  selectedService: any;

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

  constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id') || '';
    this.selectedService = this.services.find(s => s.id === this.serviceId);
  }


}
