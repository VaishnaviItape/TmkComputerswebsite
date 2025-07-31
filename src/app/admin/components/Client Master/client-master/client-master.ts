import { Component } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { ClientDrawer } from '../client-drawer/client-drawer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-master',
  imports: [ClientDrawer, CommonModule,
    FormsModule,],
  templateUrl: './client-master.html',
  styleUrl: './client-master.css'
})
export class ClientMaster {
 formTitle = 'Client Master';
  drawerTitle = 'Add New Client';
  drawerVisible = false;
  clientList: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.api.getDataApi('api/ClientMaster').subscribe((res: any[]) => {
      this.clientList = res.map(item => ({ ...item, showPassword: false }));
    });
  }

  addClient(): void {
    this.drawerTitle = 'Add New Client';
    this.drawerVisible = true;
  }

  edit(item: any): void {
    alert('Edit: ' + item.companyName); // You can use drawer for edit too
  }

  delete(item: any): void {
    const index = this.clientList.indexOf(item);
    if (index !== -1) {
      this.clientList.splice(index, 1);
    }
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  closeCallback = () => this.closeDrawer();
}
