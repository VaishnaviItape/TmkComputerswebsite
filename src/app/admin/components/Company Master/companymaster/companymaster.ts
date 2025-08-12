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

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.api.getDataApi('api/Company').subscribe((res: any[]) => {
      this.clientList = res;
    });
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
