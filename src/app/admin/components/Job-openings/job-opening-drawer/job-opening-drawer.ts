import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-opening-drawer',
  imports: [CommonModule, FormsModule],
  templateUrl: './job-opening-drawer.html',
  styleUrl: './job-opening-drawer.css',
})
export class JobOpeningDrawer {
  @Input() drawerVisible: boolean = false;
  @Input() drawerClose: () => void = () => {};

  jobData: any = {
    id: 0,
    jobTitle: '',
    department: '',
    location: '',
    employmentType: '',
    experienceRequired: '',
    salaryRange: '',
    postedDate: '',
    closingDate: '',
    jobDescription: '',
    numberOfOpenings: 1,
    qualification: '',
  };

  constructor(private api: ApiService) {}

  save(form: any): void {
    if (!this.jobData.jobTitle.trim()) {
      Swal.fire('Error', 'Job title is required', 'error');
      return;
    }

    const formData = new FormData();
    for (const key in this.jobData) {
      if (this.jobData[key] !== null) {
        formData.append(key, this.jobData[key]);
      }
    }

    this.api.postDataApi('api/JobOpening/create', formData).subscribe({
      next: () => {
        Swal.fire('Success', 'Job opening saved successfully', 'success');
        this.drawerClose();
        form.resetForm();
      },
      error: (err) => {
        Swal.fire('Error', err?.message || 'Error saving job opening', 'error');
      },
    });
  }

  clearForm(form: any): void {
    form.resetForm();
    this.jobData = {};
  }
}
