import { PremiumdetailService } from './../premiumdetail.service';
import { SocialUser } from 'angularx-social-login';
import { UserServiceService } from './../user-service.service';
import { SubscribeServiceService } from './../subscribe-service.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
const getSubscribed = gql`
query subbed($userid: ID!){
  getUserSubscribedtoID(userid:$userid)
}
`;

const querySubbedVideo = gql`
query videoSub($channelid: [String!]!){
  getSubscribedVideo(channelid:$channelid){
    today{
      videoid,
      videotitle,
      publishtime,
      thumbnailsource,
      viewcount,
      length,
      typeid,
      user{
      userid,
      profileimgaddr,
      username
      }
    }
    week{
      videoid,
      videotitle,
      publishtime,
      thumbnailsource,
      viewcount,
      length,
      typeid,
      user{
      userid,
      profileimgaddr,
      username
      }
    }
    month{
      videoid,
      videotitle,
      publishtime,
      thumbnailsource,
      viewcount,
      length,
      typeid,
      user{
      userid,
      profileimgaddr,
      username
      }
    }
  }
}
`;
@Component({
  selector: 'app-subscribe-page',
  templateUrl: './subscribe-page.component.html',
  styleUrls: ['./subscribe-page.component.scss']
})
export class SubscribePageComponent implements OnInit {
  userid: string;
  user: SocialUser;
  channelid: any[];
  today: any[];
  week: any[];
  month: any[];
  logged = false;
  count = 0;
  last = 100;
  premid: string;
  constructor(private apollo: Apollo, private router: Router,
              private userService: UserServiceService, private premium: PremiumdetailService) { }

  ngOnInit(): void {
    this.userService.currUserID.subscribe(user => {
      this.userid = user;
      this.checkQuery(this.userid);
    });
    this.userService.currUser.subscribe(usera => {
      this.user = usera;
      this.checkQuery(this.user);
    });
    this.premium.currPremiumId.subscribe(p => {
      this.premid = p;
      this.checkQuery(this.premid);
    });
  }
  checkQuery(inp: any) {
    if (inp != null) {
      this.count++;
    } else {
      this.count--;
    }
    console.log('count sub page ', this.count);
    if (this.count < -1) {
      alert('PLEASE LOGIN FIRST!');
      this.router.navigateByUrl('/');
    }
    if (this.count > 1) {
      this.queryid();
    }
  }
  queryid() {
    this.apollo.watchQuery<any>({
      query: getSubscribed,
      variables: {
        userid: this.userid
      }
    }).valueChanges.subscribe(({ data }) => {
      console.log('got data channelid', data);
      this.channelid = data.getUserSubscribedtoID;
      this.queryvids();
      // console.log(this.channelid);
    }, (error) => {
      console.log(error);
    });
  }
  queryvids() {
    this.apollo.watchQuery<any>({
      query: querySubbedVideo,
      variables: {
        channelid: this.channelid
      }
    }).valueChanges.subscribe(({ data }) => {
      console.log('got dataaaa ', data);
      this.today = data.getSubscribedVideo.today;
      this.today = this.checkType(this.today);
      this.week = data.getSubscribedVideo.week;
      this.week = this.checkType(this.week);
      this.month = data.getSubscribedVideo.month;
      this.month = this.checkType(this.month);
    }, (error) => {
      console.log(error);
    });
  }
  checkType(input: any): any {
    if (this.premid == null || this.premid == '1') {
      input = input.filter(i => i.typeid !== '2');
    }
    return input;
  }
}
