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
  @Input() user: SocialUser;
  @Input() toggleMenu = false;
  @Output() setMenu = new EventEmitter<boolean>();

  signOut(): void {
    this.userService.signOut();
  }

  signInWithGoogle(): SocialUser {
    this.authService.initState.subscribe(() => { }, console.error, () => { console.log('all providers are ready'); });
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.userService.addToLocalStorage(user);
      this.userService.insertUserToDb(user);
      console.log(this.authService.initState);
    });
    return this.user;

    // this.user = new SocialUser();
    // this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
    //   .then((result) => {
    //     console.log(result.user);
    //     console.log('You have been successfully logged in!');
    //     this.user.firstName = result.user.displayName;
    //     this.user.email = result.user.email;
    //     this.user.photoUrl = result.user.photoURL;
    //     this.userService.addToLocalStorage(this.user);
    //     this.userService.insertUserToDb(this.user);
    //     console.log('Success add to DB!');
    //   }).catch((error) => {
    //     console.log(error);
    //   });
    // return this.user;
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
