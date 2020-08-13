import { VideoService } from './../video.service';
import { PostServiceService } from './../post-service.service';
import { SubscribeServiceService } from './../subscribe-service.service';
import { SocialUser } from 'angularx-social-login';
import { UserServiceService } from './../user-service.service';
import gql from 'graphql-tag';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BreakingChangeType } from 'graphql';
const checkSubscribe = gql`
query checkSub($user:ID!,
  $channel:ID!){
  checkSubscribe(input:{userid:$user, channelid:$channel}){
    userid,channelid,notification
  }
}
`;
const getVideoPage = gql`
query channelvid($userid:ID,
  $sortby: String){
  channelVideoQuery(filter:{
    userid:$userid,sortby:$sortby
  }){
    user{
      userid,
      username
    },
    videoid,
    thumbnailsource,
    length,
    videotitle,
    publishtime,
    viewcount,
    typeid
  }
}
`;
const getPlaylistPage = gql`
  query channelPlay(
    $userid: ID,
    $typeid: ID,
    $restrictionid: ID
  ){
    channelPlaylistQuery(filter:{
      userid:$userid,restrictionid:$restrictionid,typeid:$typeid
    }){
      playlisttitle,
    updatedtime,
    user{
      username
    },
    thumbnailsource
    }
  }
`;
const getPost = gql`
query getAllPost($userid: ID){
  posts(filter:{userid:$userid}){
    post{
      postid,
      posttitle,
      postdetail,
      posttime,
      postpicture,
      user{
        username
      }
    },
    like,
    dislike
  }
}
`;

const getChannelData = gql`
query checkUser($userid: ID!) {
  getUserAndSubscriber(userid:$userid){
    user{
      userid,
      username,
      joindate,
      profileimgaddr,
      bgimgaddr,
      channeldetail, channelurl
    }
    count, vcount
  }
}`;
const getByUser = gql`
query get($userid: ID!){
  video(userid:$userid){
    user{
      userid,
      username
    },
    videoid,
    thumbnailsource,
    length,
    videotitle,
    publishtime,
    viewcount,
    typeid
  }
}
`;
const get = gql`
query getVideoSetting {
  privacies{
    privacyid,
    privacyname
  }}`;
