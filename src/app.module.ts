
// Imports
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Auth Provider
import { AUTH_PROVIDERS } from 'angular2-jwt';

// Declarations
import { AuthGuard } from './common/auth.guard'
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact }  from './pages/contact/contact';
import { App } from "./app";

// Routing Import
import { routes } from "./app.routes";

@NgModule({
    // Define the ropot component
    bootstrap: [ App ],

    //Define the other components in our module
    declarations: [
        App,
        Home,
        About,
        Contact
    ],

    // Define the services imported by the app
    imports: [
        HttpModule,
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],

    // Define Providers
   providers: [
       AuthGuard, ...AUTH_PROVIDERS
   ]
})
export class AppModule { }

