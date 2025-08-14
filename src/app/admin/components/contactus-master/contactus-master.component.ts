import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../../../service/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactus-master',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contactus-master.component.html',
  styleUrls: ['./contactus-master.component.css']
})
export class ContactusMasterComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;
  totalPages: number = 0;
  formTitle = "Contact Us Master"
  apiKey: string = 'api/ContactUs';
  contactList: any = [];
  companyList: any[] = [];
  selectedCompanyCode: string = '';

  http: any;
  Math = Math;
  constructor(private api: ApiService) {

  }

  ngOnInit() {
    this.getData();
    this.getCompanies();
  }

  edit(item: any): void {
    alert('Edit clicked: ' + item.description);
  }
  getCompanies() {
    this.api.getDataApi('api/Company').subscribe((res: any[]) => {
      this.companyList = res;
    });
  }
  getData() {
    this.api.getDataApi(this.apiKey).subscribe((res: any[]) => {
      this.contactList = res;
      this.totalRecords = this.contactList.length;
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    });
  }
  onPageSizeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.setPageSize(Number(selectElement.value));
  }
  updatePagination() {
    this.totalRecords = this.contactList.length;
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    this.page = 1;
  }

  searchByCompany() {
    if (!this.selectedCompanyCode) {
      this.getData();
      return;
    }

    const url = `api/ContactUs/company/${this.selectedCompanyCode}`;
    this.api.getDataApi(url).subscribe((res: any[]) => {
      this.contactList = res;
      this.updatePagination();
    });
  }
  setPageSize(size: number) {
    this.pageSize = size;
    this.page = 1;
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }
  clearFilter() {
    this.selectedCompanyCode = '';
    this.getData(); // reload all data
  }

  getPaginatedContacts() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.contactList.slice(startIndex, endIndex);
  }

  setPage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
    }
  }

  deleteContact(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteUrl = `http://amkore7-001-site1.ltempurl.com/api/ContactUs/${id}`;
        this.api.deletedataDataApi(deleteUrl).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Contact has been deleted.', 'success');
            this.getData();
          },
          error: (err: any) => {
            Swal.fire('Error!', 'Failed to delete contact.', 'error');
            console.error(err);
          }
        });
      }
    });
  }
  drawerTitle = "Add New picture";
  // drawerData: CustmoerCategoryData = new CustmoerCategoryData();
  drawervisible = false;
  add() {
    this.drawerTitle = "Add new Picture";
    this.drawervisible = true;
  }
  drawerClose(): void {
    this.drawervisible = false;
  }

  closeCallback = () => {
    this.drawerClose();
  };


}


