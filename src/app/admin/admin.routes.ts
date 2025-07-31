import { Routes } from "@angular/router";
import { Dashboard } from "../components/dashboard/dashboard";
import { AdminLayout } from "./layouts/admin-layout/admin-layout";
import { AddHome } from "./components/add-home/add-home";
import { ContactusMasterComponent } from "./components/contactus-master/contactus-master.component";
import { CareerMasterComponent } from "./components/Career-master/Career-master.component";
import { ClientMaster } from "./components/Client Master/client-master/client-master";



export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'Home', component: AddHome },
      { path: 'contact-us', component: ContactusMasterComponent },
      { path: 'client', component: ClientMaster },
      { path: 'career', component: CareerMasterComponent },
    ],
  },
];
