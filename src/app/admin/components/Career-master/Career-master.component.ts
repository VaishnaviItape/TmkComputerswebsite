import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Career-master',
  imports: [CommonModule],
  templateUrl: './Career-master.component.html',
  styleUrls: ['./Career-master.component.css']
})
export class CareerMasterComponent implements OnInit {

  formTitle = "career Master"
  apiKey: string = 'api/Career';
  careertList: any = [];
  http: any;
  page = 1;
  pageSize = 10;
  totalRecords = 0;
  totalPages = 0;
  constructor(private api: ApiService) {

  }

  ngOnInit() {
    this.getData();
  }

  edit(item: any): void {
    alert('Edit clicked: ' + item.description);
  }

  deleteCareer(id: number): void {
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

  getData() {
    this.api.getDataApi(this.apiKey).subscribe((res: any) => {
      this.careertList = res;
      this.totalRecords = this.careertList.length;
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    })
  }
  Math=Math;
  getPaginatedCareers() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.careertList.slice(startIndex, endIndex);
  }

  setPage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
    }
  }

  onPageSizeChange(event: any) {
    this.pageSize = Number(event.target.value);
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    this.page = 1; // Reset to first page
  }
}
