import { PremiumdetailService } from './../premiumdetail.service';
import { PlaylistService } from './../playlist.service';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {
  @Input() title: string;
  @Input() playlistid: string;
  @Input() img: string;
  @Input() channel: string;
  @Input() description: string;
  @Input() videoCount: string;
  premid: string;
  constructor(private premium: PremiumdetailService ,private pl: PlaylistService) { }

  ngOnInit(): void {
    this.premium.currPremiumId.subscribe(p => {
      this.premid = p;
    });
  }
  playAll() {
    this.pl.playPlaylist(this.premid, true, this.playlistid, null);
  }
}
