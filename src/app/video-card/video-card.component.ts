import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  toggleSetting = true;
  constructor() { }

  ngOnInit(): void {
  }
  toggleSettingfunc(): void {
    this.toggleSetting = !this.toggleSetting;
  }
}
