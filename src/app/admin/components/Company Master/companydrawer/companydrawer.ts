import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-companydrawer',
  imports: [CommonModule, FormsModule],
  templateUrl: './companydrawer.html',
  styleUrl: './companydrawer.css'
})
export class Companydrawer {

  @Input() drawerVisible: boolean = false;
  @Input() drawerClose: () => void = () => {};
  @Input() editData: any = null;

  clientData: any = {
    id: 0,
    name: '',
    email: '',
    websiteUrl: '',
    apiKey: '',
    isActive: true,
    companyCode: '',
    createdAt: ''
  };

  constructor(private api: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editData'] && this.editData) {
      this.clientData = { ...this.editData };
    } else if (!this.editData) {
      this.clearForm();
    }
  }

  // save(form: any): void {
  //   if (!this.clientData.name.trim()) {
  //     Swal.fire('Error', 'Name is required', 'error');
  //     return;
  //   }

  //   if (this.clientData.id) {
  //     // Update
  //     this.api.updateDataApi(`api/Client/${this.clientData.id}`, this.clientData).subscribe({
  //       next: () => {
  //         Swal.fire('Success', 'Client updated successfully', 'success');
  //         this.drawerClose();
  //       },
  //       error: (err) => {
  //         Swal.fire('Error', err?.message || 'Error updating client', 'error');
  //       }
  //     });
  //   } else {
  //     // Create
  //     this.api.postDataApi('api/Client/create', this.clientData).subscribe({
  //       next: () => {
  //         Swal.fire('Success', 'Client created successfully', 'success');
  //         this.drawerClose();
  //       },
  //       error: (err) => {
  //         Swal.fire('Error', err?.message || 'Error creating client', 'error');
  //       }
  //     });
  //   }
  // }
save(form: any): void {
  if (!this.clientData.name.trim()) {
    Swal.fire('Error', 'Name is required', 'error');
    return;
  }

  if (this.clientData.id) {
    // Update existing client
    this.api.updateDataApi('api/Company', this.clientData, this.clientData.id).subscribe({
      next: () => {
        Swal.fire('Success', 'Client updated successfully', 'success');
        this.drawerClose();
      },
      error: (err) => {
        Swal.fire('Error', err?.message || 'Error updating client', 'error');
      }
    });
  } else {
    // Create new client
    this.api.postDataApi('api/Company', this.clientData).subscribe({
      next: () => {
        Swal.fire('Success', 'Client created successfully', 'success');
        this.drawerClose();
      },
      error: (err) => {
        Swal.fire('Error', err?.message || 'Error creating client', 'error');
      }
    });
  }
}

  clearForm(): void {
    this.clientData = {
      id: 0,
      name: '',
      email: '',
      websiteUrl: '',
      apiKey: '',
      isActive: true,
      companyCode: '',
      createdAt: ''
    };
  }
}
