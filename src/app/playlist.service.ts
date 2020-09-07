import { PremiumdetailService } from './premiumdetail.service';
import { PlaylistModalComponent } from './playlist-modal/playlist-modal.component';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
const createPlaylist = gql`
mutation createPlaylist(
  $usid:ID!,
  $pltitle:String!,
  $pldesc:String!,
  $privid:ID!) {
  createPlaylist(input:{
    playlisttitle:$pltitle,
    playlistdescription:$pldesc,
		userid:$usid,
    privacyid:$privid
  }){
    playlistid
  }
}
`;
const addUserPlaylist = gql`
mutation addUserPlaylist($userid:ID!, $playlistid:ID!) {
  UserAddPlaylist(input:{userid:$userid,playlistid:$playlistid}){
    playlistid
  }
}
`;
const createPlaylistDetail = gql`
mutation addPlaylistDetail($psid:ID!,$vidid:ID!){
  createPlaylistDetail(input:{playlistid:$psid,videoid:$vidid}){
    videoorder
  }
}
`;
const removeUserPlaylist = gql`
mutation removeUserPlaylist($userid:ID!, $playlistid:ID!) {
  UserRemovePlaylist(input:{userid:$userid,playlistid:$playlistid})
}
`;
const getPlaylist = gql`
query userPlaylist($userid: ID!,$playlistid:ID){
  getUserSavedPlaylist(userid:$userid,playlistid:$playlistid){
    playlist{
      playlisttitle
      playlistid
      privacyid
      userid
    }
  }
}
`;
const updatePlaylist = gql`
mutation updatePlaylist(
  $psid: ID!,
  $title: String,
  $desc: String,
  $priv: ID,
  $thumb: String,
  $url: String,
  $userid:ID
){
  updatePlaylist(input:{playlistid:$psid,
                        playlisttitle:$title,
                        userid:$userid,
                        playlistdescription: $desc,
                        privacyid: $priv,
                        thumbnailsource: $thumb,
                        playlisturl: $url
                      }){
    playlisttitle
  }
}
`;
const updateDetail = gql`
mutation updatePlaylist(
  $psid: ID!,
  $vidid: ID!,
  $mov: String,
  $view: Boolean
){
  updatePlaylistDetail(input:{
    playlistid:$psid,
    videoid:$vidid,
    view:$view,
    move:$mov}){
    videoorder
  }
}
`;
const deleteDetail = gql`
mutation deleteDetail($playlistid:ID!, $videoid:ID){
  deletePlaylistDetail(playlistid:$playlistid, videoid:$videoid)
}
`;
const getOwnPlaylist = gql`
query playlists($userid:ID!){
  getUserPlaylist(userid:$userid){
    playlistid,
    playlisttitle,
    privacyid,
    playlistdetails{
      videoid
    }
  }
}`;
const details = gql`
query details($plid:ID!){
  playlistdetails(playlistid:$plid){
    videoorder,
    video{
      videoid,
      videotitle,
      length,
      typeid,
      thumbnailsource,
      user {
        username
      }
    }
  }
}
`;
const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));
@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private PlaylistSource = new BehaviorSubject<any>(null);
  currPlaylist = this.PlaylistSource.asObservable();
  private OwnPlaylistSource = new BehaviorSubject<any>(null);
  currOwnPlaylist = this.OwnPlaylistSource.asObservable();
  private OwnFixedSource = new BehaviorSubject<any>(null);
  currFixedPlaylist = this.OwnFixedSource.asObservable();
  private activePlaylistSource = new BehaviorSubject<any>(null);
  currActivePlaylist = this.activePlaylistSource.asObservable();
  public temp: any;
  check = 0;
  premid: string;

  constructor(private apollo: Apollo, private premium: PremiumdetailService, private router: Router) { }
  changePlaylist(item: any[]) {
    this.PlaylistSource.next(item);
  }
  changeOwnPlaylist(item: any) {
    this.OwnPlaylistSource.next(item);
  }
  changeFixedPlaylist(item: any) {
    this.OwnFixedSource.next(item);
  }
  changeActivePlaylist(item: any) {
    this.activePlaylistSource.next(item);
  }

  playPlaylist(premium: string, inOrder: boolean, pl: string, vids: any) {
    if (!vids) {
      this.apollo.watchQuery<any>({
        query: details,
        variables: {
          plid: pl
        }
      }).valueChanges.subscribe(({ data }) => {
        console.log('got data  ', data.playlistdetails);
        vids = this.checkType(data.playlistdetails, premium);
        if (!inOrder) {
          this.shuffle(vids);
        } else {
          vids = this.sortByOrderFunc(vids);
        }
        this.activePlaylistSource.next(vids);
        this.router.navigate(['/video', vids[0].video.videoid]);
      },
      (error) => {
        console.log(error);
      });
    } else {
      if (!inOrder) {
        this.shuffle(vids);
      }
      this.activePlaylistSource.next(vids);
      this.router.navigate(['/video', vids[0].video.videoid]);
    }
  }

  sortByOrderFunc(item: any): any {
    item = item.sort((s1, s2) => {
      let string1: number;
      string1 = s1.videoorder;
      let string2: number;
      string2 = s2.videoorder;
      return (string1 - string2);
    });
    return item;
  }
  checkType(input: any, type: string): any {
    if (type == null || type === '1') {
      input = input.filter(i => i.video.typeid !== '2');
    }
    return input;
  }
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  removePlaylist() {
    this.activePlaylistSource.next(null);
  }
  checkSaved(playlistid: string): boolean {
    console.log('pls id ', playlistid);
    let pls: any;
    this.currPlaylist.subscribe(p => {
      pls = p;
      pls.forEach(element => {
        console.log('element ', element.playlist.playlistid);
        if (element.playlist.playlistid == playlistid) {
          return true;
         }
      });
    });
    return false;
  }
  getOwnPlaylist(uid: string) {
    this.apollo.watchQuery<any>({
      query: getOwnPlaylist,
      variables: {
        userid: uid,
      }
    }).valueChanges.subscribe(({ data }) => {
      console.log('got data  ', data);
      this.changeOwnPlaylist(data.getUserPlaylist);
    }, (error) => {
      console.log(error);
    });
  }
  getPlaylist(uid: string) {
    this.apollo.watchQuery<any>({
      query: getPlaylist,
      variables: {
        userid: uid,
        playlistid: '',
      }
    }).valueChanges.subscribe(({ data }) => {
      let dats = this.sortByPrivacyFunc(data.getUserSavedPlaylist);
      this.changePlaylist(dats);
    }, (error) => {
      console.log(error);
    });
  }
  sortByPrivacyFunc(input: any) {
    input = input.sort((s1, s2) => {
      let string1: number;
      string1 = s1.playlist.privacyid;
      let string2: number;
      string2 = s2.playlist.privacyid;
      return (string2 - string1);
    });
    return input;
  }
  addToUser(u: string, p: string) {
    this.apollo.mutate<any>({
      mutation: addUserPlaylist,
      variables: {
        userid: u,
        playlistid: p,
      },
      refetchQueries: [{
        query: getOwnPlaylist,
        variables: {
          userid: u,
          playlistid: '',
        }
      }]
    }).subscribe(({ data }) => {
      console.log('got data', data);
      //tadinya di sini

    }, (error) => {
      console.log('error', error);
      alert(error);
    });

  }
  async checkData(uid: string) {
    await wait(5000);
    this.getPlaylist(uid);
  }
  removeFromUser(u:string, p:string) {
    this.apollo.mutate<any>({
      mutation: removeUserPlaylist,
      variables: {
        userid:u,
        playlistid:p,
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('error', error);
      alert(error);
    });
  }
  createPlay(u: string, tit: string, desc: string, priv: string) {
    console.log(u);
    console.log(tit);
    console.log(desc);
    console.log(priv);
    this.apollo.mutate<any>({
      mutation: createPlaylist,
      variables: {
        usid: u,
        pltitle: tit,
        pldesc: desc,
        privid: priv
      }
    }).subscribe(({ data }) => {
      console.log('got data data data', data);
      this.addToUser(u, data.createPlaylist.playlistid);

    }, (error) => {
      console.log('error', error);
      alert(error);
    });
  }
  updatePlaylist(u: string, p: string, tit: string, des: string, pri: string,
                 th: string, ur: string) {
    this.apollo.mutate<any>({
      mutation: updatePlaylist,
      variables: {
        psid: p,
        title: tit,
        desc: des,
        priv: pri,
        thumb: th,
        url: ur,
        userid: u
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('error', error);
      alert(error);
    });
  }
  updateDetail(u: string, p: string, mo: string, v: boolean) {
    this.apollo.mutate<any>({
      mutation: updateDetail,
      variables: {
        psid: p,
        vidid: u,
        mov: mo,
        view: v
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('error', error);
      alert(error);
    });
  }
  deletePlaylistDetail(psid: string, videoi: string) {
    this.apollo.mutate<any>({
      mutation: deleteDetail,
      variables: {
        playlistid: psid,
        videoid: videoi
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('error', error);
      alert(error);
    });
  }
  createDetail(u: string, p: string) {
    this.apollo.mutate<any>({
      mutation: createPlaylistDetail,
      variables: {
        psid: p,
        vidid: u
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('error', error);
      alert(error);
    });
  }
}
