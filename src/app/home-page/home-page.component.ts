import { RestrictionServiceService } from './../restriction-service.service';
import { PremiumdetailService } from './../premiumdetail.service';
import { SocialUser } from 'angularx-social-login';
import { GetIpAddressService } from './../get-ip-address.service';
import { UserServiceService } from './../user-service.service';
import { AfterViewInit, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { BooleanValueNode } from 'graphql';
import gql from 'graphql-tag';

// We use the gql tag to parse our query string into a query document
const homeQuery = gql`
query home(
  $restr: ID,
  $loc:ID,
  $type:ID,
  $cond:ID,){
  homevideos(filter:{
    restrictionid:$restr,
    locationid:$loc,
    typeid:$type,
    videoconditionid:$cond}){
      videotitle,
      publishtime,
      thumbnailsource,
      viewcount,
      length,
      videoid,
      typeid,
      user{userid,
        username,
      }
  }
}`;
const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  loading: boolean;
  error: any;
  locid: string;
  userid: string;
  premid: string;
  restid: string;
  videos: any[];
  check = 0;
  last = 12;
  obs: IntersectionObserver;
  private querySubscription: Subscription;

  constructor(private apollo: Apollo, private userService: UserServiceService,
              private loc: GetIpAddressService, private premium: PremiumdetailService, private restrict: RestrictionServiceService) { }

  prints() {
    console.log('ini userid', this.userid);
  }

  ngOnDestroy(): void {
    // this.querySubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.loc.currLocID.subscribe(loc => {
      this.locid = loc;
      this.checkForQuery(this.locid, 1);
    });
    this.premium.currPremiumId.subscribe(premid => {
      this.premid = premid;
      this.checkForQuery(this.premid, 2);
    });
    this.restrict.currRestrictionID.subscribe(r => {
      this.restid = r;
      this.checkForQuery(this.restid, 3);
    });
    this.userService.currUserID.subscribe(user => {
      this.userid = user;
      // this.checkForQuery(this.userid, 4);
    });

  }

  homeQuery(): void {
    this.apollo.watchQuery<any>({
      query: homeQuery,
      variables: {
        restr: this.restid,
        loc: this.locid,
        type: this.premid,
        cond: this.premid,
      }
    }).valueChanges.subscribe(({ data }) => {
      this.videos = data.homevideos;
      this.obs = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting) {
          let main = document.querySelector(".content");
          for (let i = 0; i < 4; i++){
            if (this.last < this.videos.length) {
              let div = document.createElement("div");
              let app = document.createElement("app-video-card");
              app.setAttribute("channel", "this.videos[last].user.username");
              app.setAttribute("img", "this.videos[last].thumbnailsource");
              app.setAttribute("length", "this.videos[last].length");
              app.setAttribute("title", "this.videos[last].videotitle");
              app.setAttribute("publish", "this.videos[last].publishtime");
              app.setAttribute("view", "this.videos[last].viewcount");
              div.appendChild(app);
              main.appendChild(div);
              this.last++;
            }
          }
        }
      });
      this.obs.observe(document.querySelector(".foot"));

      console.log('this videos', this.videos);
    }, (error) => {
      console.log('error', error);
      alert(error);
    });
  }

  checkForQuery(inp: any, inc: number) {
    if (inp != null) {
      this.check++;
      console.log('cek home', inc, this.check);
    }
    if (this.check >= 3 || (this.locid !== null && this.premid === null)) {
        this.homeQuery();
      }
  }
}
