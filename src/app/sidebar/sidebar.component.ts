import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  toggleMenu = false;
  toggleSetting = false;
  toggleSearch = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleFunc(): void {
    this.toggleMenu = !this.toggleMenu;
  }
  toggleSettingFunc(): void {
    this.toggleSetting = !this.toggleSetting;
  }
  toggleSearchFunc(): void {
    this.toggleSearch = !this.toggleSearch;
    console.log('asd');
  }
}
