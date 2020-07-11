import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';

// import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
// import { faCircle, faSquare } from '@fortawesome/free-solid-svg-icons';
// import { faCircle as farCircle, faSquare as farSquare } from '@fortawesome/free-regular-svg-icons';
// import { faStackOverflow, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '561081849975-f5okbpgpd60opjp659mak64kb0sk21hm.apps.googleusercontent.com'
          ),
        }
      ],
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(library: FaIconLibrary) {
  //   library.addIcons(faCircle, faSquare, farCircle, farSquare
  //     , faStackOverflow, faGithub, faMedium);
  // }
}

