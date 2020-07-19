import { UploadPageComponent } from './upload-page/upload-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
// import { UploadPageComponent } from './search-page/search-page.component';

import { VideoPageComponent } from './video-page/video-page.component';
const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'upload', component: UploadPageComponent },
  // { path: 'video/:id', component: VideoPageComponent },
  { path: 'video', component: VideoPageComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
