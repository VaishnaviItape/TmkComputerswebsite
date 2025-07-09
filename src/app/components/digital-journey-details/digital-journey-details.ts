import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-digital-journey-details',
  imports: [],
  templateUrl: './digital-journey-details.html',
  styleUrl: './digital-journey-details.css'
})
export class DigitalJourneyDetails {
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

   constructor(private route: ActivatedRoute) {}
}
