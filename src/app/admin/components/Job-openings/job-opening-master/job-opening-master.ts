import { Component } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { JobOpeningDrawer } from '../job-opening-drawer/job-opening-drawer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-opening-master',
  imports: [JobOpeningDrawer, CommonModule, FormsModule],
  templateUrl: './job-opening-master.html',
  styleUrl: './job-opening-master.css',
})
export class JobOpeningMaster {
  formTitle = 'Job Openings Master';
  drawerTitle = 'Add New Job Opening';
  drawerVisible = false;
  jobList: any[] = [];
  selectedJob: any = null;

  Math = Math;
  page = 1;
  pageSize = 10;
  totalRecords = 0;
  totalPages = 0;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.api.getDataApi('api/JobOpening/all').subscribe((res: any[]) => {
      this.jobList = res;
      this.totalRecords = this.jobList.length;
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    });
  }

  getPaginatedJobs() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.jobList.slice(startIndex, endIndex);
  }

  setPage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
    }
  }

  onPageSizeChange(event: any) {
    this.pageSize = Number(event.target.value);
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    this.page = 1;
  }

  addJob(): void {
    this.drawerTitle = 'Add New Job Opening';
    this.selectedJob = null; // new job
    this.drawerVisible = true;
  }

  edit(item: any): void {
    this.drawerTitle = 'Edit Job Opening';
    this.selectedJob = { ...item }; // pass copy to drawer
    this.drawerVisible = true;
  }

  delete(item: any): void {
    const token = localStorage.getItem('authToken'); // or however you store token

    Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the job permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteDataApi(`api/JobOpening/delete`, item.id, token).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Job has been deleted.', 'success');
            this.getData();
          },
          error: (err) => {
            Swal.fire('Error', err?.message || 'Failed to delete', 'error');
          },
        });
      }
    });
  }

  closeDrawer(): void {
    this.drawerVisible = false;
    this.getData();
  }

  closeCallback = () => this.closeDrawer();
}
