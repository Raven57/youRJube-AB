import { WorkComponent } from './work/work.component';
import { AdvertiseComponent } from './advertise/advertise.component';
import { TermsComponent } from './terms/terms.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TrendingPageComponent } from './trending-page/trending-page.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { PremiumPageComponent } from './premium-page/premium-page.component';
import { VideoPageComponent } from './video-page/video-page.component';
const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'upload', component: UploadPageComponent },
  { path: 'video', component: VideoPageComponent },
  {path : 'premium', component: PremiumPageComponent},
  { path: 'trending', component: TrendingPageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'work', component: WorkComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'adv', component: AdvertiseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
