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

import { SidebarComponent } from './sidebar/sidebar.component';
import { PremiumPageComponent } from './premium-page/premium-page.component';
import { NgUserDirective } from './ng-user.directive';
import { SearchItemComponent } from './search-item/search-item.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { TrendingPageComponent } from './trending-page/trending-page.component';
import { PlaylistItemComponent } from './playlist-item/playlist-item.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PlaylistPageComponent } from './playlist-page/playlist-page.component';
import { VideoPageComponent } from './video-page/video-page.component';
import { ChannelItemComponent } from './channel-item/channel-item.component';
import { ChannelPageComponent } from './channel-page/channel-page.component';
import { VideoDescriptionComponent } from './video-description/video-description.component';

@NgModule({
   declarations: [
      AppComponent,
      SidebarComponent,
      PremiumPageComponent,
      NgUserDirective,
      SearchItemComponent,
      SearchPageComponent,
      TrendingPageComponent,
      PlaylistItemComponent,
      HomePageComponent,
      PlaylistPageComponent,
      VideoPageComponent,
      ChannelItemComponent,
      ChannelPageComponent,
      VideoDescriptionComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      SocialLoginModule,
      ServiceWorkerModule.register('ngsw-worker.js')
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

