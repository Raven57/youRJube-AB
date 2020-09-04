import { UserServiceService } from './../user-service.service';
import { PlaylistService } from './../playlist.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
const getDetail = gql`
query playlist($id:ID!){
  playlist(playlistid:$id){
    playlist{
      playlists{
        playlisttitle,
        playlistdetails{
          video{
            videoid,
          }
        }
      }
    }
  }
}
`;
@Component({
  selector: 'app-playlist-modal',
  templateUrl: './playlist-modal.component.html',
  styleUrls: ['./playlist-modal.component.scss']
})
export class PlaylistModalComponent implements OnInit {
  constructor(private router: Router, private ps: PlaylistService,
              private userService: UserServiceService, private apollo: Apollo) { }
  @Input() isVisible: boolean;
  @Input() videoid: string;
  @Output() changeVisible = new EventEmitter<boolean>();
  playlists: any;
  url: string;
  ownPlaylist: any;
  userid: string;
  typeid = '2';
  name = '';
  desc = '';
  existedInList: boolean[];
  playlistVideo: any;
  ngOnInit(): void {
    // this.userService.checkUser();
    console.log('asdf');
    this.url = this.router.url;
    this.userService.currUserID.subscribe(u => {
      this.userid = u;
    });
    this.ps.currFixedPlaylist.subscribe(fx => {
      this.playlists = fx;
    });
  }
  changeAvailability(plid: string) {
    this.playlists.forEach(p => {
      if (p.playlistid === plid) {
        if (p.available) {
          p.available = false;
          this.removeToPlay(plid);
          return;
        } else if (!p.available) {
          p.available = true;
          this.addToPlay(plid);
          return;
        }
      }
    });
    // this.ps.changeFixedPlaylist(this.playlists);
  }
  createPlaylist(tit: string, desc: string, priv: string) {
    this.ps.createPlay(this.userid, tit, desc, priv);
    // this.ps.checkData(this.userid);
  }
  addToPlay(psid: string) {
    this.ps.createDetail(this.videoid, psid);
  }
  removeToPlay(psid: string) {
    this.ps.deletePlaylistDetail(psid, this.videoid);
  }
  close(): void {
    this.changeVisible.emit(false);
  }

}
