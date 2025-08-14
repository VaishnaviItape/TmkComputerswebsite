import { Component } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Companydrawer } from '../companydrawer/companydrawer';

@Component({
  selector: 'app-companymaster',
  imports: [Companydrawer, CommonModule, FormsModule],
  templateUrl: './companymaster.html',
  styleUrl: './companymaster.css'
})
export class Companymaster {
  formTitle = 'Company Master';
  drawerTitle = 'Add New Company';
  drawerVisible = false;
  clientList: any[] = [];
  selectedClient: any = null;
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
    this.api.getDataApi('api/Company').subscribe((res: any[]) => {
      this.clientList = res;
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
    this.drawerTitle = 'Add New Company';
    this.selectedClient = null;
    this.drawerVisible = true;
  }

  edit(item: any): void {
    this.drawerTitle = 'Edit Company';
    this.selectedClient = { ...item };
    this.drawerVisible = true;
  }

  delete(item: any): void {
    if (confirm(`Are you sure to delete ${item.name}?`)) {
      this.api.deletedataDataApi(`api/Company/${item.id}`).subscribe(() => {
        this.getData();
      });
    }
  }

  closeDrawer(): void {
    this.drawerVisible = false;
    this.getData();
  }

  closeCallback = () => this.closeDrawer();
}
