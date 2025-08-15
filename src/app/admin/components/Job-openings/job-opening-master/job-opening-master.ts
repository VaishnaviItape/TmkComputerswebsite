import { Component } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { JobOpeningDrawer } from '../job-opening-drawer/job-opening-drawer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  Math = Math;
  page = 1;
  pageSize = 10;
  totalRecords = 0;
  totalPages = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.api.getDataApi('api/JobOpening').subscribe((res: any[]) => {
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
    this.drawerVisible = true;
  }

  edit(item: any): void {
    alert('Edit Job: ' + item.jobTitle);
  }

  delete(item: any): void {
    const index = this.jobList.indexOf(item);
    if (index !== -1) {
      this.jobList.splice(index, 1);
      this.totalRecords = this.jobList.length;
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
      if (this.page > this.totalPages) this.page = this.totalPages || 1;
    }
  }

  closeDrawer(): void {
    this.drawerVisible = false;
    this.getData();
  }

  closeCallback = () => this.closeDrawer();
}
