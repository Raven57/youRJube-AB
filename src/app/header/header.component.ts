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

  constructor(private userService: UserServiceService, private authService: SocialAuthService, public afAuth: AngularFireAuth) { }
  users = [];
  toggleSetting = false;
  toggleSearch = false;
  toggleUser = false;
  user: SocialUser;

  @Input() toggleMenu = false;
  @Output() setMenu = new EventEmitter<boolean>();
  @Input() modalVisible = false;
  @Output() toggleModal = new EventEmitter<boolean>();


  signOut(): void {
    this.userService.signOut();
  }
  showModal() {
    this.modalVisible = !this.modalVisible;
    this.toggleModal.emit(this.modalVisible);
  }
  ngOnInit(): void {
    this.userService.currUser.subscribe(user => this.user = user);
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
