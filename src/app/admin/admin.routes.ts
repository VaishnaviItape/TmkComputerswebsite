import { Routes } from "@angular/router";
import { Dashboard } from "../components/dashboard/dashboard";
import { AdminLayout } from "./layouts/admin-layout/admin-layout";



export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
    //   { path: 'users', component: UsersComponent },
    ],
  },
];