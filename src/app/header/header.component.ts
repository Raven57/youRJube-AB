import { GetIpAddressService } from './../get-ip-address.service';
import { HttpHeaders } from '@angular/common/http';
import { Config } from '@fortawesome/fontawesome-svg-core';
import { TogglePopupService } from './../toggle-popup.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { UserServiceService } from './../user-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  config: Config;
  headers: string[];
  userID: string;
  check=0;
  currUserLocID: string;

  constructor(private userService: UserServiceService, private authService: SocialAuthService,
              public afAuth: AngularFireAuth, private popup: TogglePopupService, private loc: GetIpAddressService
  ) { }

  toggleSetting = false;
  toggleSearch = false;
  toggleUser = false;
  toggleNotification = false;
  user: SocialUser;
  isVisible: boolean;
  @Input() toggleMenu = false;
  @Output() setMenu = new EventEmitter<boolean>();
  locid: string;
  keyShortcutVisible = false;
  restrictionVisible = false;
  locationVisible = false;

  showModal()
  {
    this.popup.changeVisibility(true);
  }
  showKeyShortcut() {
    this.keyShortcutVisible = true;
    console.log('asdasdada');
  }
  showLocation() {
    this.locationVisible = true;
  }
  showRestrictions() {
    this.restrictionVisible = true;
  }
  hideLocation(bool: boolean) {
    this.locationVisible = bool;
  }
  hideRestriction(bool: boolean) {
    this.restrictionVisible = bool;
  }
  hideKeyShortcut(bool: boolean) {
    this.keyShortcutVisible = bool;
  }
  ngOnInit(): void {
    this.userService.checkUser();
    this.popup.currVisibility.subscribe(isVisible => this.isVisible = isVisible);

    this.userService.currUser.subscribe(user => {
      this.user = user;
      this.checkForQuery(this.user, 1);
    });
    this.userService.currUserID.subscribe(user => {
      this.userID = user;
      this.checkForQuery(this.userID, 2);
    });

    this.loc.currLocID.subscribe(loc => {
      this.locid = loc;
      this.checkForQuery(this.locid, 3);
    });
    this.userService.currUserLOCID.subscribe(id => {
      this.currUserLocID = id;
      this.checkForQuery(this.currUserLocID, 4);
    });
  }

  checkForQuery(inp: any, inc: number) {
    if (inp != null) {
      this.check++;
      console.log('cek ', inc, this.check);
    }
    if (this.check > 4) {
        this.changeLoc();
      }
  }
  changeLoc() {
    if (this.currUserLocID !== this.locid) {
      this.userService.update(this.user, '', '', '', '', '', this.locid, '', 0, '');
    }
    else {
      console.log('asdasd');
    }
  }


  toggleSettingFunc(): void {
    if (this.toggleUser) {
      this.toggleUser = !this.toggleUser;
    }
    this.toggleSetting = !this.toggleSetting;
  }
  toggleNotificationFunc(): void {
    if (this.toggleUser) {
      this.toggleUser = !this.toggleUser;
    }
    this.toggleNotification = !this.toggleNotification;
  }
  toggleSearchFunc(): void {
    this.toggleSearch = !this.toggleSearch;
  }
  toggleUserFunc(): void {
    if (this.toggleSetting) {
    this.toggleSetting = !this.toggleSetting;
  }
    if (this.toggleNotification) {
      this.toggleNotification = !this.toggleNotification;
  }
    this.toggleUser = !this.toggleUser;
  }

  toggleFunc(): void {
    this.toggleMenu = !this.toggleMenu;
    this.setMenu.emit(this.toggleMenu);
  }
}
