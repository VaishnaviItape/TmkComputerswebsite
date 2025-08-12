import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-drawer',
  imports: [CommonModule,
    FormsModule,],
  templateUrl: './client-drawer.html',
  styleUrl: './client-drawer.css'
})
export class ClientDrawer {
  @Input() drawerVisible: boolean = false;
  @Input() drawerClose: () => void = () => { };

  clientData: any = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    websiteUrl: '',
    companyCode: '',
    companyName: '',
    companyId: 0
  };

  previewImage: string | ArrayBuffer | null = null;

  constructor(private api: ApiService) { }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.previewImage = reader.result;
      reader.readAsDataURL(file);
      this.clientData.image = file;
    }
  }

  save(form: any): void {
    if (!this.clientData.firstName.trim()) {
      Swal.fire('Error', 'First name is required', 'error');
      return;
    }

    const formData = new FormData();
    for (const key in this.clientData) {
      if (this.clientData[key] !== null) {
        formData.append(key, this.clientData[key]);
      }
    }

    this.api.postDataApi('api/Client/create', formData).subscribe({
      next: () => {
        Swal.fire('Success', 'Client saved successfully', 'success');
        this.drawerClose();
        form.resetForm();
      },
      error: (err) => {
        Swal.fire('Error', err?.message || 'Error saving client', 'error');
      },
    });
  }

  clearForm(form: any): void {
    form.resetForm();
    this.clientData = {};
    this.previewImage = null;
  }
}
