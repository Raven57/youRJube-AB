import { Component, OnInit } from '@angular/core';
import { playlists } from '../playlists';
@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {
  playlists = playlists;
  constructor() { }

  ngOnInit(): void {
  }

}
