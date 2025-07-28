import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { CareerDetails } from './components/career-details/career-details';
import { ServiceDetails } from './components/service-details/service-details';
import { DigitalJourneyDetails } from './components/digital-journey-details/digital-journey-details';
import { Career } from './components/career/career';
import { AboutUs } from './components/about-us/about-us';
import { Login } from './auth/login/login';
import { CareerThankYouComponent } from './components/career-thank-you/career-thank-you.component';

export const routes: Routes = [



    { path: 'login', component: Login },
    { path: '', component: Home },
    { path: 'career-details', component: CareerDetails },
    { path: 'service-details/:id', component: ServiceDetails },
    { path: 'digital-journey-details/:id', component: DigitalJourneyDetails },
    { path: 'career', component: Career },
    { path: 'about-us', component: AboutUs },
    { path: 'career-thank-you', component: CareerThankYouComponent },

      {
    path: 'about-us',
    redirectTo: '',
    pathMatch: 'full'
  },
     {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((m) => m.adminRoutes),
  },
     { path: '**', redirectTo: '' }

];
