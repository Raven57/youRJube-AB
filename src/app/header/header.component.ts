import { Subscription } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { UserServiceService } from './../user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserServiceService, private authService: SocialAuthService) { }
  users = [];
  toggleSetting = false;
  toggleSearch = false;
  toggleUser = false;
  @Input() user: SocialUser;
  @Input() toggleMenu = false;
  @Output() setMenu = new EventEmitter<boolean>();

  signOut(): void {
    this.userService.signOut();
  }

  signInWithGoogle(): SocialUser {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.userService.addToLocalStorage(user);
      this.userService.insertUserToDb(user);

    });
    return this.user;
  }

  ngOnInit(): void {
    this.users = this.userService.users;
    if (this.userService.checkUser()) {

      this.user = this.userService.user;
    }
  }
  toggleSettingFunc(): void {
    if (this.toggleUser) {
      this.toggleUser = !this.toggleUser;
    }
    this.toggleSetting = !this.toggleSetting;
  }
  toggleSearchFunc(): void {
    this.toggleSearch = !this.toggleSearch;
  }
  toggleUserFunc(): void {
    if (this.toggleSetting) {
    this.toggleSetting = !this.toggleSetting;
     }
    this.toggleUser = !this.toggleUser;
  }

  toggleFunc(): void {
    this.toggleMenu = !this.toggleMenu;
    this.setMenu.emit(this.toggleMenu);
  }
}
