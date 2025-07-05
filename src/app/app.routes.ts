import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { CareerDetails } from './components/career-details/career-details';
import { ServiceDetails } from './components/service-details/service-details';

export const routes: Routes = [

    { path: '', component: Home },
    { path: 'career-details', component: CareerDetails },
    { path: 'service-details/:id', component: ServiceDetails },
    
    

];
