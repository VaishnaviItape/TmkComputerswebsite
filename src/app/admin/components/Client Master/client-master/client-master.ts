import { Component } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { ClientDrawer } from '../client-drawer/client-drawer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-master',
  imports: [ClientDrawer, CommonModule, FormsModule],
  templateUrl: './client-master.html',
  styleUrl: './client-master.css'
})
export class ClientMaster {
  formTitle = 'Client Master';
  drawerTitle = 'Add New Client';
  drawerVisible = false;
  clientList: any[] = [];
  Math = Math;
  // Pagination variables
  page = 1;
  pageSize = 10;
  totalRecords = 0;
  totalPages = 0;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.api.getDataApi('api/Client').subscribe((res: any[]) => {
      this.clientList = res.map(item => ({ ...item, showPassword: false }));
      this.totalRecords = this.clientList.length;
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    });
  }

  // Pagination logic
  getPaginatedClients() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.clientList.slice(startIndex, endIndex);
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

  addClient(): void {
    this.drawerTitle = 'Add New Client';
    this.drawerVisible = true;
  }

  edit(item: any): void {
    alert('Edit: ' + item.companyName);
  }

  delete(item: any): void {
    const index = this.clientList.indexOf(item);
    if (index !== -1) {
      this.clientList.splice(index, 1);
      this.totalRecords = this.clientList.length;
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
