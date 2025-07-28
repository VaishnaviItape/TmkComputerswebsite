import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-contactus-master',
  imports: [CommonModule],
  templateUrl: './contactus-master.component.html',
  styleUrls: ['./contactus-master.component.css']
})
export class ContactusMasterComponent implements OnInit {

  formTitle = "Contact Us Master"
  apiKey: string = 'api/ContactUs';
  contactList: any = [];
  http: any;

  constructor(private api: ApiService) {

  }

  ngOnInit() {
    this.getData();
  }

  edit(item: any): void {
    alert('Edit clicked: ' + item.description);
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

  getData() {
    this.api.getDataApi(this.apiKey).subscribe((res: any) => {
      this.contactList = res;
    })
  }
}


