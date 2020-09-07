import { UserServiceService } from './../user-service.service';
import { PlaylistService } from './../playlist.service';
import { VideoService } from './../video.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  @Input() typeid: string;
  @Input() userid: string;
  @Input() videoid: string;
  @Input() title: string;
  @Input() img: string;
  @Input() view: string;
  @Input() length: string;
  @Input() publish: string;
  @Input() channel: string;

  plvisible: boolean;
  toggleSetting = false;
  pls: any;
  temp: any;
  useridd: string;
  constructor(private pl: PlaylistService, private video: VideoService, private user: UserServiceService) { }
  togglePlaylist(bool: boolean) {
    if(this.useridd == null){
      alert('PLEASE LOGIN TO ADD TO PLAYLIST');
    } else {
      this.plvisible = bool;
      this.pl.currOwnPlaylist.subscribe(p => {
        this.temp = p;
        this.checkVideoInPlaylist();
        this.pls = this.temp;
        this.pl.changeFixedPlaylist(this.pls);
      });
    }

    if (this.toggleSetting) {
      this.toggleSetting = !this.toggleSetting;
    }
  }
  addQueue() {
    this.video.addQueue(this.videoid);
    if (this.toggleSetting) {
      this.toggleSetting = !this.toggleSetting;
    }
  }
  checkVideoInPlaylist() {
    this.temp.forEach(p => {
      for (const pd of p.playlistdetails) {
        if (pd.videoid === this.videoid) {
          p.available = true;
          break;
        } else {
          p.available = false;
        }
      }
    });
  }
  ngOnInit(): void {
    this.user.currUserID.subscribe(u => this.useridd = u);
    this.publish = this.video.getDateDiffString(this.publish);
  }
  toggleSettingfunc(): void {
    this.toggleSetting = !this.toggleSetting;
  }
}
