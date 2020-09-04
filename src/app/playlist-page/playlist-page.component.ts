import { PremiumdetailService } from './../premiumdetail.service';
import { PlaylistService } from './../playlist.service';
import { UserServiceService } from './../user-service.service';
import { VideoService } from './../video.service';
import { playlists } from './../playlists';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { faDeaf } from '@fortawesome/free-solid-svg-icons';
const q = gql`
query playlist($id:ID!){
  playlist(playlistid:$id){
    playlist{
      videocount,
      playlists{
        playlisttitle,
        playlistdescription,
        updatedtime,
        thumbnailsource,
        privacyid,
        userid,
        playlistdetails{
          viewcount,
          videoorder,
          dateadded,
          video{
            videoid,
            videotitle,
            videodescription,
            thumbnailsource,
            viewcount,
            videoconditionid,
            restrictionid,
            typeid,
            publishtime,
            user{
              userid,
              username
            }
          }
        }
      }
    },
    user{
      user{
        username,
        profileimgaddr,
        userid,
        profileimgaddr,
      },
      count,videoCount
    }
  }
}
`;
const getUserPlaylist = gql`
query userPlaylist($userid: ID!,$playlistid:ID){
  getUserSavedPlaylist(userid:$userid,playlistid:$playlistid){
    user{
      userid,
      username
    }
  }
}
`;
@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss']
})
export class PlaylistPageComponent implements OnInit {
  playlist: any;
  creator: any;
  subcount = '';
  sortDateAdded = false;
  sortPopular = false;
  sortDatePublished = false;
  userid: string;
  totalViewCount = 0;
  premid: any;
  constructor(private route: ActivatedRoute, private apollo: Apollo, public vid: VideoService, private router: Router,
              private userService: UserServiceService, private pl: PlaylistService, private premium: PremiumdetailService) { }
  users: any;
  videos: any[];
  ownPlaylist: boolean;
  existInLibrary: boolean;
  playlistid: string;
  vcount: string;
  pls: any[];
  editTitle = false;
  editPriv = false;
  title: string;
  editDesc = false;
  isPrivate = false;
  desc: string;
  shareVisible = false;
  popupVisible = false;
  showPopup() {
    this.popupVisible = !this.popupVisible;
  }
  deleteVid(v:string){
    this.pl.deletePlaylistDetail(this.playlistid, v);
    this.videos = this.videos.filter(vid => vid.video.videoid !== v);
  }
  removeFromUser(str: string,bool: boolean) {
    this.users.forEach(u => {
      if (str === this.userid) {
        return;
      } else if (u.user.userid === str) {
        u.available = !u.available;
        if (u.available) {
          this.pl.addToUser(u.user.userid, this.playlistid);
        } else {
          this.pl.removeFromUser(u.user.userid, this.playlistid);
        }
      }
    });
  }
  queryUser() {
    this.users = [];
    this.apollo.query<any>({
      query: getUserPlaylist,
      variables: {
        playlistid: this.playlistid,
        userid: this.userid
      }
    }).subscribe(({ data }) => {
      console.log('got data userssssss', data);
      this.users = data.getUserSavedPlaylist;
      this.users.forEach(u => {
        u.available = true;
        u.enabled = false;
        if (u.user.userid === this.userid) {
          u.enabled = true;
        }
      });
      console.log('userssss ', this.users);
    }, (error) => {
      console.log(error);
    });
  }
  moveOneUp(vid: string) {
    this.pl.updateDetail(vid, this.playlistid, 'oneUp', false);
    this.swap(vid, 'upOne');
  }
  moveOneDown(v: string) {
    this.pl.updateDetail(v, this.playlistid, 'oneDown', false);
    this.swap(v, 'downOne');
  }
  moveUp(v: string) {
    this.pl.updateDetail(v, this.playlistid, 'up', false);
    this.move(v, 'up');
  }
  moveDown(v: string) {
    this.pl.updateDetail(v, this.playlistid, 'down', false);
    this.move(v, 'down');
    // this.query();
  }
  swap(vid: string, condition: string) {
    let choice = this.videos.filter(v => v.video.videoid === vid)[0];

    let temp: any;
    for (let i = 1; i < this.videos.length; i++){
      if (condition === 'upOne') {
        temp = this.videos.filter(v => v.videoorder === (choice.videoorder - i))[0];
      } else if (condition === 'downOne') {
        temp = this.videos.filter(v => v.videoorder === (choice.videoorder + i))[0];
      }
      if (temp !== undefined) {
        console.log('ini temp gannn ', temp);
        break;
      }
    }
    let tempOrder = temp.videoorder;
    let choiceOrder = choice.videoorder;
    this.videos.forEach(v => {
      if (v.video.videoid === vid) {
        v.videoorder = tempOrder;
      }
      else if (v.video.videoid === temp.video.videoid) {
        v.videoorder = choiceOrder;
      }
    });
    this.sortByOrderFunc();
  }
  move(vid: string, condition: string) {
    let choice = this.videos.filter(v => v.video.videoid === vid)[0];
    let choiceOrder = choice.videoorder;

    this.videos.forEach(v => {
      switch (condition) {
        case 'up':
          if (v.videoorder < choiceOrder) {
            v.videoorder++;
            console.log('ini v', v);
          }
          if (v.video.videoid === choice.video.videoid) {
            v.videoorder = 1;
          }
          break;
          case 'down':
            if (v.videoorder > choiceOrder) {
              v.videoorder--;
              console.log('ini v', v);
            }
            if (v.video.videoid === choice.video.videoid) {
              v.videoorder = this.videos.length;
            }
            break;
      }
    });
    this.sortByOrderFunc();
  }
  sortDateAddedFunc(str: string) {
    if (this.sortDatePublished) {
      this.sortDatePublished = !this.sortDatePublished;
    }
    if (this.sortPopular) {
      this.sortPopular = !this.sortPopular;
    }
    if (this.sortDateAdded) {
      this.sortDateAdded = !this.sortDateAdded;
      this.sortByOrderFunc();
    }
    this.videos = this.videos.sort((b, a) => {
      let d1 = new Date(a.dateadded);
      let d2 = new Date(b.dateadded);
      if (str == 'desc') {
        return (d2.getTime() - d1.getTime());
      }
      else {
        return (d1.getTime() - d2.getTime());
      }
    });
  }
  sortPopularityFunc(str: string) {
    if (this.sortDatePublished) {
      this.sortDatePublished = !this.sortDatePublished;
    }
    if (this.sortPopular) {
      this.sortPopular = !this.sortPopular;
      this.sortByOrderFunc();
    }
    if (this.sortDateAdded) {
      this.sortDateAdded = !this.sortDateAdded;
    }
    this.videos = this.videos.sort((b, a) => {
      let d1: number = (a.video.viewcount);
      let d2: number = (b.video.viewcount);
      if (str == 'desc') {
        return (d2 - d1);
      }
      else {
        return (d1 - d2);
      }
    });
  }
  sortDatePublishedFunc(str: string) {
    if (this.sortDatePublished) {
      this.sortDatePublished = !this.sortDatePublished;
      this.sortByOrderFunc();
    }
    if (this.sortPopular) {
      this.sortPopular = !this.sortPopular;
    }
    if (this.sortDateAdded) {
      this.sortDateAdded = !this.sortDateAdded;
    }
    this.videos = this.videos.sort((b, a) => {
      let d1 = new Date(a.video.publishtime);
      let d2 = new Date(b.video.publishtime);
      if (str == 'desc') {
        return (d2.getTime() - d1.getTime());
      }
      else {
        return (d1.getTime() - d2.getTime());
      }
    });
  }
  changeShareVisible(b: boolean) {
    this.shareVisible = b;
  }
  addUserPlaylist() {
    this.pl.addToUser(this.userid, this.playlistid);
    this.existInLibrary = true;
  }
  removeUserPlaylist() {
    this.pl.removeFromUser(this.userid, this.playlistid);
    this.existInLibrary = false;
  }
  ngOnInit(): void {
    // var acc = document.getElementsByClassName("accordion");
    // var i;

    // for (i = 0; i < acc.length; i++) {
    //   acc[i].addEventListener("click", function () {
    //     this.classList.toggle("active");
    //     var panel = this.nextElementSibling;
    //     if (panel.style.maxHeight) {
    //       console.log('asdsadsadsadas');
    //       // panel.style.maxHeight = null;
    //     } else {
    //       console.log('asdsadsadsadas');
    //       panel.style.maxHeight = panel.scrollHeight + "px";
    //     }
    //   });
    // }

    this.route.paramMap.subscribe(params => {
      console.log(params.get('playlistid'));
      this.playlistid = params.get('playlistid');

      this.existInLibrary = this.pl.checkSaved(this.playlistid);
      console.log('exis int library', this.existInLibrary);
      this.userService.currUserID.subscribe(u => {
        this.userid = u;
        this.premium.currPremiumId.subscribe(p => this.premid = p);
        this.query();
        this.queryUser();
      });
      this.pl.currPlaylist.subscribe(p => {
        this.pls = p;
        if (this.pls != null) {
          this.pls.forEach(element => {
            if (element.playlist.playlistid == this.playlistid) {
              this.existInLibrary = true;
            }
          });
        }
      });
    });
  }
  playPlaylist(bool: boolean) {
    this.pl.playPlaylist(this.premid, bool, '', this.videos);
  }
  changeTitle() {
    this.editTitle = !this.editTitle;
  }
  changeDesc() {
    this.editDesc = !this.editDesc;
  }
  changePriv() {
    this.editPriv = !this.editPriv;
  }
  updatePriv() {
    let typ = '1';
    this.changethisPriv();
    if (this.isPrivate) {
      typ = '2';
    }
    this.pl.updatePlaylist(this.userid, this.playlistid, '', '', typ, '', '');
    this.changePriv();
  }
  changethisPriv() {
    this.isPrivate = !this.isPrivate;
    console.log('is private ',this.isPrivate);
  }
  updateTitle() {
    this.pl.updatePlaylist(this.userid, this.playlistid, this.title, '', '', '', '');
    this.changeTitle();
  }
  updateDesc() {
    this.pl.updatePlaylist(this.userid, this.playlistid, '', this.desc, '', '', '');
    this.changeDesc();
  }
  deleteAllVideos() {
    this.pl.deletePlaylistDetail(this.playlistid, '');
    this.videos = [];
  }
  query() {
    this.videos = [];
    console.log('ini pls id ', this.playlistid);
    this.apollo.query<any>({
      query: q,
      variables: {
        id: this.playlistid
      }
    }).subscribe(({ data }) => {
      console.log('got data ', data);
      this.vcount = data.playlist.playlist.videocount;
      this.playlist = data.playlist.playlist.playlists;
      if (this.playlist.privacyid == '2') {
        this.isPrivate = true;
        if (this.userid !== this.playlist.userid) {
          alert('THIS IS A PRIVATE PLAYLIST!');
          this.router.navigate(['/']);
        }
      }
      this.title = this.playlist.playlisttitle;
      this.desc = this.playlist.playlistdescription;
      console.log('got playlist ', this.playlist);
      this.videos = data.playlist.playlist.playlists.playlistdetails;
      this.videos = this.checkType(this.videos);
      this.sortByOrderFunc();
      console.log('ini videos ', this.videos);
      this.creator = data.playlist.user.user;
      console.log('ini creatorrrr ',this.creator)
      if (this.userid == this.playlist.userid) {
        this.ownPlaylist = true;
      } else {
        this.ownPlaylist = false;
      }
      this.totalViewCount = 0;
      this.videos.forEach(e => {
        console.log(this.totalViewCount);
        this.totalViewCount += e.viewcount;
      });
      this.subcount = data.playlist.user.count;
      this.vcount = data.playlist.user.videoCount;
    }, (error) => {
      console.log(error);
    });
  }
  sortByOrderFunc() {
    this.videos = this.videos.sort((s1, s2) => {
      let string1: number;
      string1 = s1.videoorder;
      let string2: number;
      string2 = s2.videoorder;
      return (string1 - string2);
    });
  }
  checkType(input: any): any {
    if (this.premid == null || this.premid == '1') {
      input = input.filter(i => i.video.typeid !== '2');
    }
    return input;
  }
}
