import { PlaylistService } from './../playlist.service';
import { playlists } from './../playlists';
import { PremiumdetailService } from './../premiumdetail.service';
import { VideoService } from './../video.service';
import { SocialUser } from 'angularx-social-login';
import { UserServiceService } from './../user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
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
      categoryid,
      locationid,
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
      },count,videoCount},
    fullComment{
      comment{
        commentid,
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
const q = gql`
query queue($videoid:[ID!]!){
  getQueueInfo(videoid:$videoid){
    videoid,
    videotitle,thumbnailsource,length,user{
      username
    }
  }
}

`;
const related = gql`
query related($catid: ID!, $locid:ID!) {
  relatedvideos(categoryid:$catid,locationid:$locid){
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
}
`;
var wait = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };

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
  comments: any;
  like = 0;
  dislike = 0;
  subscribed = false;
  notif = false;
  premium = false;
  ownChannel = false;
  premid = '';
  err: any;
  queue: any;
  playlist: any;
  related: any;
  locid: string;
  catid: string;
  last = 10;
  obs: IntersectionObserver;
  playlisttitle: string;
  autoplay = false;
  vidss: any;
  currOrder = 0;
  constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router, private pl: PlaylistService,
    private userService: UserServiceService, private premiums: PremiumdetailService, private vid: VideoService) { }
  removeQ() {
    this.vid.removeQueue();
  }
  navigate(bool: boolean) {
    if (this.playlist !== null && this.queue === null) {
      let idx = this.searchNext(this.playlist);
      this.router.navigate(['/video', this.playlist[idx+1].video.videoid]);
    } else if (this.queue !== null && this.playlist === null) {
      this.router.navigate(['/video', this.queue[this.searchNext(this.queue)].videoid]);
    } else {
      this.router.navigate(['/video', this.related[0].videoid]);
    }
  }
  searchNext(type: any): number {
    let num: number;
    for (let i = 0; i < type.length; i++) {
      const order = type[i].videoorder;
      console.log('order ', order);
      if (order > this.currOrder) {
        this.vid.changeCurrOrder(order);
        return i;
      }
    }
  }
  ngOnInit(): void {
    document.getElementById('vidid').querySelector('video').addEventListener('ended', () => {
      // console.log('asdf video ini ended');
      if (this.autoplay) {
        this.navigate(true);
      }
    });
    this.vid.currQueue.subscribe(q => {
      this.queue = q;
      if (this.queue !== null) {
        this.queryQueue();
        this.playlist = null;
      }
    });
    this.pl.currActivePlaylist.subscribe(p => {
      this.playlist = p;
      console.log(this.playlist);
      if (this.playlist !== null) {
        this.queue = null;
      }
    });
    this.route.paramMap.subscribe(params => {
      // this.category = cats[+params.get('categoryid')];
      // this.vid.getQueue();
      this.vid.currOrder.subscribe(c => this.currOrder = c);
      console.log(+params.get('videoid'));
      this.id = params.get('videoid');
      this.userService.currUser.subscribe(user => {
        this.user = user;
      });
      this.userService.currUserID.subscribe(user => {
        this.premiums.currPremiumId.subscribe(premid => {
          this.premid = premid;
          this.userid = user;
          this.query(this.userid);

        });

      });

    });
  }
  queryRelated() {
    console.log(this.locid);
    console.log(this.catid);
    this.apollo.watchQuery<any>({
      query: related,
      variables: {
        locid: this.locid,
        catid: this.catid,
      }
    }).valueChanges.subscribe(({ data }) => {
      this.related = data.relatedvideos;
      this.related = this.checkType(this.related, this.premid);
      this.related = this.related.filter(i => i.videoid !== this.id);
      console.log('related ', this.related);
    }, (error) => {
      console.log('error', error);
    });
  }
  checkType(input: any, type: string): any {
    if (type == null || type === '1') {
      input = input.filter(i => i.typeid !== '2');
    }
    return input;
  }
  queryQueue() {
    let vididArr: string[] = [];
    this.queue.forEach(q => {
      vididArr.push(q.videoid);
    });
    this.apollo.watchQuery<any>({
      query: q,
      variables: {
        videoid: vididArr,
      }
    }).valueChanges.subscribe(({ data }) => {
      let temp = data.getQueueInfo;
      for (let i = 0; i < this.queue.length; i++){
        this.queue[i].videotitle = temp[i].videotitle;
        this.queue[i].length = temp[i].length;
        this.queue[i].thumbnailsource = temp[i].thumbnailsource;
        this.queue[i].username = temp[i].user.username;
        this.queue[i].videoid = temp[i].videoid;
      }
    }, (error) => {
      console.log('error', error);
    });
  }
  query(str: string) {

    this.apollo.watchQuery<any>({
        query: fullVideo,
        variables: {
          videoid: this.id,
          userid: str
        }
      }).valueChanges.subscribe(({ data }) => {
        this.v = data.getFullVideoInfo.video;
        this.locid = this.v.locationid;
        this.catid = this.v.categoryid;
        this.queryRelated();
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
        if (this.v.typeid === '2') {
          this.premium = true;
          if (this.premid == null) {
            alert('LOGIN TO SEE THIS VIDEO!');
            window.location.assign('/home');
          }
          else if (this.premid === '1') {
            alert('BECOME A PREMIUM MEMBER TO SEE THIS VIDEO!');
            window.location.assign('/home');
          }
        }
        this.obs = new IntersectionObserver((entry) => {
          if (entry[0].isIntersecting) {
            let main = document.querySelector(".related");
            for (let i = 0; i < 5; i++){
              if (this.last < this.related.length) {
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
      }, (error) => {
        console.log('error', error);
      });
  }
  async go(link: string) {
    this.v = [];
    await wait(500);
    this.router.navigate([link]);
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
