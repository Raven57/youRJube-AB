import { UserServiceService } from './../user-service.service';
import { PlaylistService } from './../playlist.service';
import { VideoService } from './../video.service';
import { Component, OnInit, Input } from '@angular/core';
import { videos } from '../videos';
@Component({
  selector: 'app-video-display',
  templateUrl: './video-display.component.html',
  styleUrls: ['./video-display.component.scss']
})
export class VideoDisplayComponent implements OnInit {
  @Input() typeid: string;
  @Input() userid: string;
  @Input() videoid: string;
  @Input() title: string;
  @Input() img: string;
  @Input() view: string;
  @Input() length: string;
  @Input() publish: string;
  @Input() channel: string;
  @Input() desc: string;
  toggleSetting = false;
  plvisible: boolean;
  temp: any;
  pls: any;
  useridd: string;
  constructor(private video: VideoService, private pl: PlaylistService, private user: UserServiceService) { }
  togglePlaylist(bool: boolean) {
    if(this.useridd == null){
      alert('PLEASE LOGIN TO ADD TO PLAYLIST');
    } else {
      this.plvisible = bool;
      this.pl.currOwnPlaylist.subscribe(p => {
        this.temp = p;
        this.checkVideoInPlaylist();
        // this.pls = this.temp;
        // this.pl.changeFixedPlaylist(this.pls);
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
    this.pl.changeFixedPlaylist(this.temp);
  }
  ngOnInit(): void {
    this.publish = this.video.getDateDiffString(this.publish);
    this.user.currUserID.subscribe(u => this.useridd = u);

  }
  toggleSettingfunc(): void {
    this.toggleSetting = !this.toggleSetting;
  }

}
