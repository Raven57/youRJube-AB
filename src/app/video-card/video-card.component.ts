import { VideoService } from './../video.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  @Input() typeid: string;
  @Input() title: string;
  @Input() img: string;
  @Input() view: string;
  @Input() length: string;
  @Input() publish: string;
  @Input() channel: string;

  toggleSetting = false;
  constructor(private video: VideoService) { }

  ngOnInit(): void {
    this.publish = this.video.getDateDiffString(this.publish);
  }
  toggleSettingfunc(): void {
    this.toggleSetting = !this.toggleSetting;
  }
}
