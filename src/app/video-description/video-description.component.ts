import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-description',
  templateUrl: './video-description.component.html',
  styleUrls: ['./video-description.component.scss']
})
export class VideoDescriptionComponent implements OnInit {
  @Input() subscribed: boolean;
  @Input() premium: boolean;
  @Input() title: string;
  @Input() view: string;
  @Input() datePub: string;
  @Input() like: number;
  @Input() dislike: number;
  @Input() channel: string;
  @Input() channelSub: string;
  @Input() channelImg: string;
  @Input() desc: string;
  @Input() category: string;

  constructor() { }

  ngOnInit(): void {
  }

}
