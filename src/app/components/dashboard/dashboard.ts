import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  totalVisitors = 0;
  totalCompanies = 0;
  totalClients = 0;
  inquiriesData: any[] = [];
  latestApplicants: any[] = [];
  chartInstance: any;
  isChartLoading = true;

  constructor(
    private api: ApiService,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
    this.totalVisitors = parseInt(localStorage.getItem('totalVisitors') || '0', 10);
    this.getTotalCompanies();
    this.getTotalClients();
    this.getInquiriesData();
    this.getLatestApplicants();
  }
  getLatestApplicants() {
    this.api.getDataApi('api/Career').subscribe((res: any[]) => {
      this.latestApplicants = res.slice(-5).reverse();
    });
  }
  getTotalCompanies() {
    this.api.getDataApi('api/Company').subscribe((data: any[]) => {
      this.totalCompanies = data.length;
    });
  }

  getTotalClients() {
    this.api.getDataApi('api/Company').subscribe((data: any[]) => {
      this.totalClients = data.length;
    });
  }
  goToCareer() {
    this.router.navigate(['/admin/career']);
  }
  getInquiriesData() {
    this.isChartLoading = true;
    this.api.getDataApi('api/ContactUs').subscribe((allInquiries: any[]) => {
      const companyCounts: { [key: string]: number } = {};
      allInquiries.forEach((inquiry: any) => {
        const companyName = inquiry.companyCode || 'Unknown';
        companyCounts[companyName] = (companyCounts[companyName] || 0) + 1;
      });

      this.inquiriesData = Object.entries(companyCounts)
        .map(([company, count]) => ({ company, count }));

      // Hide loader, let Angular update DOM, then render chart
      this.isChartLoading = false;

      this.ngZone.onStable.subscribe(() => {
        this.renderPieChart();
      });
    });
  }

  renderPieChart() {
    const ctx = document.getElementById('inquiriesPieChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.inquiriesData.map(item => item.company),
        datasets: [{
          data: this.inquiriesData.map(item => item.count),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0']
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false
      }
    });
  }
}
