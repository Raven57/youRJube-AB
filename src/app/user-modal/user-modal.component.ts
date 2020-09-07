import { PremiumdetailService } from './../premiumdetail.service';
import { GetIpAddressService } from './../get-ip-address.service';
import { TogglePopupService } from './../toggle-popup.service';
import { auth } from 'firebase/app';
import { SocialUser, SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { UserServiceService } from './../user-service.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

const currDate = new Date();
const currDatePlusAYear = new Date(currDate.getFullYear() + 1 , currDate.getMonth(), currDate.getDate());

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})

export class UserModalComponent implements OnInit {
  age: number;
  pwd: string;
  isVisible: boolean;
  user: SocialUser;
  avail: number;
  currUserid: string;
  locID: string;
  constructor(private userService: UserServiceService, private authService: SocialAuthService, public afAuth: AngularFireAuth,
              private popup: TogglePopupService, private ip: GetIpAddressService,
              private premium: PremiumdetailService) { }

  ngOnInit(): void {
    this.ip.currLocID.subscribe(avail => this.locID = avail);
    this.userService.currUserInDB.subscribe(avail => this.avail = avail);
    this.userService.currUser.subscribe(user => this.user = user);
    this.popup.currVisibility.subscribe(isVisible => this.isVisible = isVisible);
    // this.userService.signOut();
    this.user = new SocialUser();
    console.log(this.locID);
  }
  close(): void {
    this.popup.changeVisibility(false);
    this.userService.changeUserStatInDB(0);
  }

  signInWithGoogle(): void {
    this.user = this.userService.signInWithGoogle();
    // if (!this.userService.signInWithGoogle()) {
    //   console.log('Sign in failed');
    // }
    // this.close();
    // this.userService.getUserFromDBB(this.user.email);
    // this.premium.register(this.currUserid, '1', 0, 1);
    // this.close();
  }
  registerWithGoogle() {
    this.userService.register(this.user, this.pwd, this.age, this.locID);
  }

  register() {
    this.user.photoUrl = 'https://firebasestorage.googleapis.com/v0/b/tpa-webab.appspot.com/o/Assets%2Fuser.png?alt=media&token=1147ff2f-2470-4141-be54-bee5b54d5391';
    this.userService.register(this.user, this.pwd, this.age, this.locID);
  }
  login() {
    this.userService.userLogin(this.user, this.pwd);
  }
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        console.log('You have been successfully logged in!');
      }).catch((error) => {
        console.log(error);
      });
  }
}
