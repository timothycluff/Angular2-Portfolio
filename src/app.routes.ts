/**
 * Created by tim.cluff on 4/7/2017.
 */

// Import dependencies
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './login/login';
import { SignUp } from './signup/signup';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { AuthGuard } from './common/auth.guard';

// Define which component should be loaded based on the current URL
export const routes : Routes = [
    { path: '', component: Login },
    { path: 'login', component: Login },
    { path: 'signup', component: SignUp },
    { path: 'home', component: Home, canActivate: [AuthGuard] },
    { path: 'contact', component: Contact },
    { path: 'about', component: About },
    { path: '**', component: Login },
];

