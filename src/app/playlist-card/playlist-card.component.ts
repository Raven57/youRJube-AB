import { VideoService } from './../video.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent implements OnInit {
  @Input() title: string;
  @Input() img: string;
  @Input() view: string;
  @Input() length: string;
  @Input() publish: string;
  @Input() channel: string;
  @Input() videocount: string;

  toggleSetting = false;
  constructor(private video: VideoService) { }

  ngOnInit(): void {
    this.publish = this.video.getDateDiffString(this.publish);
  }
  toggleSettingfunc(): void {
    this.toggleSetting = !this.toggleSetting;
  }
}
