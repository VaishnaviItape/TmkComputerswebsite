import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class JobOpeningDrawer implements OnChanges {
  @Input() drawerVisible: boolean = false;
  @Input() drawerClose: () => void = () => { };
  @Input() editData: any = null; // parent will pass selected job

  jobData: any = {
    id: 0,
    position: '',
    location: '',
    numberOfPositions: 0,
    experienceText: '',
    responsibilities: '',
    requiredSkills: '',
    eligibility: '',
    isActive: true,
  };

  constructor(private api: ApiService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editData'] && this.editData) {
      // edit mode → prefill with selected job
      this.jobData = { ...this.editData };
    } else if (changes['drawerVisible'] && !this.drawerVisible) {
      // reset when drawer closes
      this.resetForm();
    }
  }

  save(form: any): void {
    if (!this.jobData.position.trim()) {
      Swal.fire('Error', 'Position is required', 'error');
      return;
    }

    if (this.jobData.id && this.jobData.id > 0) {
      // UPDATE
      this.api.updateDataApi('api/JobOpening/update', this.jobData, this.jobData.id).subscribe({
        next: () => {
          Swal.fire('Success', 'Job updated successfully', 'success');
          this.drawerClose();
        },
        error: (err) => {
          Swal.fire('Error', err?.message || 'Error updating job', 'error');
        },
      });
    } else {
      // CREATE
      this.api.postDataApi('api/JobOpening/create', this.jobData).subscribe({
        next: () => {
          Swal.fire('Success', 'Job created successfully', 'success');
          this.drawerClose();
          form.resetForm();
        },
        error: (err) => {
          Swal.fire('Error', err?.message || 'Error saving job', 'error');
        },
      });
    }
  }

  cancel(): void {
    this.drawerClose();
  }

  private resetForm() {
    this.jobData = {
      id: 0,
      position: '',
      location: '',
      numberOfPositions: 0,
      experienceText: '',
      responsibilities: '',
      requiredSkills: '',
      eligibility: '',
      isActive: true,
    };
  }
}
