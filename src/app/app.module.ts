// import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFireStorage } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
const firebaseConfig = {
  apiKey: 'AIzaSyA_23fgWdV2mmzIU56d9f-TvVcWvz-WOzs',
  authDomain: 'tpa-webab.firebaseapp.com',
  databaseURL: 'https://tpa-webab.firebaseio.com',
  projectId: 'tpa-webab',
  storageBucket: 'tpa-webab.appspot.com',
  messagingSenderId: '45833795861',
  appId: '1:45833795861:web:7c789e3896101c906a111c'
};

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
import { CommentBubbleComponent } from './comment-bubble/comment-bubble.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { DropzoneDirective } from './dropzone.directive';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

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
      VideoDescriptionComponent,
      CommentBubbleComponent,
      CommentSectionComponent,
      VideoCardComponent,
      UploadPageComponent,
      DropzoneDirective,
      UploadTaskComponent

   ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
      BrowserModule,
      AppRoutingModule,
      SocialLoginModule,
      ServiceWorkerModule.register('ngsw-worker.js'),
      GraphQLModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatVideoModule
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

