import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-small-video-card',
  templateUrl: './small-video-card.component.html',
  styleUrls: ['./small-video-card.component.scss']
})
export class SmallVideoCardComponent implements OnInit {
  @Input() title: string;
  @Input() img: string;
  @Input() len: string;
  @Input() creator: string;
  constructor() { }

  ngOnInit(): void {
  }

}
