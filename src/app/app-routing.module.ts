import { PlaylistPageComponent } from './playlist-page/playlist-page.component';
import { SubscribePageComponent } from './subscribe-page/subscribe-page.component';
import { ChannelPageComponent } from './channel-page/channel-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
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
  { path: '', component: HomePageComponent },
  { path: 'search/:keyword', component: SearchPageComponent },
  { path: 'upload', component: UploadPageComponent },
  { path: 'video/:videoid', component: VideoPageComponent },
  {path : 'premium', component: PremiumPageComponent},
  { path: 'trending', component: TrendingPageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'work', component: WorkComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'adv', component: AdvertiseComponent },
  { path: 'categories/:categoryid', component: CategoryPageComponent },
  { path: 'playlists/:playlistid', component: PlaylistPageComponent },
  { path: 'channel/:userid', component: ChannelPageComponent },
  { path: 'subscribed', component: SubscribePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
