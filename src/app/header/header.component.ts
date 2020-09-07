import { PremiumdetailService } from './../premiumdetail.service';
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
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router, RouterLink } from '@angular/router';
import { OverlappingFieldsCanBeMerged } from 'graphql/validation/rules/OverlappingFieldsCanBeMerged';

const q = gql`
query search($keyword:String!,$premiumid:String) {
  search(input:{keyword:$keyword,premiumid:$premiumid}){
    videos{
      videodescription,videotitle
    },
    channels{
      user{username, channeldetail}
    },
    playlists{
      playlists{
       playlisttitle, playlistdescription
      }
    }
  }
}
`;
const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  config: Config;
  headers: string[];
  userID: string;
  check = 0;
  currUserLocID: string;
  keyword: string;
  autoComplete: any;
  options: string[] = [];
  searched = false;
  premid: string;
  constructor(private apollo: Apollo, private userService: UserServiceService,
              private authService: SocialAuthService, private router: Router,
              public afAuth: AngularFireAuth, private prem: PremiumdetailService,
              private popup: TogglePopupService, private loc: GetIpAddressService
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
  setModel(str: string) {
    console.log(str);
    this.keyword = str;
    this.router.navigate(['/search', this.keyword]);
    this.searched = false;
  }
  async onBlur() {
    // if(this.)
    // this.router.navigateByUrl(window.location.href);
    await wait(500);
    this.searched = false;
  }
  onFocus() {
    this.searched = true;
  }
  changeSearch(str: string) {
    this.searched = true;
    this.apollo.query<any>({
      query: q,
      variables: {
        keyword: str,
        premiumid: this.premid
      }
    }).subscribe(({ data }) => {
      // this.autoComplete = null;
      this.options = [];
      console.log(this.autoComplete);
      this.autoComplete = data.search;
      if (this.autoComplete.videos != null) {
        this.autoComplete.videos.forEach(v => {
          this.options.push(v.videotitle, v.videodescription);
        });
      }
      if (this.autoComplete.channels != null) {
        this.autoComplete.channels.forEach(c => {
          this.options.push(c.user.username, c.user.channeldetail);
        });
      }
      if (this.autoComplete.playlists) {
        this.autoComplete.playlists.forEach(p => {
          this.options.push(p.playlists.playlisttitle, p.playlists.playlistdescription);
        });
      }
    }, (error) => {
      console.log(error);
    });
  }

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
    this.searched = false;
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
    this.prem.currPremiumId.subscribe(premid => {
      this.premid = premid;
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
    // if (this.currUserLocID !== this.locid) {
    //   this.userService.update(this.user, '', '', '', '', '', this.locid, '', 0, '');
    // }
    // else {
    // }
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
