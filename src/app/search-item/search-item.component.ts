import { Component, OnInit } from '@angular/core';
import { videos } from '../videos';
@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {
  videos = videos;
  constructor() { }

  ngOnInit(): void {
  }

}
