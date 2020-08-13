import { PremiumdetailService } from './../premiumdetail.service';
import { VideoService } from './../video.service';
import { SocialUser } from 'angularx-social-login';
import { UserServiceService } from './../user-service.service';
import { ActivatedRoute } from '@angular/router';
import { AppRoutingModule } from './../app-routing.module';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatVideoComponent } from 'mat-video/lib/video.component';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
const checkSubscribe = gql`
query checkSub($user:ID!,
  $channel:ID!){
  checkSubscribe(input:{userid:$user, channelid:$channel}){
    userid,channelid,notification
  }
}
`;
const fullVideo = gql`
query Allvids($videoid:ID!,$userid:ID){
  getFullVideoInfo(videoid:$videoid,userid:$userid){
    video{
      typeid,
      videoid,
      videotitle,
      videodescription,
      thumbnailsource,
      privacyid,
      videosource,
      publishtime,
      viewcount,
      category{
        categoryname
      }
    },
    like,
    dislike,
    fullUser{
      user{
        userid
        profileimgaddr
        username
      },count},
    fullComment{
      comment{
        commentdetail, commenttime, rootcommentid,
        user{
          username,
          profileimgaddr,
          userid
        }
      }
      like,
      dislike
    }
  }
}
`;
@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})
export class VideoPageComponent implements OnInit {

  // @ViewChild('video') matVideo: MatVideoComponent;
  // video: HTMLVideoElement;
  // videos: any[];
  // last = 10;
  id = '';
  user: SocialUser;
  userid = '';
  v: any;
  u: any;
  comments: any[];
  like = 0;
  dislike = 0;
  subscribed = false;
  notif = false;
  premium = false;
  ownChannel = false;
  premid = '';
  constructor(private route: ActivatedRoute, private apollo: Apollo,
    private userService: UserServiceService, private premiums: PremiumdetailService, private vid: VideoService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      // this.category = cats[+params.get('categoryid')];
      console.log(+params.get('videoid'));
      this.id = params.get('videoid');
      this.userService.currUser.subscribe(user => {
        this.user = user;
      });
      this.userService.currUserID.subscribe(user => {
        this.userid = user;
        this.checkQuery(this.userid);

      });
      this.premiums.currPremiumId.subscribe(premid => {
        this.premid = premid;
      });
      // this.query();
    });
  }
  checkQuery(inp: any) {
    if (inp != null) {
      this.query();

    }
  }
  query() {

    console.log(this.userid);
    console.log(this.id);
    this.apollo.watchQuery<any>({
        query: fullVideo,
        variables: {
          videoid: this.id,
          userid: this.userid
        }
      }).valueChanges.subscribe(({ data }) => {
        console.log('VIDEOOO ', data);
        this.v = data.getFullVideoInfo.video;
        this.u = data.getFullVideoInfo.fullUser;
        this.queryCheck();
        this.like = data.getFullVideoInfo.like;
        this.dislike = data.getFullVideoInfo.dislike;
        this.comments = data.getFullVideoInfo.fullComment.comment;
        const likes = data.getFullVideoInfo.fullComment.like;
        const dislike = data.getFullVideoInfo.fullComment.dislike;
        this.v.publishtime = this.vid.getDateDiffString(this.v.publishtime);
        for (let i = 0; i < this.comments.length; i++){
          this.comments[i].like = likes[i];
          this.comments[i].dislike = dislike[i];
        }
        if (this.v.typeid == "2") {
          this.premium = true;
        }

      }, (error) => {
        console.log('error', error);
        alert(error);
      });
  }

  queryCheck() {
    console.log('useridd  ', this.userid);
    this.apollo.watchQuery<any>({
      query: checkSubscribe,
      variables: {
        user: this.userid,
        channel: this.u.user.userid
      }
    }).valueChanges.subscribe(({ data, loading, errors }) => {
      console.log('SUBSCRIBED', data.checkSubscribe);
      if (data != null) {
        this.subscribed = data.checkSubscribe;
        this.notif = data.checkSubscribe.notification;
      }


  });
    if (this.u.user.userid === this.userid) {
      this.ownChannel = true;
      console.log('ownChannel', this.ownChannel);
    }

  }
}
