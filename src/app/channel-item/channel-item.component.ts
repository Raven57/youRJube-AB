import { Component, OnInit } from '@angular/core';
import { channels } from '../channels';
@Component({
  selector: 'app-channel-item',
  templateUrl: './channel-item.component.html',
  styleUrls: ['./channel-item.component.scss']
})
export class ChannelItemComponent implements OnInit {
  channels = channels;
  constructor() { }

  ngOnInit(): void {
  }

}
