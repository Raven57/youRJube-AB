"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var playlist_page_component_1 = require("./playlist-page/playlist-page.component");
var subscribe_page_component_1 = require("./subscribe-page/subscribe-page.component");
var channel_page_component_1 = require("./channel-page/channel-page.component");
var category_page_component_1 = require("./category-page/category-page.component");
var work_component_1 = require("./work/work.component");
var advertise_component_1 = require("./advertise/advertise.component");
var terms_component_1 = require("./terms/terms.component");
var about_us_component_1 = require("./about-us/about-us.component");
var trending_page_component_1 = require("./trending-page/trending-page.component");
var upload_page_component_1 = require("./upload-page/upload-page.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_page_component_1 = require("./home-page/home-page.component");
var search_page_component_1 = require("./search-page/search-page.component");
var premium_page_component_1 = require("./premium-page/premium-page.component");
var video_page_component_1 = require("./video-page/video-page.component");
var routes = [
    { path: 'home', component: home_page_component_1.HomePageComponent },
    { path: 'search/:keyword', component: search_page_component_1.SearchPageComponent },
    { path: 'upload', component: upload_page_component_1.UploadPageComponent },
    { path: 'video/:videoid', component: video_page_component_1.VideoPageComponent },
    { path: 'premium', component: premium_page_component_1.PremiumPageComponent },
    { path: 'trending', component: trending_page_component_1.TrendingPageComponent },
    { path: 'about-us', component: about_us_component_1.AboutUsComponent },
    { path: 'work', component: work_component_1.WorkComponent },
    { path: 'terms', component: terms_component_1.TermsComponent },
    { path: 'adv', component: advertise_component_1.AdvertiseComponent },
    { path: 'categories/:categoryid', component: category_page_component_1.CategoryPageComponent },
    { path: 'playlists/:playlistid', component: playlist_page_component_1.PlaylistPageComponent },
    { path: 'channel/:userid', component: channel_page_component_1.ChannelPageComponent },
    { path: 'subscribed', component: subscribe_page_component_1.SubscribePageComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