const getVideo = gql`
query getvid($videoid:ID!){
  oneVideo(videoid:$videoid){
    typeid,
    videoid,
    videotitle,
    videodescription,
    thumbnailsource,
    privacyid,
    user {
      userid,
      username
    },
    publishtime,
    viewcount,
    length
  }
}
`;
const home = gql`
query chHome(
  $userid: ID){
  channelHomeQuery(filter:{
    userid:$userid}){
    recent{
      videoid,
      typeid,
      videotitle,
      videodescription,
      thumbnailsource,
      privacyid,
      user {
        userid,
        username
      },
      publishtime,
      viewcount,
      length
    },
    random{
      videoid,
      videotitle,
      typeid,
      videodescription,
      thumbnailsource,
      privacyid,
      user {
        userid,
        username
      },
      publishtime,
      viewcount,
      length
    },
    playlist{
    playlisttitle,
    updatedtime,
    user{
      username
    },
    thumbnailsource
    }
  }}
`;
@Component({
  selector: 'app-channel-page',
  templateUrl: './channel-page.component.html',
  styleUrls: ['./channel-page.component.scss']
})
export class ChannelPageComponent implements OnInit, AfterViewInit {
  currTitle: string;
  currDesc: string;
  currPriv: string;
  chgThumb: string;
  currvidid: string;
  currThumb: string;
  currView: string;
  currName: string;
  currDate: string;
  currLen: string;
  showVids = false;
  showOneVid = false;
  privacies: any[];
  videos: any[];
  recents: any[];
  randoms: any[];
  playlists: any[];
  posts: any[];
  showDes = false;
  showLink = false;
  stop = false;
  stopDua = false;
  stopTiga = false;
  stopEmpat = false;
  newThumb: string;
  selector = 1;
  channel: any;
  subscriber: any;
  ownChannel: boolean;
  channelid: string;
  ready = false;
  name = '';
  bgimg = '';
  prof = '';
  chdet = '';
  churl = '';
  newDesc = '';
  newLink = '';
  posttitle = '';
  postdet = '';
  joind: Date;
  vcount = 0;
  count = 0;
  user: SocialUser;
  userid: string;
  subbed: boolean;
  notif: boolean;
  check = 0;
  url = '';
  bufferPicture: File;
  newThumbnailFile: File;
  imgFile: File;
  bufferBG: File;
  imgBG: File;
  imgPost: File;
  imgString: string;
  thumbnailurl: string;
  bgString: string;
  bgurl: string;
  bufferPost: File;
  PostImgString: string;
  sortby = 'popular';
  last = 4;
  obs: IntersectionObserver;
  private values = [
    {
       key:"popular",
       value:"popular"
    },
    {
       key:"oldest",
       value:"oldest"
    },
    {
      key:"newest",
      value:"newest"
   }
 ]
  constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router,
              private userService: UserServiceService, private post: PostServiceService,
              private sub: SubscribeServiceService, private vid: VideoService) { }
  ngAfterViewInit(): void {
    // this.checkQuery(this.userid, 2);
  }
  setThumb(url: string) {
    this.newThumb = url;
  }
  openVid(int: string) {
    this.currvidid = int;
    console.log('int  ',int);
    this.showOneVid = !this.showOneVid;
    this.showVids = !this.showVids;
    this.apollo.watchQuery<any>({
      query: get
    }).valueChanges.subscribe(({ data }) => {
      this.privacies = data.privacies;
      this.apollo.watchQuery<any>({
        query: getVideo,
        variables: {
          videoid: int,
        }
      }).valueChanges.subscribe(({ data }) => {
        this.currTitle = data.oneVideo.videotitle;
        this.currDesc = data.oneVideo.videodescription;
        this.currPriv = data.oneVideo.privacyid;
        this.currName = data.oneVideo.user.username;
        this.currThumb = data.oneVideo.thumbnailsource;
        const asd = new Date(data.oneVideo.publishtime);
        this.currDate = this.vid.getDateDiff(asd);
        this.currView = data.oneVideo.viewcount;
        this.currLen = data.oneVideo.length;
      }, (error) => {
        console.log('error', error);
        // alert(error);
      });
    }, (error) => {
      console.log('error', error);
      // alert(error);
    });
  }
  deleteVid() {
    this.vid.del(this.currvidid);
  }
  showVid(id: number) {
    this.showVids = !this.showVids;
    this.apollo.watchQuery<any>({
      query: getByUser,
      variables: {
        userid: id,
      }
    }).valueChanges.subscribe(({ data }) => {
      this.videos = data.video;
    }, (error) => {
      console.log('error', error);
      // alert(error);
    });
  }
  confirmPost() {
    if ((this.posttitle != null && this.posttitle != '') &&
      ((this.postdet != null && this.postdet != '') || (this.PostImgString != null&& this.PostImgString!=''))){
      this.post.postapost(this.userid, this.posttitle, this.postdet, this.PostImgString);

    }
  }
  changeSelector(idx: number) {
    this.selector = idx;
    switch (idx) {
      case 1:
        this.queryHome();
        break;
      case 2:
        this.queryVideos(this.sortby);
        break;
      case 3:
        this.queryPlaylist();
        break;
      case 4:
        this.queryPost();
        break;
    }
  }
  queryVideos(sort: String) {
    this.apollo.watchQuery<any>({
      query: getVideoPage,
      variables: {
        userid: this.channelid,
        sortby: sort
      }
    }).valueChanges.subscribe(({ data, loading, errors }) => {
      console.log('DATA VIDEO PAGE \n', data);
      this.videos = data.channelVideoQuery;
    });
  }
  queryPlaylist() {
    this.apollo.watchQuery<any>({
      query: getPlaylistPage,
      variables: {
        userid: this.channelid
      }
    }).valueChanges.subscribe(({ data, loading, errors }) => {
      console.log('DATA PLAYLIST PAGE ', data);
      this.playlists = data.channelPlaylistQuery;
    });
  }
  queryPost() {
    this.apollo.watchQuery<any>({
      query: getPost,
      variables: {
        userid: this.channelid
      }
    }).valueChanges.subscribe(({ data, loading, errors }) => {
      this.posts = data.posts.post;
      const likes = data.posts.like;
      const dislike = data.posts.dislike;
      for (let i = 0; i < this.posts.length; i++){
        this.posts[i].like = likes[i];
        this.posts[i].dislike = dislike[i];
      }
      console.log('POSTS ', this.posts);
    });
  }
  ngOnInit(): void {

    // this.obs.observe(document.querySelector(".foot"));
    this.obs = new IntersectionObserver((entry) => {
      console.log('masdukk');
      if (entry[0].isIntersecting) {
        let main = document.querySelector(".vid");
        for (let i = 0; i < 2; i++){
          if (this.last < this.videos.length) {
            let div = document.createElement("div");
            let app = document.createElement("app-video-card");
            app.setAttribute("typeid","this.videos[last].typeid")
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
    this.url = this.router.url;
    this.userService.currUser.subscribe(user => {
      this.user = user;
      this.checkQuery(this.user, 1);
    });
    this.userService.currUserID.subscribe(user => {
      this.userid = user;
      this.checkQuery(this.userid, 2);
    });
    // this.ownChannel = false;
    let id: string;
    this.route.paramMap.subscribe(params => {
      // this.category = cats[+params.get('categoryid')];
      console.log(+params.get('userid'));
      id = params.get('userid').toString();
      // this.checkQuery(id, 1);
      console.log('id ', id);
      this.apollo.watchQuery<any>({
        query: getChannelData,
        variables: {
          userid: id
        }
      }).valueChanges.subscribe(({ data, loading, errors }) => {
        console.log(data);
        this.channelid = data.getUserAndSubscriber.user.userid;
        this.name = data.getUserAndSubscriber.user.username;
        this.bgimg = data.getUserAndSubscriber.user.bgimgaddr;
        this.prof = data.getUserAndSubscriber.user.profileimgaddr;
        this.count = data.getUserAndSubscriber.count;
        this.chdet = data.getUserAndSubscriber.user.channeldetail;
        this.churl = data.getUserAndSubscriber.user.channelurl;
        this.joind = new Date(data.getUserAndSubscriber.user.joindate);
        this.vcount = data.getUserAndSubscriber.vcount;
        this.checkQuery(this.vcount, 3);
    });
    });


  }
  checkQuery(inp: any, inc: number) {
    if (inp != null) {
      this.check++;
      console.log('cek channel', inc, this.check);
    }
    if (this.check > 2) {
        this.query();
      }
  }
  query() {
    console.log('useridd  ', this.userid);
    this.apollo.watchQuery<any>({
      query: checkSubscribe,
      variables: {
        user: this.userid,
        channel: this.channelid
      }
    }).valueChanges.subscribe(({ data, loading, errors }) => {
      console.log('SUBSCRIBED', data.checkSubscribe);
      if (data != null) {
        this.subbed = data.checkSubscribe;
        this.notif = data.checkSubscribe.notification;
      }


  });
    if (this.channelid === this.userid) {
      this.ownChannel = true;
      console.log('ownChannel', this.ownChannel);
    }

    this.queryHome();
  }
  queryHome() {
    console.log('masuk bambang');
    this.apollo.watchQuery<any>({
      query: home,
      variables: {
        userid: this.channelid
      }
    }).valueChanges.subscribe(({ data, loading, errors }) => {
      console.log('DATAAA ', data);
      this.randoms = data.channelHomeQuery.random;
      this.recents = data.channelHomeQuery.recent;
      this.playlists = data.channelHomeQuery.playlist;

    });
  }
  subscribe() {
    this.sub.subscribe(this.userid, this.channelid);
  }
  unsubscribe() {
    this.sub.unsubscribe(this.userid, this.channelid);
  }
  notifOn(){
    this.sub.updateNotif(this.userid, this.channelid, true);
  }
  notifOff() {
    this.sub.updateNotif(this.userid, this.channelid, false);
  }
  copy() {
    return 'https://tpa-webab.web.app'+this.url;
    // return 'https://www.google.com';
  }
  setThumbnailURL(string: string) {
    this.thumbnailurl = string;
  }
  setPostUrl(string: string) {
    this.PostImgString = string;
  }
  showDesc() {
    this.showDes = !this.showDes;
  }
  btnshowLink() {
    this.showLink = !this.showLink;
  }
  confirmDesc() {
    this.userService.update(this.user, null, this.newDesc, null, null, null, null, null, null, null);
  }
  confirmLink() {
    this.userService.update(this.user, null, null, this.newLink, null, null, null, null, null, null);
  }
  uploadProfile(event): void {
    if (event != null) {
      this.bufferPicture = event.target.files[0];
      if (!this.validateImage(this.bufferPicture.name)) {
        alert('Selected file format is not supported');
        this.bufferPicture = null;
      }
      else {
        const reader = new FileReader();
        reader.onload = e => this.imgString = reader.result as string;

        reader.readAsDataURL(this.bufferPicture);
      }
    }
  }
  uploadImg(event): void {
    if (event != null) {
      this.bufferPost = event.target.files[0];
      if (!this.validateImage(this.bufferPost.name)) {
        alert('Selected file format is not supported');
        this.bufferPost = null;
      }
      else {
        // const reader = new FileReader();
        // reader.onload = e => this.PostImgString = reader.result as string;

        // reader.readAsDataURL(this.bufferPost);
      }
    }
  }
  updateVid() {
    this.vid.update(this.userid, this.currvidid, this.currTitle, this.currDesc, this.newThumb, null, this.currPriv);
  }
  uploadNew(event): void {
    if (event != null) {
      this.newThumbnailFile = event.target.files[0];
      if (!this.validateImage(this.newThumbnailFile.name)) {
        alert('Selected file format is not supported');
        this.newThumbnailFile = null;
      }
    }
  }
  setBGURL(string: string) {
    this.bgurl = string;
  }
  uploadbg(event): void {
    if (event != null) {
      this.bufferBG = event.target.files[0];
      if (!this.validateImage(this.bufferBG.name)) {
        alert('Selected file format is not supported');
        this.bufferBG = null;
      }
      else {
        const reader = new FileReader();
        reader.onload = e => this.bgString = reader.result as string;

        reader.readAsDataURL(this.bufferBG);
      }
    }
  }
  confirmBG() {
    this.imgBG = this.bufferBG
  }
  confirmCheckBG() {
    this.userService.update(this.user, null, null, null, this.bgurl, null, null, null, null, null);
    this.bgimg = this.bgurl;
  }
  confirmProf() {
    this.imgFile = this.bufferPicture
  }
  confirmCheckProf() {
    this.userService.update(this.user, null, null, null, null, this.thumbnailurl, null, null, null, null);
    this.user.photoUrl = this.thumbnailurl;
    this.userService.changeUser(this.user);
  }
  validateImage(name: string): boolean {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'jpg') {
        return true;
    }
    else if (ext.toLowerCase() == 'png') {
      return true;
    }
    else {
        return false;
    }
}
}
